// User Roles (strict typing)
export type UserRole = "admin" | "member" | "user";

// Base User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;

  role: UserRole;

  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

// Optional: Safe User (without password)
export type SafeUser = Omit<User, "password">;

// Example: Default role
export const DEFAULT_ROLE: UserRole = "user";