import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/db/schema";

function formatDate(value: string) {
  return new Date(value.replace(" ", "T") + "Z").toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default async function AdminUsersPage() {
  const rows = await db.query.users.findMany({
    orderBy: desc(users.createdAt),
    with: { donations: { columns: { id: true, amount: true, status: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Kullanıcılar</h1>
        <p className="mt-1 text-sm text-ink/60">{rows.length} kayıtlı kullanıcı.</p>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line p-8 text-center text-ink/50">
          Henüz kayıtlı kullanıcı yok.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-bg shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-sand text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3 font-medium">Ad Soyad</th>
                <th className="px-4 py-3 font-medium">E-posta</th>
                <th className="px-4 py-3 font-medium">Telefon</th>
                <th className="px-4 py-3 font-medium">Bağış Sayısı</th>
                <th className="px-4 py-3 font-medium">Rol</th>
                <th className="px-4 py-3 font-medium">Kayıt Tarihi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((u) => {
                const successful = u.donations.filter((d) => d.status === "BASARILI");
                return (
                  <tr key={u.id}>
                    <td className="px-4 py-3 font-medium text-ink">{u.fullName}</td>
                    <td className="px-4 py-3 text-ink/70">{u.email}</td>
                    <td className="px-4 py-3 text-ink/70">{u.phone ?? "—"}</td>
                    <td className="px-4 py-3 text-ink/70">{successful.length}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          u.role === "ADMIN" ? "bg-primary-light text-primary-dark" : "bg-line text-ink/60"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink/70">{formatDate(u.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
