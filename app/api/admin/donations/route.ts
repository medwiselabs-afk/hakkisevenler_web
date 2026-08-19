import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { donations } from "@/db/schema";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const rows = await db.query.donations.findMany({
    orderBy: desc(donations.createdAt),
    with: { campaign: { columns: { title: true, slug: true } } },
    limit: 500,
  });

  return NextResponse.json({ donations: rows });
}
