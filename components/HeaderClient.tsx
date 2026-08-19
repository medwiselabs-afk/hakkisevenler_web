"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/faaliyetlerimiz", label: "Faaliyetlerimiz" },
  { href: "/kampanyalar", label: "Kampanyalar" },
  { href: "/sevenler-davet", label: "Sevenler Davet" },
  { href: "/kurban", label: "Kurban" },
  { href: "/iletisim", label: "İletişim" },
];

export default function HeaderClient({ loggedIn }: { loggedIn: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-line/50 bg-bg/95 py-2 shadow-[0_10px_40px_-10px_rgba(91,95,255,0.2)] backdrop-blur-xl"
          : "border-transparent bg-gradient-to-b from-bg via-bg to-bg/80 py-4 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-4">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-xl">
          <Image
            src="/logo-icon.png"
            alt="Hakkı Sevenler Uluslararası Yardım Derneği"
            width={56}
            height={56}
            priority
            className="h-12 w-12 flex-shrink-0 sm:h-14 sm:w-14"
          />
          <span className="flex flex-col leading-tight">
            <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent sm:text-xl">
              Hakkı Sevenler Derneği
            </span>
            <span className="hidden whitespace-nowrap text-sm font-medium text-primary/70 sm:block">
              Hayırlı İşlerde Ortağınız
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring group relative whitespace-nowrap rounded-full px-2.5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  active 
                    ? "bg-gradient-to-br from-primary/15 to-accent/15 text-primary font-semibold shadow-md" 
                    : "text-ink/70 hover:text-primary hover:bg-primary/8"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-2 bottom-0.5 h-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/kampanyalar"
            className="focus-ring group relative hidden items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-base font-bold text-white shadow-[0_10px_30px_-5px_rgba(91,95,255,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_-5px_rgba(255,64,129,0.4)] sm:inline-flex"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative">Bağış Yap</span>
            <ArrowRight size={18} className="relative transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="focus-ring rounded-lg p-2 text-ink hover:bg-primary/10 hover:text-primary transition-colors xl:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line/50 bg-gradient-to-b from-bg to-bg/95 xl:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className="focus-ring block rounded-lg px-3 py-3 text-base font-medium text-ink/85 transition-all hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-line/50 pt-4">
                <Link
                  href={loggedIn ? "/hesabim" : "/giris"}
                  className="focus-ring rounded-lg px-3 py-3 text-base font-medium text-ink/85 transition-all hover:bg-primary/10 hover:text-primary"
                >
                  {loggedIn ? "Hesabım" : "Giriş / Üye"}
                </Link>
                <Link
                  href="/kampanyalar"
                  className="focus-ring rounded-full bg-gradient-to-r from-primary to-accent px-5 py-3 text-center text-base font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-[0_15px_35px_-5px_rgba(255,64,129,0.4)]"
                >
                  Bağış Yap
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
