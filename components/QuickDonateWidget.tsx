"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HandCoins, ChevronDown } from "lucide-react";
import type { CampaignCardData } from "./CampaignCard";
import { CATEGORY_LABEL } from "@/lib/categories";

const QUICK_AMOUNTS = [100, 250, 500];

export default function QuickDonateWidget({ campaigns }: { campaigns: CampaignCardData[] }) {
  const router = useRouter();

  const categoryOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const c of campaigns) {
      if (!seen.has(c.category)) seen.set(c.category, c.slug);
    }
    return Array.from(seen.entries()).map(([category, slug]) => ({ category, slug }));
  }, [campaigns]);

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [amount, setAmount] = useState<number>(250);
  const [showCustom, setShowCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  if (categoryOptions.length === 0) return null;

  const selected = categoryOptions[categoryIndex];
  const finalAmount = showCustom ? Number(customAmount) || 0 : amount;

  function handleDonate() {
    if (finalAmount <= 0) return;
    router.push(`/kampanyalar/${selected.slug}?tutar=${finalAmount}`);
  }

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-soft sm:p-8">
      <h2 className="text-center font-display text-xl text-ink sm:text-2xl">Hızlı Bağış</h2>

      <div className="mx-auto mt-5 max-w-xs">
        <label className="sr-only" htmlFor="hizli-bagis-tur">
          Bağış Türü
        </label>
        <div className="relative">
          <select
            id="hizli-bagis-tur"
            value={categoryIndex}
            onChange={(e) => setCategoryIndex(Number(e.target.value))}
            className="focus-ring w-full appearance-none rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink outline-none"
          >
            {categoryOptions.map((opt, i) => (
              <option key={opt.category} value={i}>
                {CATEGORY_LABEL[opt.category] ?? opt.category}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/40" />
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {QUICK_AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => {
                setAmount(a);
                setShowCustom(false);
              }}
              className={`focus-ring rounded-full border py-2.5 text-sm font-semibold transition-colors ${
                !showCustom && amount === a
                  ? "border-primary bg-primary-light text-primary-dark"
                  : "border-line text-ink/70 hover:border-primary"
              }`}
            >
              {a}₺
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustom(true)}
            className={`focus-ring rounded-full border py-2.5 text-sm font-semibold transition-colors ${
              showCustom
                ? "border-primary bg-primary-light text-primary-dark"
                : "border-line text-ink/70 hover:border-primary"
            }`}
          >
            Diğer
          </button>
        </div>

        {showCustom && (
          <input
            type="number"
            min={1}
            autoFocus
            placeholder="Tutar girin (₺)"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="focus-ring mt-3 w-full rounded-full border border-line px-4 py-2.5 text-sm"
          />
        )}

        <button
          type="button"
          onClick={handleDonate}
          disabled={finalAmount <= 0}
          className="focus-ring group mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark disabled:pointer-events-none disabled:opacity-50"
        >
          <HandCoins size={16} className="transition-transform duration-300 group-hover:scale-110" />
          Bağış Yap
        </button>
      </div>
    </div>
  );
}
