export const ROLES = {
    ADMIN: "admin",
    MEMBER: "member",
    USER: "user",
  } as const;
  
  export type Role = (typeof ROLES)[keyof typeof ROLES];
  
  // Readonly for safety
  export function hasAccess(
    userRole: Role,
    allowedRoles: readonly Role[]
  ): boolean {
    return allowedRoles.includes(userRole);
  }