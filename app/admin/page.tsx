import Link from "next/link";
import { eq, sql } from "drizzle-orm";
import { Megaphone, HandCoins, Users, TrendingUp } from "lucide-react";
import { db } from "@/lib/db";
import { campaigns, donations, users } from "@/db/schema";

function formatTl(kurus: number) {
  return (kurus / 100).toLocaleString("tr-TR", { style: "currency", currency: "TRY" });
}

export default async function AdminDashboard() {
  const [campaignCount] = await db.select({ count: sql<number>`count(*)` }).from(campaigns);
  const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users);
  const [donationStats] = await db
    .select({
      count: sql<number>`count(*)`,
      total: sql<number>`coalesce(sum(case when status = 'BASARILI' then amount else 0 end), 0)`,
    })
    .from(donations);
  const recentDonations = await db.query.donations.findMany({
    orderBy: (d, { desc }) => desc(d.createdAt),
    limit: 5,
    with: { campaign: { columns: { title: true } } },
  });

  const cards = [
    { label: "Toplam Kampanya", value: campaignCount.count, icon: Megaphone, href: "/admin/kampanyalar" },
    { label: "Toplam Bağış", value: donationStats.count, icon: HandCoins, href: "/admin/bagislar" },
    { label: "Kayıtlı Kullanıcı", value: userCount.count, icon: Users, href: "/admin/kullanicilar" },
    { label: "Tahsil Edilen Tutar", value: formatTl(donationStats.total), icon: TrendingUp, href: "/admin/bagislar" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-ink">Genel Bakış</h1>
        <p className="mt-1 text-sm text-ink/60">Site içeriğini ve bağışları buradan yönetebilirsiniz.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="focus-ring rounded-2xl border border-line bg-bg p-5 shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <Icon size={20} className="text-primary" />
            <p className="mt-3 text-2xl font-semibold text-ink">{value}</p>
            <p className="mt-1 text-sm text-ink/60">{label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-bg p-5 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg text-ink">Son Bağışlar</h2>
          <Link href="/admin/bagislar" className="text-sm font-medium text-primary hover:underline">
            Tümünü Gör
          </Link>
        </div>
        {recentDonations.length === 0 ? (
          <p className="text-sm text-ink/50">Henüz bağış yok.</p>
        ) : (
          <ul className="divide-y divide-line">
            {recentDonations.map((d) => (
              <li key={d.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium text-ink">{d.isAnonymous ? "Anonim" : d.donorName ?? "—"}</p>
                  <p className="text-ink/50">{d.campaign?.title ?? "—"}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-ink">{formatTl(d.amount)}</p>
                  <p
                    className={
                      d.status === "BASARILI"
                        ? "text-success"
                        : d.status === "BASARISIZ"
                          ? "text-accent"
                          : "text-ink/50"
                    }
                  >
                    {d.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
