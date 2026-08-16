"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/faaliyetlerimiz", label: "Faaliyetlerimiz" },
  { href: "/kampanyalar", label: "Kampanyalar" },
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
          ? "border-line bg-bg/90 py-2 shadow-[0_8px_30px_-15px_rgba(22,33,31,0.25)] backdrop-blur-md"
          : "border-transparent bg-bg/70 py-4 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <Link href="/" className="focus-ring group flex items-center gap-2.5 rounded">
          <Image
            src="/logo-icon.png"
            alt="Hakkı Sevenler Uluslararası Yardım Derneği"
            width={44}
            height={44}
            priority
            className="h-10 w-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
          />
          <span className="font-display text-xl font-semibold tracking-tight text-primary-dark">
            Hakkı Sevenler <span className="text-accent">Derneği</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring group relative rounded px-3 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-primary"
            >
              {item.label}
              <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/kampanyalar"
            className="focus-ring group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-warm sm:inline-flex"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative">Bağış Yap</span>
            <ArrowRight size={15} className="relative transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="focus-ring rounded-lg p-2 text-ink hover:bg-sand md:hidden"
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
            className="overflow-hidden border-t border-line bg-bg md:hidden"
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
                    className="focus-ring block rounded-lg px-3 py-2.5 text-base font-medium text-ink/85 hover:bg-sand hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
                <Link
                  href={loggedIn ? "/hesabim" : "/giris"}
                  className="focus-ring rounded-lg px-3 py-2.5 text-base font-medium text-ink/85 hover:bg-sand"
                >
                  {loggedIn ? "Hesabım" : "Giriş / Üye"}
                </Link>
                <Link
                  href="/kampanyalar"
                  className="focus-ring rounded-full bg-accent px-5 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-accent-dark"
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
