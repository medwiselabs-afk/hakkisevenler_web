import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { campaigns, donations, users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { initializeCheckoutForm, newConversationId } from "@/lib/iyzico";

const schema = z.object({
  campaignSlug: z.string(),
  amountTl: z.number().positive().max(1_000_000),
  shareCount: z.number().int().positive().optional(),
  isRecurring: z.boolean().default(false),
  isAnonymous: z.boolean().default(false),
  guest: z
    .object({
      name: z.string().min(2),
      surname: z.string().min(1),
      email: z.string().email(),
      phone: z.string().min(10),
    })
    .optional(),
});

// iyzico zorunlu TC kimlik no ister; kayıtlı olmayan/yabancı bağışçılar için
// endüstri standardı olan yer tutucu kullanılır. Üretimde gerçek bir alan
// eklenmesi (misafir formunda) önerilir.
const FALLBACK_IDENTITY_NUMBER = "11111111111";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { campaignSlug, amountTl, shareCount, isRecurring, isAnonymous, guest } = parsed.data;

  const campaign = await db.query.campaigns.findFirst({ where: eq(campaigns.slug, campaignSlug) });
  if (!campaign || !campaign.isActive) {
    return NextResponse.json({ error: "Kampanya bulunamadı" }, { status: 404 });
  }

  const session = await getSession();
  let buyerName = guest?.name;
  let buyerSurname = guest?.surname;
  let buyerEmail = guest?.email;
  let buyerPhone = guest?.phone;
  let userId: string | undefined;

  if (session) {
    const user = await db.query.users.findFirst({ where: eq(users.id, session.userId) });
    if (user) {
      userId = user.id;
      const [first, ...rest] = user.fullName.split(" ");
      buyerName = first;
      buyerSurname = rest.join(" ") || first;
      buyerEmail = user.email;
      buyerPhone = user.phone ?? "5000000000";
    }
  }

  if (!buyerName || !buyerSurname || !buyerEmail || !buyerPhone) {
    return NextResponse.json(
      { error: "Bağışçı bilgileri eksik. Giriş yapın veya misafir bilgilerini doldurun." },
      { status: 400 }
    );
  }

  const amountKurus = Math.round(amountTl * 100);
  const conversationId = newConversationId();

  const [donation] = await db
    .insert(donations)
    .values({
      amount: amountKurus,
      status: "BEKLEMEDE",
      isRecurring,
      isAnonymous,
      donorName: isAnonymous ? null : `${buyerName} ${buyerSurname}`,
      donorEmail: buyerEmail,
      donorPhone: buyerPhone,
      shareCount,
      providerPaymentId: conversationId,
      campaignId: campaign.id,
      userId,
    })
    .returning();

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "85.34.78.112";

  try {
    const result = await initializeCheckoutForm({
      conversationId,
      priceTl: amountTl.toFixed(2),
      buyer: {
        id: userId ?? `misafir-${donation.id}`,
        name: buyerName,
        surname: buyerSurname,
        email: buyerEmail,
        phone: buyerPhone,
        identityNumber: FALLBACK_IDENTITY_NUMBER,
        address: "Belirtilmedi",
        city: "Istanbul",
        ip,
      },
      items: [
        {
          id: campaign.id,
          name: campaign.title,
          category: campaign.category,
          priceTl: amountTl.toFixed(2),
        },
      ],
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/donations/callback`,
    });

    if (result.status !== "success" || !result.checkoutFormContent) {
      await db
        .update(donations)
        .set({ status: "BASARISIZ", providerRawResult: JSON.stringify(result) })
        .where(eq(donations.id, donation.id));
      return NextResponse.json(
        { error: result.errorMessage ?? "Ödeme formu başlatılamadı" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      donationId: donation.id,
      checkoutFormContent: result.checkoutFormContent,
      token: result.token,
    });
  } catch (err) {
    await db
      .update(donations)
      .set({ status: "BASARISIZ", providerRawResult: String(err) })
      .where(eq(donations.id, donation.id));
    return NextResponse.json({ error: "Ödeme sağlayıcısına ulaşılamadı" }, { status: 502 });
  }
}
