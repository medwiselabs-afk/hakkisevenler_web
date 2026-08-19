import Link from "next/link";
import Image from "next/image";
import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { campaigns } from "@/db/schema";
import CampaignRowActions from "@/components/admin/CampaignRowActions";

function formatTl(kurus: number) {
  return (kurus / 100).toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
}

export default async function AdminCampaignsPage() {
  const rows = await db.query.campaigns.findMany({ orderBy: desc(campaigns.createdAt) });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink">Kampanyalar</h1>
          <p className="mt-1 text-sm text-ink/60">Kampanya ekleyin, fotoğraf yükleyin, düzenleyin.</p>
        </div>
        <Link
          href="/admin/kampanyalar/yeni"
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Plus size={16} />
          Yeni Kampanya
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line p-8 text-center text-ink/50">
          Henüz kampanya yok.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-bg shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-sand text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3 font-medium">Kampanya</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 font-medium">Toplanan / Hedef</th>
                <th className="px-4 py-3 font-medium">Durum</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-sand">
                        <Image src={c.imageUrl} alt={c.title} fill className="object-cover" sizes="64px" />
                      </div>
                      <div>
                        <p className="font-medium text-ink">{c.title}</p>
                        <p className="text-xs text-ink/50">/{c.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink/70">{c.category}</td>
                  <td className="px-4 py-3 text-ink/70">
                    {formatTl(c.currentAmount)} / {formatTl(c.goalAmount)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        c.isActive ? "bg-success-light text-success-dark" : "bg-line text-ink/50"
                      }`}
                    >
                      {c.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <CampaignRowActions campaign={c} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
