import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { hashPassword, createSession } from "@/lib/auth";

const schema = z.object({
  fullName: z.string().min(2, "Ad soyad en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta girin"),
  phone: z.string().min(10, "Geçerli bir telefon girin").optional(),
  password: z.string().min(8, "Şifre en az 8 karakter olmalı"),
  kvkkConsent: z.literal(true, {
    errorMap: () => ({ message: "KVKK aydınlatma metnini onaylamalısınız" }),
  }),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { fullName, email, phone, password, kvkkConsent } = parsed.data;

  const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (existing) {
    return NextResponse.json(
      { error: "Bu e-posta ile kayıtlı bir hesap zaten var" },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(users)
    .values({ fullName, email, phone, passwordHash, kvkkConsent })
    .returning();

  await createSession({ userId: user.id, email: user.email });

  return NextResponse.json({ id: user.id, email: user.email, fullName: user.fullName });
}
