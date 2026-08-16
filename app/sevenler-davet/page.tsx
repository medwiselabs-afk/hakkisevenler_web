import Link from "next/link";
import type { Metadata } from "next";
import { Home, UtensilsCrossed, Truck, ArrowRight, Info } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Sevenler Davet | Hakkı Sevenler Uluslararası Yardım Derneği",
  description: "150 kişilik davet evi, catering ve mobil ikram hizmetleri.",
};

const SERVICES = [
  {
    icon: Home,
    title: "Sevenler Davet Evi",
    tagline: "150 Kişiye Kadar Modern ve Nezih Davet Alanı",
    desc: "Ankara Keçiören'deki davet evimiz nişan, sünnet, mevlit, Kur'an-ı Kerim programları, mezuniyet ve aile toplantıları için hizmet verir.",
  },
  {
    icon: UtensilsCrossed,
    title: "Catering & Toplu Yemek",
    tagline: "Siz Davetinizi Planlayın, Yemeğiniz Bizden",
    desc: "Mevlit, düğün, sünnet, toplantı ve kurumsal yemeklerinizi hazırlayıp talep ettiğiniz noktaya ulaştırıyoruz.",
  },
  {
    icon: Truck,
    title: "Mobil İkram & Organizasyon",
    tagline: "Mekân Sizden, İkram Bizden",
    desc: "Dondurma, patlamış mısır, pamuk şekeri, waffle, lokma ve sıcak yemek gibi ikramları mobil araçlarımızla yerinde servis ediyoruz.",
  },
];

export default function SevenlerDavetPage() {
  return (
    <>
      <section className="border-b border-line bg-sand/60">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
          <Reveal>
            <h1 className="font-display text-4xl text-ink sm:text-5xl">Sevenler Davet</h1>
            <p className="mt-4 text-balance text-ink/60 sm:text-lg">
              Davetiniz nerede olursa olsun, hizmetimiz yanınızda. 150 kişilik modern davet evimiz,
              catering hizmetimiz ve mobil ikram araçlarımızla özel günlerinizi birlikte
              güzelleştiriyoruz.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/iletisim"
                className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark"
              >
                Teklif Al
                <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-10">
        <Reveal className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 text-sm text-ink/60">
          <Info size={18} className="mt-0.5 flex-shrink-0 text-primary" />
          <p>
            Sevenler Davet, derneğimizin yardım ve bağış faaliyetlerinden ayrı olarak iktisadi
            işletme kapsamında <strong className="text-ink">ücretli hizmet</strong> vermektedir.
            Elde edilen gelirler yurt içi ve yurt dışı hayır faaliyetlerimize kaynak oluşturur.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <StaggerGroup className="grid gap-6 sm:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, tagline, desc }) => (
            <StaggerItem
              key={title}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
                <Icon size={20} />
              </span>
              <h3 className="font-display text-lg text-ink">{title}</h3>
              <p className="text-xs font-semibold text-primary">{tagline}</p>
              <p className="text-sm text-ink/60">{desc}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="border-t border-line bg-sand/60">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <Reveal>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Özel gününüzü birlikte planlayalım
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-ink/60">
              Mekân, yemek ve ikram ihtiyaçlarınızı tek noktadan planlayabileceğiniz organizasyon
              çözümleri sunuyoruz.
            </p>
            <Link
              href="/iletisim"
              className="focus-ring mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary-dark transition-colors hover:border-primary hover:bg-primary-light"
            >
              Organizasyon Talebi Oluştur
              <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
