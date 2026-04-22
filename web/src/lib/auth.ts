import { Role, ROLES, hasAccess } from "./roles";

// ================= AUTHORIZE =================
export function authorize(
  user: { role: Role } | null | undefined,
  allowedRoles: readonly Role[]
): void {
  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!hasAccess(user.role, allowedRoles)) {
    throw new Error("Forbidden");
  }
}

// ================= GET USER (TEMP MOCK) =================
export async function getUser(): Promise<{ id: string; role: Role }> {
  return {
    id: "user_1",
    role: ROLES.USER, // ✅ FIXED (no string)
  };
}