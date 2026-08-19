import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { campaigns } from "@/db/schema";
import CampaignForm from "@/components/admin/CampaignForm";

export default async function EditCampaignPage({ params }: { params: { id: string } }) {
  const campaign = await db.query.campaigns.findFirst({ where: eq(campaigns.id, params.id) });
  if (!campaign) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Kampanyayı Düzenle</h1>
        <p className="mt-1 text-sm text-ink/60">{campaign.title}</p>
      </div>
      <CampaignForm campaign={campaign} />
    </div>
  );
}
