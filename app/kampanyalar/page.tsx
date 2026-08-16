import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { campaigns as campaignsTable } from "@/db/schema";
import CampaignCard from "@/components/CampaignCard";

const CATEGORIES = [
  { value: "", label: "Tümü" },
  { value: "ACIL_YARDIM", label: "Acil Yardım" },
  { value: "KURBAN", label: "Kurban" },
  { value: "SU_KUYUSU", label: "Su Kuyusu" },
  { value: "YETIM", label: "Yetim" },
  { value: "EGITIM", label: "Eğitim" },
  { value: "SAGLIK", label: "Sağlık" },
];

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: { kategori?: string };
}) {
  const category = searchParams.kategori;

  const campaigns = await db.query.campaigns.findMany({
    where: category
      ? and(eq(campaignsTable.isActive, true), eq(campaignsTable.category, category as any))
      : eq(campaignsTable.isActive, true),
    orderBy: desc(campaignsTable.createdAt),
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-3xl text-ink">Kampanyalar</h1>
      <p className="mt-2 text-ink/60">Desteklemek istediğin alanı seç.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <a
            key={c.value}
            href={c.value ? `/kampanyalar?kategori=${c.value}` : "/kampanyalar"}
            className={`focus-ring rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              (category ?? "") === c.value
                ? "border-primary bg-primary-light text-primary-dark"
                : "border-line text-ink/60 hover:border-primary"
            }`}
          >
            {c.label}
          </a>
        ))}
      </div>

      {campaigns.length === 0 ? (
        <p className="mt-12 rounded-xl border border-dashed border-line p-8 text-center text-ink/50">
          Bu kategoride şu an aktif kampanya yok.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <CampaignCard key={c.id} c={c} />
          ))}
        </div>
      )}
    </div>
  );
}
