import { Role, hasAccess, ROLES } from "./roles";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// ================= TYPES =================
type AuthUser = {
  id: string;
  role: Role;
};

// ================= CONFIG =================
const JWT_SECRET = process.env.JWT_SECRET!;

// ================= AUTHORIZE =================
export function authorize(
  user: AuthUser | null | undefined,
  allowedRoles: readonly Role[]
) {
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!hasAccess(user.role, allowedRoles)) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  return null;
}

// ================= GET USER =================
export async function getUser(): Promise<AuthUser> {
  const session = (await getServerSession(authOptions)) as {
    user?: AuthUser;
  };

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
}

// ================= JWT =================
export function signToken(user: AuthUser) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthUser {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    throw new Error("Invalid token");
  }
}

// ================= ADMIN =================
export async function requireAdmin(): Promise<AuthUser> {
  const session = (await getServerSession(authOptions)) as {
    user?: AuthUser;
  };

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== ROLES.ADMIN) { // ✅ FIX
    throw new Error("Forbidden");
  }

  return session.user;
}