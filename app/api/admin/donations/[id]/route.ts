import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { donations } from "@/db/schema";
import { getCurrentAdmin } from "@/lib/auth";

const schema = z.object({
  status: z.enum(["BEKLEMEDE", "BASARILI", "BASARISIZ", "IADE"]),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const [row] = await db
    .update(donations)
    .set({ status: parsed.data.status, updatedAt: new Date().toISOString() })
    .where(eq(donations.id, params.id))
    .returning();

  if (!row) return NextResponse.json({ error: "Bağış bulunamadı" }, { status: 404 });
  return NextResponse.json({ donation: row });
}
