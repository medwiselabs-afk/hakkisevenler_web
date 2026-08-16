import Link from "next/link";
import { CalendarDays, HandHeart, Soup, Gift, UtensilsCrossed, BookOpen, Coins, Droplets } from "lucide-react";

const ITEMS = [
  { label: "Sadaka", icon: HandHeart, href: "/kampanyalar" },
  { label: "Aşure Hayrı", icon: Soup, href: "/kampanyalar" },
  { label: "Kurban & Adak Vekâleti", icon: Gift, href: "/kurban" },
  { label: "Mevlid Kandili Bağışı", icon: UtensilsCrossed, href: "/kampanyalar" },
  { label: "Kur'an-ı Kerim Hediyesi", icon: BookOpen, href: "/faaliyetlerimiz" },
  { label: "Zekât & Fitre", icon: Coins, href: "/kampanyalar" },
  { label: "Su Kuyusu", icon: Droplets, href: "/kampanyalar?kategori=SU_KUYUSU" },
];

export default function TopTicker() {
  return (
    <div className="relative flex items-stretch overflow-hidden bg-primary-dark text-xs text-white sm:text-sm">
      <div className="hidden flex-shrink-0 items-center gap-1.5 border-r border-white/15 px-4 py-2 font-semibold sm:flex">
        <CalendarDays size={14} />
        Yaklaşan dini günler
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex w-max items-center gap-8 whitespace-nowrap py-2 pl-4 pr-8 [animation-play-state:running] hover:[animation-play-state:paused] animate-marquee">
          {[...ITEMS, ...ITEMS].map(({ label, icon: Icon, href }, i) => (
            <Link
              key={i}
              href={href}
              className="focus-ring flex items-center gap-1.5 text-white/90 transition-colors hover:text-white"
            >
              <Icon size={13} />
              {label}
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/kampanyalar"
        className="focus-ring flex flex-shrink-0 items-center gap-1.5 bg-accent px-4 font-semibold text-white transition-colors hover:bg-accent-dark sm:px-6"
      >
        Bağış Yap
      </Link>
    </div>
  );
}
