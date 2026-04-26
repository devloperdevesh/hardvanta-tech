import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { findUserByEmail } from "@/modules/user/service";
import { z } from "zod";
import { NextResponse } from "next/server";

// ================= CONFIG =================
const COOKIE_NAME = "auth_token";

// ================= SCHEMA =================
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

// ================= CONSTANT =================
const DUMMY_HASH =
  "$2a$10$CwTycUXWue0Thq9StjUM0uJ8r9/2pHg56k97X3gSdz8sRP/6IDdGi";

// ================= HANDLER =================
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid input" },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase().trim();
    const password = parsed.data.password;

    const user = await findUserByEmail(email);

    const passwordHash =
      user && "password" in user ? (user as any).password : DUMMY_HASH;

    const isValid = await bcrypt.compare(password, passwordHash);

    if (!user || !isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({
      id: user.id,
      role: (user as any).role ?? "USER",
    });

    // ✅ CREATE RESPONSE FIRST
    const response = NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: (user as any).role ?? "USER",
      },
    });

    // ✅ SET COOKIE (FINAL FIX)
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch (error) {
    console.error("LOGIN_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}