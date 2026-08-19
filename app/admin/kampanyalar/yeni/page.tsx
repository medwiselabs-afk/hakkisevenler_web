import CampaignForm from "@/components/admin/CampaignForm";

export default function NewCampaignPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Yeni Kampanya</h1>
        <p className="mt-1 text-sm text-ink/60">Fotoğraf yükleyin ve kampanya bilgilerini girin.</p>
      </div>
      <CampaignForm />
    </div>
  );
}
