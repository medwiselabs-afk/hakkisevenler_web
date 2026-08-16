import Link from "next/link";
import { Landmark, ArrowRight } from "lucide-react";
import type { CampaignCardData } from "./CampaignCard";
import QuickDonateWidget from "./QuickDonateWidget";
import Reveal from "./motion/Reveal";

export default function QuickDonateSection({ campaigns }: { campaigns: CampaignCardData[] }) {
  return (
    <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 pb-16 sm:-mt-12 sm:pb-20">
      <Reveal>
        <div className="flex flex-col gap-5 md:flex-row md:items-stretch">
          <div className="md:w-3/5">
            <QuickDonateWidget campaigns={campaigns} />
          </div>

          <div className="flex flex-col justify-center gap-4 rounded-2xl bg-white p-6 text-center shadow-soft sm:p-8 md:w-2/5">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
              <Landmark size={22} />
            </span>
            <h2 className="font-display text-xl text-ink sm:text-2xl">Havale / EFT ile Bağış</h2>
            <p className="text-sm text-ink/60">
              Kart kullanmadan doğrudan IBAN üzerinden bağış yapmak isterseniz hesap
              bilgilerimize göz atın.
            </p>
            <Link
              href="/hesaplarimiz"
              className="focus-ring group mx-auto inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary-dark transition-colors hover:border-primary hover:bg-primary-light"
            >
              Hesapları Gör
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
