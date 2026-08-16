import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { MousePointerClick, ShieldCheck, Camera } from "lucide-react";
import { db } from "@/lib/db";
import { campaigns as campaignsTable } from "@/db/schema";
import CampaignSlider from "@/components/CampaignSlider";
import QuickDonateSection from "@/components/QuickDonateSection";
import ImpactStats from "@/components/ImpactStats";
import ImpactGallery from "@/components/ImpactGallery";
import CtaBanner from "@/components/CtaBanner";
import SmsDonateSlider from "@/components/SmsDonateSlider";
import CampaignCard from "@/components/CampaignCard";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const STEPS = [
  {
    n: "01",
    icon: MousePointerClick,
    t: "Bağışını seç",
    d: "Kampanya seç ya da hızlı bağış ile tutarını gir.",
  },
  {
    n: "02",
    icon: ShieldCheck,
    t: "Güvenle öde",
    d: "Kart bilgin iyzico'nun güvenli formunda kalır, bize ulaşmaz.",
  },
  {
    n: "03",
    icon: Camera,
    t: "Kanıtla izle",
    d: "Bağışının ulaştığı ana ait fotoğraf/video hesabına düşer.",
  },
];

export default async function HomePage() {
  const campaigns = await db.query.campaigns.findMany({
    where: eq(campaignsTable.isActive, true),
    orderBy: desc(campaignsTable.createdAt),
    limit: 6,
  });

  return (
    <>
      <CampaignSlider campaigns={campaigns} />
      <QuickDonateSection campaigns={campaigns} />
      <ImpactStats />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Şu an desteğe açık kampanyalar</h2>
          <Link
            href="/kampanyalar"
            className="focus-ring group hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
          >
            Tümünü Gör
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        {campaigns.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line p-8 text-center text-ink/50">
            Henüz kampanya eklenmedi. <code className="font-mono">npm run db:seed</code> ile örnek veriyi yükleyebilirsiniz.
          </p>
        ) : (
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((c) => (
              <StaggerItem key={c.id}>
                <CampaignCard c={c} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>

      <section className="relative overflow-hidden border-y border-line bg-sand/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Nasıl çalışır?</h2>
          </Reveal>

          <StaggerGroup className="relative grid gap-10 sm:grid-cols-3 sm:gap-8">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-9 hidden border-t border-dashed border-primary/25 sm:block"
            />
            {STEPS.map(({ n, icon: Icon, t, d }) => (
              <StaggerItem key={n} className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-primary/20 bg-white">
                  <Icon size={26} className="text-primary" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-white">
                    {n}
                  </span>
                </span>
                <h3 className="mt-4 font-display text-xl text-ink">{t}</h3>
                <p className="mt-1 text-sm text-ink/60">{d}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <SmsDonateSlider />

      <section id="kanitlar" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:py-24">
        <Reveal className="mb-10 text-center">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Deftere düşen anlar</h2>
        </Reveal>
        <ImpactGallery />
      </section>

      <div className="py-4">
        <CtaBanner />
      </div>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <Reveal className="mb-6 text-center">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Sıkça Sorulan Sorular</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <FaqAccordion />
        </Reveal>
      </section>
    </>
  );
}
