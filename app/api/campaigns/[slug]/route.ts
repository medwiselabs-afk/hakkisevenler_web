import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { campaigns } from "@/db/schema";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const campaign = await db.query.campaigns.findFirst({
    where: eq(campaigns.slug, params.slug),
  });

  if (!campaign) {
    return NextResponse.json({ error: "Kampanya bulunamadı" }, { status: 404 });
  }

  return NextResponse.json({ campaign });
}
