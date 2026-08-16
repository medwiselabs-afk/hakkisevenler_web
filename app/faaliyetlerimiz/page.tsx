import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Soup, Package, Droplets } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import ImpactGallery from "@/components/ImpactGallery";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Faaliyetlerimiz | Hakkı Sevenler Uluslararası Yardım Derneği",
  description:
    "Hafızlık eğitimi, aşevi, Gazze yardımları ve Afrika'daki su kuyusu/kurban çalışmalarımız.",
};

const AREAS = [
  {
    icon: BookOpen,
    title: "Hafızlık Kur'an Kursu",
    tagline: "Bir Hafız Yetişir, Kur'an Nesilden Nesile Yaşar",
    desc: "Ankara Keçiören'deki Hacı Mikdat Hafızlık Kur'an Kursumuzda öğrencilerin eğitim, barınma, yemek ve temel ihtiyaçlarına destek oluyoruz.",
    href: "/kampanyalar?kategori=EGITIM",
  },
  {
    icon: Soup,
    title: "Aşevi & Mobil Aşevi",
    tagline: "Bir Kap Sıcak Yemek, Bir Gönül Dolusu Dua",
    desc: "Türkiye Diyanet Vakfı Keçiören Şubesi iş birliğiyle hazırlanan sıcak yemekleri ihtiyaç sahibi ailelere, öğrencilere ve mobil aracımızla ihtiyaç duyulan noktalara ulaştırıyoruz.",
    href: "/kampanyalar?kategori=GENEL",
  },
  {
    icon: Package,
    title: "Gazze Yardımları",
    tagline: "Gazze'de Bir Sofra da Sizin Adınıza Kurulsun",
    desc: "Gazze'deki yerel imkânlarımızla düzenli sıcak yemek, ekmek, su ve temel insani ihtiyaç yardımı ulaştırmaya gayret ediyoruz.",
    href: "/kampanyalar?kategori=ACIL_YARDIM",
  },
  {
    icon: Droplets,
    title: "Afrika: Su Kuyusu & Kurban",
    tagline: "Bir Kuyu Açılır, Hayat Boyu Hayır Akmaya Devam Eder",
    desc: "Nijerya bölgesinde su kuyuları açıyor; vekâletle kestirdiğiniz vacip, adak, akika ve şükür kurbanlarını ihtiyaç sahibi ailelere ulaştırıyoruz.",
    href: "/kurban",
  },
];

export default function FaaliyetlerimizPage() {
  return (
    <>
      <section className="border-b border-line bg-sand/60">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
          <Reveal>
            <h1 className="font-display text-4xl text-ink sm:text-5xl">Faaliyetlerimiz</h1>
            <p className="mt-4 text-balance text-ink/60 sm:text-lg">
              Hafızlık eğitiminden aşevine, Gazze'den Afrika'ya kadar yurt içi ve yurt dışında
              yürüttüğümüz çalışmaları şeffaf bir raporlama anlayışıyla sürdürüyoruz.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal className="mb-10 text-center">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Bağışınızın dokunduğu alanlar</h2>
        </Reveal>
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map(({ icon: Icon, title, tagline, desc, href }) => (
            <StaggerItem key={title}>
              <Link
                href={href}
                className="focus-ring group flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-light text-accent">
                  <Icon size={20} />
                </span>
                <h3 className="font-display text-lg text-ink">{title}</h3>
                <p className="text-xs font-semibold text-primary">{tagline}</p>
                <p className="text-sm text-ink/60">{desc}</p>
                <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-semibold text-primary">
                  Detaylar
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="border-y border-line bg-sand/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <Reveal className="mb-10 text-center">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Devam eden çalışmalar</h2>
            <p className="mt-3 text-ink/60">Sahadan paylaşılan görsellerden bir seçki.</p>
          </Reveal>
          <ImpactGallery />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Sevenler Davet'i biliyor muydunuz?
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
            Davet, catering ve mobil ikram hizmetlerimiz de var
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink/60">
            Derneğimiz bünyesindeki iktisadi işletmemiz Sevenler Davet, elde ettiği gelirle yurt içi
            ve yurt dışı hayır faaliyetlerimize kaynak oluşturur — bağıştan ayrı, ücretli bir
            hizmettir.
          </p>
          <Link
            href="/sevenler-davet"
            className="focus-ring mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary-dark transition-colors hover:border-primary hover:bg-primary-light"
          >
            Sevenler Davet'i Keşfet
            <ArrowRight size={15} />
          </Link>
        </Reveal>
      </section>

      <div className="pb-16 sm:pb-24">
        <CtaBanner />
      </div>
    </>
  );
}
