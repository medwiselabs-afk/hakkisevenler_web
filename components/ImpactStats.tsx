import { eq } from "drizzle-orm";
import { HandCoins, Layers, ReceiptText, ShieldCheck } from "lucide-react";
import { db } from "@/lib/db";
import { campaigns as campaignsTable, donations as donationsTable } from "@/db/schema";
import Counter from "./motion/Counter";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";

export default async function ImpactStats() {
  const [activeCampaigns, successfulDonations] = await Promise.all([
    db.query.campaigns.findMany({ where: eq(campaignsTable.isActive, true) }),
    db.query.donations.findMany({ where: eq(donationsTable.status, "BASARILI") }),
  ]);

  const totalRaisedKurus = activeCampaigns.reduce((sum, c) => sum + c.currentAmount, 0);
  const totalRaisedTl = Math.round(totalRaisedKurus / 100);

  const stats = [
    {
      icon: HandCoins,
      value: totalRaisedTl,
      suffix: " ₺",
      label: "Toplanan bağış",
      format: "compact" as const,
    },
    {
      icon: Layers,
      value: activeCampaigns.length,
      suffix: "",
      label: "Aktif kampanya",
    },
    {
      icon: ReceiptText,
      value: successfulDonations.length,
      suffix: "",
      label: "Tamamlanan bağış kaydı",
    },
    {
      icon: ShieldCheck,
      value: 100,
      suffix: "%",
      label: "Şeffaf, kanıtlı izleme",
    },
  ];

  return (
    <section className="relative overflow-hidden border-y border-line bg-gradient-to-br from-ink via-ink to-ink/95">
      <div aria-hidden className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      <StaggerGroup className="relative mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:gap-8 md:grid-cols-4 md:py-14">
        {stats.map(({ icon: Icon, value, suffix, label, format }) => (
          <StaggerItem key={label} className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Icon size={18} className="text-accent" />
            </span>
            <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
              <Counter value={value} suffix={suffix} format={format} />
            </p>
            <p className="text-xs text-white/60 sm:text-sm">{label}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
