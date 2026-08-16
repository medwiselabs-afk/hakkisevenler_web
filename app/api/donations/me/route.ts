import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { donations } from "@/db/schema";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const rows = await db.query.donations.findMany({
    where: eq(donations.userId, session.userId),
    with: { campaign: { columns: { title: true, slug: true, imageUrl: true } } },
    orderBy: desc(donations.createdAt),
  });

  return NextResponse.json({ donations: rows });
}
