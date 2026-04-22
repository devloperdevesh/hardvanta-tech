import { ROLES } from "@/lib/roles";
import bcrypt from "bcryptjs";
import { findUserByEmail, saveUser } from "@/modules/auth/service";

// ================= TYPES =================
type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

// ================= POST (SIGNUP) =================
export async function POST(req: Request) {
  try {
    const body: CreateUserInput = await req.json();

    const { name, email, password } = body;

    // ✅ Validation
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // ✅ Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // ✅ Check existing user
    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    // 🔐 Hash password (secure)
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = {
      id: Date.now(), // replace with DB id
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: ROLES.USER,
      createdAt: new Date(),
    };

    // 💾 Save to DB
    await saveUser(user);

    console.log("✅ User created:", user.email);

    return Response.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error: any) {
    console.error("🔥 Signup Error:", error);

    return Response.json(
      {
        success: false,
        message: error.message || "Failed to create user",
      },
      { status: 500 }
    );
  }
}