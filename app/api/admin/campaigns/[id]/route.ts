import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { campaigns } from "@/db/schema";
import { getCurrentAdmin } from "@/lib/auth";

const CATEGORIES = ["ACIL_YARDIM", "KURBAN", "SU_KUYUSU", "YETIM", "EGITIM", "SAGLIK", "GENEL"] as const;

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  summary: z.string().min(3).optional(),
  description: z.string().min(3).optional(),
  imageUrl: z.string().url().optional(),
  category: z.enum(CATEGORIES).optional(),
  goalAmountTl: z.number().positive().optional(),
  isShareBased: z.boolean().optional(),
  totalShares: z.number().int().positive().nullable().optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { goalAmountTl, ...rest } = parsed.data;
  const updates: Record<string, unknown> = { ...rest };
  if (goalAmountTl !== undefined) updates.goalAmount = Math.round(goalAmountTl * 100);

  const [row] = await db
    .update(campaigns)
    .set(updates)
    .where(eq(campaigns.id, params.id))
    .returning();

  if (!row) return NextResponse.json({ error: "Kampanya bulunamadı" }, { status: 404 });
  return NextResponse.json({ campaign: row });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const [row] = await db.delete(campaigns).where(eq(campaigns.id, params.id)).returning();
    if (!row) return NextResponse.json({ error: "Kampanya bulunamadı" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Bu kampanyaya bağış yapılmış, silinemez. Bunun yerine pasif yapın." },
      { status: 409 }
    );
  }
}
