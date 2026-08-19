import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { campaigns } from "@/db/schema";
import { getCurrentAdmin } from "@/lib/auth";

const CATEGORIES = ["ACIL_YARDIM", "KURBAN", "SU_KUYUSU", "YETIM", "EGITIM", "SAGLIK", "GENEL"] as const;

const createSchema = z.object({
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug sadece küçük harf, rakam ve tire içerebilir"),
  title: z.string().min(3),
  summary: z.string().min(3),
  description: z.string().min(3),
  imageUrl: z.string().url(),
  category: z.enum(CATEGORIES),
  goalAmountTl: z.number().positive(),
  isShareBased: z.boolean().default(false),
  totalShares: z.number().int().positive().optional(),
  isActive: z.boolean().default(true),
});

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const rows = await db.query.campaigns.findMany({ orderBy: desc(campaigns.createdAt) });
  return NextResponse.json({ campaigns: rows });
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { goalAmountTl, ...rest } = parsed.data;

  try {
    const [row] = await db
      .insert(campaigns)
      .values({ ...rest, goalAmount: Math.round(goalAmountTl * 100) })
      .returning();
    return NextResponse.json({ campaign: row });
  } catch {
    return NextResponse.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });
  }
}
