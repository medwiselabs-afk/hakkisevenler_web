import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Megaphone, HandCoins, Users, ExternalLink } from "lucide-react";
import { getCurrentAdmin } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

const NAV = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/kampanyalar", label: "Kampanyalar", icon: Megaphone },
  { href: "/admin/bagislar", label: "Bağışlar", icon: HandCoins },
  { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: Users },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/giris?redirect=/admin");

  return (
    <div className="flex min-h-screen bg-sand">
      <aside className="hidden w-60 flex-shrink-0 flex-col border-r border-line bg-bg sm:flex">
        <div className="border-b border-line px-5 py-5">
          <p className="font-display text-lg text-ink">Yönetim Paneli</p>
          <p className="mt-0.5 truncate text-xs text-ink/50">{admin.email}</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-primary-light hover:text-primary-dark"
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-line px-3 py-4">
          <Link
            href="/"
            className="focus-ring flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/60 transition-colors hover:bg-primary-light hover:text-primary-dark"
          >
            <ExternalLink size={17} />
            Siteye Dön
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-line bg-bg px-4 py-3 sm:hidden">
          <p className="font-display text-base text-ink">Yönetim Paneli</p>
          <Link href="/" className="text-sm font-medium text-primary">
            Siteye Dön
          </Link>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-line bg-bg px-3 py-2 sm:hidden">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-ink/70 hover:bg-primary-light hover:text-primary-dark"
            >
              {label}
            </Link>
          ))}
        </nav>
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
