import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { hashPassword } from "@/lib/password-hash";
import { nanoid } from "nanoid";

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
        userId: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
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

// POST - Create a new santri with user account
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
      email,
      password,
    } = body;

    if (!nis || !nama || !kelas || !asrama || !wali || !email || !password) {
      return NextResponse.json(
        { error: "NIS, nama, kelas, asrama, wali, email, dan password wajib diisi" },
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

    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User dengan email ini sudah ada" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Generate IDs for user and account
    const userId = nanoid();
    const accountId = nanoid();

    // Create user, account, and santri in a transaction
    const santri = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          id: userId,
          email: email,
          name: nama,
          role: "SANTRI",
          emailVerified: false,
        },
      });

      // Create account with credentials provider (for password auth)
      await tx.account.create({
        data: {
          id: accountId,
          accountId: userId,
          providerId: "credential",
          userId: userId,
          password: hashedPassword,
        },
      });

      // Create santri linked to user
      const newSantri = await tx.santri.create({
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
          userId: user.id,
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
          userId: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      return newSantri;
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