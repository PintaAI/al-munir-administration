import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// GET - List all santri
export async function GET(_request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const santri = await prisma.santri.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ santri });
  } catch (error) {
    console.error("Error fetching santri:", error);
    return NextResponse.json(
      { error: "Failed to fetch santri" },
      { status: 500 }
    );
  }
}

// POST - Create a new santri
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    if (!nis || !nama || !kelas || !asrama || !wali) {
      return NextResponse.json(
        { error: "NIS, nama, kelas, asrama, dan wali wajib diisi" },
        { status: 400 }
      );
    }

    // Check if santri with NIS already exists
    const existingSantri = await prisma.santri.findUnique({
      where: { nis },
    });

    if (existingSantri) {
      return NextResponse.json(
        { error: "Santri dengan NIS ini sudah ada" },
        { status: 400 }
      );
    }

    const santri = await prisma.santri.create({
      data: {
        nis,
        nama,
        kelas,
        asrama,
        wali,
        status: status || "AKTIF",
        beasiswa: beasiswa || false,
        jenisBeasiswa: jenisBeasiswa || null,
        jenisSantri: jenisSantri || "PONDOK",
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

    return NextResponse.json({ santri }, { status: 201 });
  } catch (error) {
    console.error("Error creating santri:", error);
    return NextResponse.json(
      { error: "Failed to create santri" },
      { status: 500 }
    );
  }
}