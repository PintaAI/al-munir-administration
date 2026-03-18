import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, JenisTransaksi, StatusTransaksi, StatusUangSaku, PeriodePembayaran } from "@/lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// GET - Get a single transaksi by ID
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const transaksi = await prisma.transaksi.findUnique({
      where: { id },
      include: {
        santri: {
          select: {
            id: true,
            nis: true,
            nama: true,
            kelas: true,
            asrama: true,
            jenisSantri: true,
          },
        },
      },
    });

    if (!transaksi) {
      return NextResponse.json(
        { error: "Transaksi tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ transaksi });
  } catch (error) {
    console.error("Error fetching transaksi:", error);
    return NextResponse.json(
      { error: "Failed to fetch transaksi" },
      { status: 500 }
    );
  }
}

// PUT - Update a transaksi
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      santriId,
      jenis,
      jumlah,
      bulan,
      tahun,
      periodePembayaran,
      tanggalBayar,
      status,
      statusUangSaku,
      jenisLaundry,
      keterangan,
    } = body;

    // Check if transaksi exists
    const existingTransaksi = await prisma.transaksi.findUnique({
      where: { id },
    });

    if (!existingTransaksi) {
      return NextResponse.json(
        { error: "Transaksi tidak ditemukan" },
        { status: 404 }
      );
    }

    // Validate jenis if provided
    if (jenis && !Object.values(JenisTransaksi).includes(jenis)) {
      return NextResponse.json(
        { error: "Jenis transaksi tidak valid" },
        { status: 400 }
      );
    }

    // Validate status if provided
    if (status && !Object.values(StatusTransaksi).includes(status)) {
      return NextResponse.json(
        { error: "Status transaksi tidak valid" },
        { status: 400 }
      );
    }

    // Validate statusUangSaku if provided
    if (statusUangSaku && !Object.values(StatusUangSaku).includes(statusUangSaku)) {
      return NextResponse.json(
        { error: "Status uang saku tidak valid" },
        { status: 400 }
      );
    }

    // Validate periodePembayaran if provided
    if (periodePembayaran && !Object.values(PeriodePembayaran).includes(periodePembayaran)) {
      return NextResponse.json(
        { error: "Periode pembayaran tidak valid" },
        { status: 400 }
      );
    }

    // If santriId is being changed, verify the santri exists
    if (santriId && santriId !== existingTransaksi.santriId) {
      const santri = await prisma.santri.findUnique({
        where: { id: santriId },
      });
      if (!santri) {
        return NextResponse.json(
          { error: "Santri tidak ditemukan" },
          { status: 404 }
        );
      }
    }

    const transaksi = await prisma.transaksi.update({
      where: { id },
      data: {
        ...(santriId !== undefined && { santriId }),
        ...(jenis !== undefined && { jenis }),
        ...(jumlah !== undefined && { jumlah }),
        ...(bulan !== undefined && { bulan }),
        ...(tahun !== undefined && { tahun }),
        ...(periodePembayaran !== undefined && { periodePembayaran }),
        ...(tanggalBayar !== undefined && { tanggalBayar: tanggalBayar ? new Date(tanggalBayar) : null }),
        ...(status !== undefined && { status }),
        ...(statusUangSaku !== undefined && { statusUangSaku }),
        ...(jenisLaundry !== undefined && { jenisLaundry }),
        ...(keterangan !== undefined && { keterangan }),
      },
      include: {
        santri: {
          select: {
            id: true,
            nis: true,
            nama: true,
            kelas: true,
            asrama: true,
            jenisSantri: true,
          },
        },
      },
    });

    return NextResponse.json({ transaksi });
  } catch (error) {
    console.error("Error updating transaksi:", error);
    return NextResponse.json(
      { error: "Failed to update transaksi" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a transaksi
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if transaksi exists
    const existingTransaksi = await prisma.transaksi.findUnique({
      where: { id },
    });

    if (!existingTransaksi) {
      return NextResponse.json(
        { error: "Transaksi tidak ditemukan" },
        { status: 404 }
      );
    }

    await prisma.transaksi.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Transaksi berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting transaksi:", error);
    return NextResponse.json(
      { error: "Failed to delete transaksi" },
      { status: 500 }
    );
  }
}