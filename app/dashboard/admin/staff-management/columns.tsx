"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Role = "ADMIN" | "BENDAHARA_SMK" | "BENDAHARA_SMP" | "BENDAHARA_PONDOK" | "SANTRI";

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: Role;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ColumnOptions {
  onEdit: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;
  onToggleVerified: (staff: Staff) => void;
}

const roleLabels: Record<Role, string> = {
  ADMIN: "Admin",
  BENDAHARA_SMK: "Bendahara SMK",
  BENDAHARA_SMP: "Bendahara SMP",
  BENDAHARA_PONDOK: "Bendahara Pondok",
  SANTRI: "Santri",
};

export const createColumns = ({ onEdit, onDelete, onToggleVerified }: ColumnOptions): ColumnDef<Staff>[] => [
  {
    id: "staff",
    header: "Nama",
    cell: ({ row }) => {
      const staff = row.original;
      return (
        <div className="flex flex-col">
          <div className="font-medium">{staff.name}</div>
          <div className="text-sm text-muted-foreground">{staff.email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as Role;
      return (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
          {roleLabels[role]}
        </span>
      );
    },
  },
  {
    accessorKey: "emailVerified",
    header: "Status",
    cell: ({ row }) => {
      const staff = row.original;
      const verified = staff.emailVerified;
      return (
        <button
          onClick={() => onToggleVerified(staff)}
          className="cursor-pointer transition-opacity hover:opacity-80"
          title="Klik untuk mengubah status verifikasi"
        >
          {verified ? (
            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400">
              Terverifikasi
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
              Belum Verifikasi
            </span>
          )}
        </button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-muted-foreground text-sm">
          {date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const staff = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(staff.id)}>
                Copy staff ID
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => onEdit(staff)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(staff)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];