import { ROLES, Role } from "@/lib/roles";
import { getUserById, saveUser } from "@/modules/auth/service";

const VALID_ROLES: Role[] = [ROLES.ADMIN, ROLES.MEMBER, ROLES.USER];

export async function updateUserRole(
  currentUser: { id: string; role: Role },
  targetUserId: string,
  newRole: Role
) {
  try {
    if (currentUser.role !== ROLES.ADMIN) {
      throw new Error("Only admin can change roles");
    }

    if (currentUser.id === targetUserId) {
      throw new Error("Admin cannot change their own role");
    }

    if (!VALID_ROLES.includes(newRole)) {
      throw new Error("Invalid role");
    }

    const user = await getUserById(targetUserId);
    if (!user) {
      throw new Error("User not found");
    }

    user.role = newRole;

    await saveUser(user);

    return {
      success: true,
      data: {
        id: user.id,
        role: user.role,
      },
    };

  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}