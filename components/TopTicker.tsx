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
    <div className="relative flex items-stretch overflow-hidden bg-gradient-to-r from-primary via-primary to-primary-dark text-sm text-white sm:text-base shadow-[0_10px_40px_-10px_rgba(91,95,255,0.3)]">
      {/* Animated background gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-white/10 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-accent/10 to-transparent" />
      </div>

      <div className="relative hidden flex-shrink-0 items-center gap-2 border-r border-white/20 px-4 py-3 font-semibold sm:flex">
        <CalendarDays size={18} className="flex-shrink-0 text-accent" />
        <span>Dini Takvim</span>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="flex w-max items-center gap-6 whitespace-nowrap py-3 pl-4 pr-8 [animation-play-state:running] hover:[animation-play-state:paused] animate-marquee">
          {[...ITEMS, ...ITEMS].map(({ label, icon: Icon, href }, i) => (
            <Link
              key={i}
              href={href}
              className="focus-ring group flex flex-shrink-0 items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 transition-all duration-200 hover:bg-white/20 hover:shadow-md hover:-translate-y-0.5"
            >
              <Icon size={17} className="flex-shrink-0 text-accent group-hover:text-white" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/kampanyalar"
        className="focus-ring group relative z-10 flex flex-shrink-0 items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent/80 px-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_-5px_rgba(255,64,129,0.4)] sm:px-6 sm:py-3"
      >
        <HandHeart size={18} className="hidden sm:block" />
        <span>Bağış Yap</span>
      </Link>
    </div>
  );
}
