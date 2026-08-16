"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, HandHeart, Info } from "lucide-react";
import type { CampaignCardData } from "./CampaignCard";
import { CATEGORY_LABEL } from "@/lib/categories";

const AUTO_ADVANCE_MS = 5500;

export default function CampaignSlider({ campaigns }: { campaigns: CampaignCardData[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = campaigns.length;

  const go = useCallback(
    (next: number) => {
      setDirection(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex(((next % count) + count) % count);
    },
    [count, index]
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, count]);

  if (count === 0) return null;

  const c = campaigns[index];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/60 via-bg to-bg">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 animate-blob rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-16 top-32 h-80 w-80 animate-blob rounded-full bg-accent/25 blur-3xl [animation-delay:3s]" />
      </div>

      <div
        className="relative mx-auto max-w-6xl px-4 py-10 sm:py-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={c.slug}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-[1.35fr_1fr]"
            >
              <div className="relative h-64 w-full sm:h-80 md:h-[440px]">
                <Image
                  src={c.imageUrl}
                  alt={c.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="(min-width: 768px) 620px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 md:p-12">
                <span className="w-fit rounded-full bg-primary-light px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-primary-dark">
                  {CATEGORY_LABEL[c.category] ?? c.category}
                </span>
                <h2 className="text-balance font-display text-3xl leading-[1.15] text-ink sm:text-4xl">
                  {c.title}
                </h2>
                <p className="max-w-md text-ink/65">{c.summary}</p>

                <div className="mt-2 flex flex-wrap gap-3">
                  <Link
                    href={`/kampanyalar/${c.slug}`}
                    className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary-dark transition-colors hover:border-primary hover:bg-primary-light"
                  >
                    <Info size={15} />
                    Detaylı Bilgi
                  </Link>
                  <Link
                    href={`/kampanyalar/${c.slug}`}
                    className="focus-ring group inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark"
                  >
                    <HandHeart size={15} className="transition-transform duration-300 group-hover:scale-110" />
                    Bağış Yap
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Önceki kampanya"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink/60 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft size={17} />
            </button>

            <div className="flex items-center gap-2">
              {campaigns.map((slide, i) => (
                <button
                  key={slide.slug}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${i + 1}. kampanyaya git`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-primary" : "w-2 bg-line hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Sonraki kampanya"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink/60 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
