import { DefaultSession } from "next-auth";
import { Role } from "@/lib/roles";

// ================= SESSION =================
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: Role;
    };
  }

  interface User {
    id: string;
    role: Role;
  }
}

// ================= JWT =================
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}