import { db } from "@/lib/db";
import { ROLES, Role } from "@/lib/roles";

// ================= TYPES =================
type AuthUser = {
  id: string;
  role: Role;
};

type UpdateUserRoleResult = {
  id: string;
  role: Role;
};

// ================= CONSTANTS =================
const VALID_ROLES: readonly Role[] = [
  ROLES.ADMIN,
  ROLES.MEMBER,
  ROLES.USER,
];

// ================= HELPERS =================
function toRole(role: string): Role {
  if (VALID_ROLES.includes(role as Role)) {
    return role as Role;
  }
  throw new Error(`Invalid role from DB: ${role}`);
}

// ================= USER QUERIES =================

// 🔍 Find user by email
export async function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: { email },
  });
}

// 🔍 Find user by ID
export async function getUserById(id: string) {
  return db.user.findUnique({
    where: { id },
  });
}

// 💾 Update user
export async function saveUser(user: { id: string; role: Role }) {
  return db.user.update({
    where: { id: user.id },
    data: {
      role: user.role,
    },
  });
}

// ================= ROLE SERVICE =================
export async function updateUserRole(
  currentUser: AuthUser,
  targetUserId: string,
  newRole: Role
): Promise<UpdateUserRoleResult> {
  // 🔐 AUTHORIZATION
  if (currentUser.role !== ROLES.ADMIN) {
    throw new Error("Forbidden: only admin can change roles");
  }

  // 🛑 Prevent self role change
  if (currentUser.id === targetUserId) {
    throw new Error("Admin cannot change their own role");
  }

  // ✅ VALIDATION
  if (!VALID_ROLES.includes(newRole)) {
    throw new Error(`Invalid role: ${newRole}`);
  }

  // 🔍 FETCH USER
  const user = await getUserById(targetUserId);

  if (!user) {
    throw new Error("User not found");
  }

  const userRole = toRole(user.role);

  // ⚡ NO-OP
  if (userRole === newRole) {
    return {
      id: user.id,
      role: userRole,
    };
  }

  // ✏️ UPDATE
  const updatedUser = await saveUser({
    id: user.id,
    role: newRole,
  });

  // 📊 AUDIT LOG
  console.info("USER_ROLE_UPDATED", {
    adminId: currentUser.id,
    targetUserId,
    newRole,
  });

  return {
    id: updatedUser.id,
    role: toRole(updatedUser.role), //  SAFE CAST
  };
}