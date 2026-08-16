import Link from "next/link";
import type { Metadata } from "next";
import { and, desc, eq } from "drizzle-orm";
import { ShieldCheck, Users, Camera, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { campaigns as campaignsTable } from "@/db/schema";
import CampaignCard from "@/components/CampaignCard";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Kurban Bağışı | Hakkı Sevenler Uluslararası Yardım Derneği",
  description: "Kurban vekâletinizi verin, hisse bazlı bağışınızı takip edin.",
};

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "3D Secure ödeme",
    desc: "Kart bilgileriniz iyzico'nun güvenli formunda kalır, bize ulaşmaz.",
  },
  {
    icon: Users,
    title: "Hisse bazlı takip",
    desc: "Paylı kurban kampanyalarında kaç hissenin alındığını kampanya sayfasından görürsünüz.",
  },
  {
    icon: Camera,
    title: "Kanıtla izleme",
    desc: "Dağıtım anına ait fotoğraf/video, hesabınızdaki bağış kaydına eklenir.",
  },
];

export default async function KurbanPage() {
  const kurbanCampaigns = await db.query.campaigns.findMany({
    where: and(eq(campaignsTable.isActive, true), eq(campaignsTable.category, "KURBAN")),
    orderBy: desc(campaignsTable.createdAt),
  });

  return (
    <>
      <section className="border-b border-line bg-sand/60">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
          <Reveal>
            <h1 className="font-display text-4xl text-ink sm:text-5xl">Kurban Bağışı</h1>
            <p className="mt-4 text-balance text-ink/60 sm:text-lg">
              Afrika'da, özellikle Nijerya bölgesindeki ihtiyaç sahibi topluluklarda vekâletinizle
              vacip, adak, akika ve şükür kurbanlarınızı kestiriyor; etlerini gerçek ihtiyaç
              sahibi ailelere ulaştırıyoruz. Paylı kampanyalarda hisse sayısını seçerek, tam
              kampanyalarda ise tamamını destekleyerek katılabilirsiniz.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <StaggerGroup className="grid gap-6 sm:grid-cols-3">
          {TRUST_POINTS.map(({ icon: Icon, title, desc }) => (
            <StaggerItem
              key={title}
              className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-6 text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary-dark">
                <Icon size={20} />
              </span>
              <h3 className="font-display text-base text-ink">{title}</h3>
              <p className="text-sm text-ink/60">{desc}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Açık kurban kampanyaları</h2>
          <Link
            href="/kampanyalar?kategori=KURBAN"
            className="focus-ring group hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
          >
            Tümünü Gör
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {kurbanCampaigns.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line p-8 text-center text-ink/50">
            Şu an açık bir kurban kampanyası yok. Diğer kampanyalar için{" "}
            <Link href="/kampanyalar" className="font-semibold text-primary hover:underline">
              buraya bakabilirsiniz
            </Link>
            .
          </p>
        ) : (
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {kurbanCampaigns.map((c) => (
              <StaggerItem key={c.id}>
                <CampaignCard c={c} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </>
  );
}
