import { redirect } from "next/navigation";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, donations } from "@/db/schema";
import { formatTl } from "@/lib/format";
import LogoutButton from "@/components/LogoutButton";

const STATUS_LABEL: Record<string, string> = {
  BEKLEMEDE: "Beklemede",
  BASARILI: "Tamamlandı",
  BASARISIZ: "Başarısız",
  IADE: "İade Edildi",
};

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/giris");

  const [user, donationRows] = await Promise.all([
    db.query.users.findFirst({ where: eq(users.id, session.userId) }),
    db.query.donations.findMany({
      where: eq(donations.userId, session.userId),
      with: { campaign: { columns: { title: true, slug: true } } },
      orderBy: desc(donations.createdAt),
    }),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-ink">Merhaba, {user?.fullName}</h1>
          <p className="text-sm text-ink/60">{user?.email}</p>
        </div>
        <LogoutButton />
      </div>

      <h2 className="mt-10 font-display text-xl text-ink">Bağışlarım</h2>

      {donationRows.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-line p-8 text-center text-ink/50">
          Henüz bağışın yok.{" "}
          <Link href="/kampanyalar" className="font-medium text-primary hover:underline">
            Kampanyalara göz at
          </Link>
        </p>
      ) : (
        <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
          {donationRows.map((d) => (
            <div key={d.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <Link href={`/kampanyalar/${d.campaign.slug}`} className="font-medium text-ink hover:text-primary">
                  {d.campaign.title}
                </Link>
                <p className="text-xs text-ink/50">
                  {new Date(d.createdAt).toLocaleDateString("tr-TR")} · {STATUS_LABEL[d.status]}
                </p>
              </div>
              <span className="font-mono text-sm font-semibold text-primary-dark">{formatTl(d.amount)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
