import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { donations } from "@/db/schema";
import { formatTl } from "@/lib/format";

export default async function DonationResultPage({
  searchParams,
}: {
  searchParams: { durum?: string; id?: string };
}) {
  const durum = searchParams.durum;
  const donation = searchParams.id
    ? await db.query.donations.findFirst({
        where: eq(donations.id, searchParams.id),
        with: { campaign: { columns: { title: true } } },
      })
    : null;

  const isSuccess = durum === "basarili";

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <div
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl ${
          isSuccess ? "bg-primary-light text-primary-dark" : "bg-red-50 text-red-500"
        }`}
      >
        {isSuccess ? "✓" : "✕"}
      </div>

      <h1 className="mt-6 font-display text-2xl text-ink">
        {isSuccess ? "Bağışın için teşekkürler!" : "Ödeme tamamlanamadı"}
      </h1>

      {donation && (
        <p className="mt-3 text-ink/60">
          {donation.campaign.title} kampanyasına {formatTl(donation.amount)} bağış{" "}
          {isSuccess ? "kaydedildi." : "girişimi başarısız oldu."}
        </p>
      )}

      {!isSuccess && (
        <p className="mt-3 text-sm text-ink/50">
          Kartınızdan herhangi bir tutar çekilmedi. Tekrar deneyebilir ya da farklı bir ödeme yöntemi
          kullanabilirsiniz.
        </p>
      )}

      <Link
        href="/kampanyalar"
        className="focus-ring mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
      >
        Kampanyalara Dön
      </Link>
    </div>
  );
}
