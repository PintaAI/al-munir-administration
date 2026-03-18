"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Transaksi, STATUS_TRANSAKSI_OPTIONS, STATUS_UANG_SAKU_OPTIONS, BULAN_OPTIONS } from "@/lib/types/transaksi";

// Format currency to Indonesian Rupiah
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date to Indonesian locale
export function formatDate(date: Date | string | null): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

// Status badge colors
const statusColors: Record<string, string> = {
  LUNAS: "bg-green-500/10 text-green-600 dark:text-green-400",
  PENDING: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  BELUM_BAYAR: "bg-red-500/10 text-red-600 dark:text-red-400",
  DITOLAK: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
};

const statusLabels: Record<string, string> = {
  LUNAS: "Lunas",
  PENDING: "Pending",
  BELUM_BAYAR: "Belum Bayar",
  DITOLAK: "Ditolak",
};

const statusUangSakuColors: Record<string, string> = {
  DITAMBAH: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  DIAMBIL: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

const statusUangSakuLabels: Record<string, string> = {
  DITAMBAH: "Ditambah",
  DIAMBIL: "Diambil",
};

// Status Badge Component
export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusColors[status] || "bg-gray-500/10 text-gray-600"}`}>
      {statusLabels[status] || status}
    </span>
  );
}

// Status Uang Saku Badge Component
export function StatusUangSakuBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusUangSakuColors[status] || "bg-gray-500/10 text-gray-600"}`}>
      {statusUangSakuLabels[status] || status}
    </span>
  );
}

interface ColumnOptions {
  onEdit?: (transaksi: Transaksi) => void;
  onDelete?: (transaksi: Transaksi) => void;
}

// Base columns shared by all transaction types
const baseColumns: ColumnDef<Transaksi>[] = [
  {
    accessorKey: "kode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kode
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "santri",
    header: "Santri",
    cell: ({ row }) => {
      const santri = row.original.santri;
      return (
        <div>
          <div className="font-medium">{santri.nama}</div>
          <div className="text-xs text-muted-foreground">{santri.nis}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "jumlah",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jumlah
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const jumlah = row.getValue("jumlah") as number;
      return <div className="font-medium">{formatCurrency(jumlah)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "tanggalBayar",
    header: "Tgl. Bayar",
    cell: ({ row }) => {
      const tanggalBayar = row.getValue("tanggalBayar") as Date | null;
      return formatDate(tanggalBayar);
    },
  },
];

// SPP/Syahriah specific columns
const sppSyahriahColumns: ColumnDef<Transaksi>[] = [
  {
    accessorKey: "bulan",
    header: "Bulan",
    cell: ({ row }) => {
      const bulan = row.getValue("bulan") as string;
      return bulan || "-";
    },
  },
  {
    accessorKey: "tahun",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tahun
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "periodePembayaran",
    header: "Periode",
    cell: ({ row }) => {
      const periode = row.getValue("periodePembayaran") as string;
      if (!periode) return "-";
      const labels: Record<string, string> = {
        BULANAN: "Bulanan",
        SEMESTER: "Semester",
        TAHUNAN: "Tahunan",
      };
      return labels[periode] || periode;
    },
  },
];

// Uang Saku specific columns
const uangSakuColumns: ColumnDef<Transaksi>[] = [
  {
    accessorKey: "statusUangSaku",
    header: "Jenis",
    cell: ({ row }) => {
      const status = row.getValue("statusUangSaku") as string;
      return status ? <StatusUangSakuBadge status={status} /> : "-";
    },
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
    cell: ({ row }) => {
      const keterangan = row.getValue("keterangan") as string;
      return keterangan ? (
        <span className="text-sm text-muted-foreground">{keterangan}</span>
      ) : (
        "-"
      );
    },
  },
];

// Laundry specific columns
const laundryColumns: ColumnDef<Transaksi>[] = [
  {
    accessorKey: "jenisLaundry",
    header: "Jenis Laundry",
    cell: ({ row }) => {
      const jenisLaundry = row.getValue("jenisLaundry") as string;
      return jenisLaundry || "-";
    },
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
    cell: ({ row }) => {
      const keterangan = row.getValue("keterangan") as string;
      return keterangan ? (
        <span className="text-sm text-muted-foreground">{keterangan}</span>
      ) : (
        "-"
      );
    },
  },
];

// Actions column factory
function createActionsColumn(options: ColumnOptions): ColumnDef<Transaksi> {
  return {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const transaksi = row.original;
      return (
        <div className="flex items-center gap-2">
          {options.onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => options.onEdit!(transaksi)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {options.onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => options.onDelete!(transaksi)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      );
    },
  };
}

// Main function to get columns based on transaction type
export function getTransaksiColumns(
  jenis: "SPP" | "SYAHRIAH" | "UANG_SAKU" | "LAUNDRY",
  options: ColumnOptions = {}
): ColumnDef<Transaksi>[] {
  const columns: ColumnDef<Transaksi>[] = [...baseColumns];

  // Add type-specific columns before the status column
  if (jenis === "SPP" || jenis === "SYAHRIAH") {
    // Insert before status column (index 3)
    columns.splice(3, 0, ...sppSyahriahColumns);
  } else if (jenis === "UANG_SAKU") {
    // Insert statusUangSaku before jumlah column
    columns.splice(2, 0, ...uangSakuColumns.filter((_, i) => i === 0));
    // Insert keterangan after status column
    columns.splice(6, 0, ...uangSakuColumns.filter((_, i) => i === 1));
  } else if (jenis === "LAUNDRY") {
    // Insert jenisLaundry after santri column
    columns.splice(2, 0, ...laundryColumns.filter((_, i) => i === 0));
    // Insert keterangan after status column
    columns.splice(6, 0, ...laundryColumns.filter((_, i) => i === 1));
  }

  // Add actions column if callbacks provided
  if (options.onEdit || options.onDelete) {
    columns.push(createActionsColumn(options));
  }

  return columns;
}

// Export constants for use in pages
export { STATUS_TRANSAKSI_OPTIONS, STATUS_UANG_SAKU_OPTIONS, BULAN_OPTIONS };

// Periode pembayaran options
export const PERIODE_PEMBAYARAN_OPTIONS = [
  { value: "BULANAN", label: "Bulanan" },
  { value: "SEMESTER", label: "Semester" },
  { value: "TAHUNAN", label: "Tahunan" },
] as const;

// Jenis laundry options (example - can be expanded)
export const JENIS_LAUNDRY_OPTIONS = [
  { value: "REGULAR", label: "Regular" },
  { value: "EXPRESS", label: "Express" },
  { value: "PREMIUM", label: "Premium" },
] as const;