"use client";

import { useSession, type Role } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserInfoProps {
  showDetails?: boolean;
}

const roleLabels: Record<Role, string> = {
  ADMIN: "Administrator",
  BENDAHARA_SMK: "Bendahara SMK",
  BENDAHARA_SMP: "Bendahara SMP",
  BENDAHARA_PONDOK: "Bendahara Pondok",
  SANTRI: "Santri",
};

export function UserInfo({ showDetails = false }: UserInfoProps) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
        <div className="space-y-1">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-3 w-32 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email.slice(0, 2).toUpperCase();

  // Get role from user object (extended via better-auth additionalFields)
  const role = (user as { role?: Role }).role ?? "SANTRI";
  const roleLabel = roleLabels[role];
  const emailVerified = user.emailVerified;

  if (!showDetails) {
    return (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={user.image ?? undefined} alt={user.name ?? user.email} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{user.name ?? "User"}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.image ?? undefined} alt={user.name ?? user.email} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{user.name ?? "User"}</span>
          <span className="text-sm text-muted-foreground">{roleLabel}</span>
        </div>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Email</span>
          <span className="flex items-center gap-2">
            {user.email}
            {emailVerified && (
              <span className="text-xs text-green-600 dark:text-green-400">
                ✓ Verified
              </span>
            )}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Role</span>
          <span className="font-medium">{roleLabel}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">User ID</span>
          <span className="font-mono text-xs">{user.id}</span>
        </div>
      </div>
    </div>
  );
}