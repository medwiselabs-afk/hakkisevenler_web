import Link from "next/link";
import { ArrowRight, PartyPopper, Home, UtensilsCrossed, Truck } from "lucide-react";
import Reveal from "./motion/Reveal";

const ICONS = [Home, UtensilsCrossed, Truck];

export default function SevenlerDavetTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-8 shadow-soft sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-amber-300/30 blur-3xl"
          />

          <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-amber-800">
                <PartyPopper size={13} />
                Sevenler Davet&apos;i Biliyor Muydunuz?
              </span>
              <h2 className="mt-4 text-balance font-display text-2xl leading-tight text-ink sm:text-3xl">
                Davet, Catering ve Mobil İkram Hizmetlerimiz de Var!
              </h2>
              <p className="mt-3 text-ink/65">
                Hakkı Sevenler Uluslararası Yardım Derneği bünyesindeki iktisadi işletmemiz
                Sevenler Davet ile; 150 kişilik modern davet evi • Catering • Toplu yemek • Mobil
                ikram • Okul etkinlikleri • Organizasyon hizmetleri sunuyoruz.
              </p>
              <p className="mt-2 text-sm text-ink/50">
                Özel gününüzü planlamak veya hizmetlerimiz hakkında bilgi almak için Sevenler
                Davet sayfamızı ziyaret edin.
              </p>
            </div>

            <div className="flex flex-shrink-0 flex-col items-start gap-4 sm:items-end">
              <div className="flex items-center gap-2">
                {ICONS.map((Icon, i) => (
                  <span
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700"
                  >
                    <Icon size={17} />
                  </span>
                ))}
              </div>
              <Link
                href="/sevenler-davet"
                className="focus-ring group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_50px_-18px_rgba(217,119,6,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700"
              >
                Sevenler Davet&apos;i Keşfet
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
