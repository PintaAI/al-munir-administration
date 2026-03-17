import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
} = authClient;

// Export role type for use in components
export type Role = "ADMIN" | "BENDAHARA_SMK" | "BENDAHARA_SMP" | "BENDAHARA_PONDOK" | "SANTRI";

// Extended user type with role
export interface UserWithRole {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}