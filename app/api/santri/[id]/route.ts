import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// GET - Get a single santri by ID
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const santri = await prisma.santri.findUnique({
      where: { id },
      select: {
        id: true,
        nis: true,
        nama: true,
        kelas: true,
        asrama: true,
        wali: true,
        status: true,
        beasiswa: true,
        jenisBeasiswa: true,
        jenisSantri: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!santri) {
      return NextResponse.json({ error: "Santri not found" }, { status: 404 });
    }

    return NextResponse.json({ santri });
  } catch (error) {
    console.error("Error fetching santri:", error);
    return NextResponse.json(
      { error: "Failed to fetch santri" },
      { status: 500 }
    );
  }
}

// PUT - Update a santri
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      nis,
      nama,
      kelas,
      asrama,
      wali,
      status,
      beasiswa,
      jenisBeasiswa,
      jenisSantri,
    } = body;

    // Check if santri exists
    const existingSantri = await prisma.santri.findUnique({
      where: { id },
    });

    if (!existingSantri) {
      return NextResponse.json({ error: "Santri not found" }, { status: 404 });
    }

    // If NIS is being changed, check for duplicates
    if (nis && nis !== existingSantri.nis) {
      const santriWithNis = await prisma.santri.findUnique({
        where: { nis },
      });
      if (santriWithNis) {
        return NextResponse.json(
          { error: "NIS sudah digunakan" },
          { status: 400 }
        );
      }
    }

    const santri = await prisma.santri.update({
      where: { id },
      data: {
        ...(nis !== undefined && { nis }),
        ...(nama !== undefined && { nama }),
        ...(kelas !== undefined && { kelas }),
        ...(asrama !== undefined && { asrama }),
        ...(wali !== undefined && { wali }),
        ...(status !== undefined && { status }),
        ...(beasiswa !== undefined && { beasiswa }),
        ...(jenisBeasiswa !== undefined && { jenisBeasiswa }),
        ...(jenisSantri !== undefined && { jenisSantri }),
      },
      select: {
        id: true,
        nis: true,
        nama: true,
        kelas: true,
        asrama: true,
        wali: true,
        status: true,
        beasiswa: true,
        jenisBeasiswa: true,
        jenisSantri: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ santri });
  } catch (error) {
    console.error("Error updating santri:", error);
    return NextResponse.json(
      { error: "Failed to update santri" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a santri
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if santri exists
    const existingSantri = await prisma.santri.findUnique({
      where: { id },
    });

    if (!existingSantri) {
      return NextResponse.json({ error: "Santri not found" }, { status: 404 });
    }

    await prisma.santri.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Santri deleted successfully" });
  } catch (error) {
    console.error("Error deleting santri:", error);
    return NextResponse.json(
      { error: "Failed to delete santri" },
      { status: 500 }
    );
  }
}