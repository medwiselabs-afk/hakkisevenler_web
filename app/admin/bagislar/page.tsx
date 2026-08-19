import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { donations } from "@/db/schema";
import DonationStatusSelect from "@/components/admin/DonationStatusSelect";

function formatTl(kurus: number) {
  return (kurus / 100).toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
}

function formatDate(value: string) {
  return new Date(value.replace(" ", "T") + "Z").toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminDonationsPage() {
  const rows = await db.query.donations.findMany({
    orderBy: desc(donations.createdAt),
    with: { campaign: { columns: { title: true } } },
    limit: 300,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Bağışlar</h1>
        <p className="mt-1 text-sm text-ink/60">Son {rows.length} bağış listeleniyor.</p>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line p-8 text-center text-ink/50">
          Henüz bağış yok.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-bg shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-sand text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3 font-medium">Bağışçı</th>
                <th className="px-4 py-3 font-medium">Kampanya</th>
                <th className="px-4 py-3 font-medium">Tutar</th>
                <th className="px-4 py-3 font-medium">Tarih</th>
                <th className="px-4 py-3 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((d) => (
                <tr key={d.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{d.isAnonymous ? "Anonim" : d.donorName ?? "—"}</p>
                    <p className="text-xs text-ink/50">{d.donorEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-ink/70">{d.campaign?.title ?? "—"}</td>
                  <td className="px-4 py-3 font-medium text-ink">
                    {formatTl(d.amount)}
                    {d.isRecurring && <span className="ml-1.5 text-xs text-primary">(düzenli)</span>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-ink/70">{formatDate(d.createdAt)}</td>
                  <td className="px-4 py-3">
                    <DonationStatusSelect donationId={d.id} status={d.status} />
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
