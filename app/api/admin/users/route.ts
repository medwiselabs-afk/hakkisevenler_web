import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const rows = await db.query.users.findMany({
    orderBy: desc(users.createdAt),
    columns: {
      id: true,
      email: true,
      fullName: true,
      phone: true,
      role: true,
      kvkkConsent: true,
      createdAt: true,
    },
    with: { donations: { columns: { id: true, amount: true, status: true } } },
  });

  return NextResponse.json({ users: rows });
}
