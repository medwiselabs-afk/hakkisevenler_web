import { NextResponse } from "next/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { campaigns as campaignsTable } from "@/db/schema";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("kategori");

  const rows = await db.query.campaigns.findMany({
    where: category
      ? and(eq(campaignsTable.isActive, true), eq(campaignsTable.category, category as any))
      : eq(campaignsTable.isActive, true),
    orderBy: desc(campaignsTable.createdAt),
  });

  return NextResponse.json({ campaigns: rows });
}
