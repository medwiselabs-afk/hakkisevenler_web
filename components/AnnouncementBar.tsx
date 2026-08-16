"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  UtensilsCrossed,
  Moon,
  Sparkles,
  PartyPopper,
  Gift,
  Soup,
  HandHeart,
  X,
} from "lucide-react";
import { getActiveOccasion, type SpecialOccasion } from "@/lib/religiousCalendar";

const ICONS = {
  utensils: UtensilsCrossed,
  moon: Moon,
  sparkles: Sparkles,
  party: PartyPopper,
  gift: Gift,
  soup: Soup,
  heart: HandHeart,
};

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const [occasion, setOccasion] = useState<SpecialOccasion | null>(null);

  useEffect(() => {
    const { occasion: active, occurrenceKey } = getActiveOccasion();
    const storageKey = `duyuru-${occurrenceKey}-kapatildi`;
    if (localStorage.getItem(storageKey) !== "1") {
      setOccasion(active);
      setVisible(true);
    }
  }, []);

  function close() {
    if (occasion) {
      const { occurrenceKey } = getActiveOccasion();
      localStorage.setItem(`duyuru-${occurrenceKey}-kapatildi`, "1");
    }
    setVisible(false);
  }

  if (!visible || !occasion) return null;

  const Icon = ICONS[occasion.icon];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25">
        <div className="h-full w-full animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.5),transparent)] bg-[length:200%_100%]" />
      </div>

      <Link
        href={occasion.href}
        className="focus-ring group relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-8 py-2 text-center sm:flex-nowrap sm:gap-3 sm:px-10 sm:py-2.5"
      >
        <span className="flex-shrink-0 rounded-full border border-accent/50 bg-accent/15 px-2.5 py-0.5 font-display text-xs font-semibold tracking-wide text-accent-light sm:px-3 sm:py-1">
          {occasion.label}
        </span>

        <span className="hidden text-white/40 sm:inline">•</span>

        <span className="text-xs leading-tight text-white/90 sm:text-sm">{occasion.message}</span>

        <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center sm:ml-0.5 sm:h-6 sm:w-6">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-white/40" />
          <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25 sm:h-5 sm:w-5">
            <Icon size={10} />
          </span>
        </span>
      </Link>

      <button
        type="button"
        onClick={close}
        aria-label="Duyuruyu kapat"
        className="focus-ring absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/15 hover:text-white sm:right-4"
      >
        <X size={15} />
      </button>
    </div>
  );
}
