"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { createColumns, Staff, Role } from "./columns";
import { Plus, Users, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  role: Role;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  role: "SANTRI",
};

const roleLabels: Record<Role, string> = {
  ADMIN: "Admin",
  BENDAHARA_SMK: "Bendahara SMK",
  BENDAHARA_SMP: "Bendahara SMP",
  BENDAHARA_PONDOK: "Bendahara Pondok",
  SANTRI: "Santri",
};

export default function StaffManagementPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [deletingStaff, setDeletingStaff] = useState<Staff | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchStaff = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/staff");
      if (!response.ok) {
        throw new Error("Failed to fetch staff");
      }
      const data = await response.json();
      setStaff(data.staff);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const handleOpenCreateDialog = () => {
    setEditingStaff(null);
    setFormData(initialFormData);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      role: staffMember.role,
    });
    setIsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (staffMember: Staff) => {
    setDeletingStaff(staffMember);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingStaff(null);
    setFormData(initialFormData);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeletingStaff(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingStaff ? `/api/staff/${editingStaff.id}` : "/api/staff";
      const method = editingStaff ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save staff");
      }

      await fetchStaff();
      handleCloseDialog();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingStaff) return;

    setSubmitting(true);

    try {
      const response = await fetch(`/api/staff/${deletingStaff.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete staff");
      }

      await fetchStaff();
      handleCloseDeleteDialog();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleVerified = async (staffMember: Staff) => {
    try {
      const response = await fetch(`/api/staff/${staffMember.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailVerified: !staffMember.emailVerified,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update verification status");
      }

      await fetchStaff();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const columns = createColumns({
    onEdit: handleOpenEditDialog,
    onDelete: handleOpenDeleteDialog,
    onToggleVerified: handleToggleVerified,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">Kelola staff sistem</p>
        </div>
        <Button onClick={handleOpenCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Staff
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Daftar Staff
          </CardTitle>
          <CardDescription>
            Total {staff.length} staff terdaftar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <DataTable columns={columns} data={staff} />
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingStaff ? "Edit Staff" : "Tambah Staff Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Masukkan nama"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Masukkan email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value as Role })
                  }
                  className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                >
                  {Object.entries(roleLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose render={<Button type="button" variant="outline" disabled={submitting} />}>
                Batal
              </DialogClose>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Staff</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Apakah Anda yakin ingin menghapus staff{" "}
              <strong>{deletingStaff?.name}</strong>? Tindakan ini tidak dapat
              dibatalkan.
            </p>
          </div>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" disabled={submitting} />}>
              Batal
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                "Hapus"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}