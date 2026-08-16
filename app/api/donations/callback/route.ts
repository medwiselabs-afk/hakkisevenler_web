import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { campaigns, donations } from "@/db/schema";
import { retrieveCheckoutForm } from "@/lib/iyzico";

// iyzico, kullanıcı ödeme formunu tamamladıktan sonra bu adrese
// application/x-www-form-urlencoded gövdeyle POST atar: { token }
export async function POST(req: Request) {
  const formData = await req.formData();
  const token = formData.get("token")?.toString();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/bagis/sonuc?durum=hata`, { status: 303 });
  }

  try {
    const result = await retrieveCheckoutForm(token);
    const conversationId = result.conversationId as string | undefined;

    const donation = conversationId
      ? await db.query.donations.findFirst({ where: eq(donations.providerPaymentId, conversationId) })
      : null;

    if (!donation) {
      return NextResponse.redirect(`${baseUrl}/bagis/sonuc?durum=hata`, { status: 303 });
    }

    const success = result.status === "success" && result.paymentStatus === "SUCCESS";

    await db
      .update(donations)
      .set({
        status: success ? "BASARILI" : "BASARISIZ",
        providerRawResult: JSON.stringify(result),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(donations.id, donation.id));

    if (success) {
      await db
        .update(campaigns)
        .set({
          currentAmount: sql`${campaigns.currentAmount} + ${donation.amount}`,
          ...(donation.shareCount
            ? { takenShares: sql`${campaigns.takenShares} + ${donation.shareCount}` }
            : {}),
        })
        .where(eq(campaigns.id, donation.campaignId));
    }

    return NextResponse.redirect(
      `${baseUrl}/bagis/sonuc?durum=${success ? "basarili" : "basarisiz"}&id=${donation.id}`,
      { status: 303 }
    );
  } catch {
    return NextResponse.redirect(`${baseUrl}/bagis/sonuc?durum=hata`, { status: 303 });
  }
}
