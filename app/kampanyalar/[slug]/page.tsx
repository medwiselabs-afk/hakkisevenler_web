import { notFound } from "next/navigation";
import Image from "next/image";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { campaigns } from "@/db/schema";
import { getSession } from "@/lib/auth";
import ProgressBar from "@/components/ProgressBar";
import DonateForm from "@/components/DonateForm";

export default async function CampaignDetailPage({ params }: { params: { slug: string } }) {
  const campaign = await db.query.campaigns.findFirst({ where: eq(campaigns.slug, params.slug) });
  if (!campaign) notFound();

  const session = await getSession();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-sand sm:h-96">
            <Image src={campaign.imageUrl} alt={campaign.title} fill className="object-cover" />
          </div>
          <h1 className="mt-6 font-display text-3xl text-ink">{campaign.title}</h1>
          <p className="mt-4 leading-relaxed text-ink/70">{campaign.description}</p>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-white p-5">
            <ProgressBar current={campaign.currentAmount} goal={campaign.goalAmount} />
            {campaign.isShareBased && campaign.totalShares ? (
              <p className="mt-3 font-mono text-sm text-ink/60">
                {campaign.takenShares}/{campaign.totalShares} hisse alındı
              </p>
            ) : null}
          </div>

          <DonateForm campaignSlug={campaign.slug} isLoggedIn={!!session} />
        </div>
      </div>
    </div>
  );
}
