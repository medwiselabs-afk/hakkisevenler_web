import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { CATEGORY_LABEL } from "@/lib/categories";

export type CampaignCardData = {
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  currentAmount: number;
  goalAmount: number;
  isShareBased: boolean;
  totalShares?: number | null;
  takenShares: number;
};

export default function CampaignCard({ c }: { c: CampaignCardData }) {
  return (
    <Link
      href={`/kampanyalar/${c.slug}`}
      className="focus-ring group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30"
    >
      <div className="relative h-48 w-full overflow-hidden bg-sand">
        <Image
          src={c.imageUrl}
          alt={c.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary-dark shadow-sm backdrop-blur">
          {CATEGORY_LABEL[c.category] ?? c.category}
        </span>
        {c.isShareBased && c.totalShares ? (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
            <Users size={11} />
            {c.takenShares}/{c.totalShares} hisse
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-primary-dark">
          {c.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink/60">{c.summary}</p>

        <div className="mt-auto pt-2">
          <ProgressBar current={c.currentAmount} goal={c.goalAmount} />
        </div>
      </div>
    </Link>
  );
}
