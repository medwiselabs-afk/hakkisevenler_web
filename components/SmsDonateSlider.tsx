"use client";

import { useRef } from "react";
import Link from "next/link";
import { Heart, ChevronLeft, ChevronRight, ArrowRight, QrCode } from "lucide-react";
import Reveal from "./motion/Reveal";

const SMS_CAMPAIGNS = [
  {
    code: "HAFIZLIK",
    title: "Hafızlık Kur'an Kursu",
    desc: "Bir hafızın eğitim, barınma ve yemek ihtiyacına destek olmak için kodu yaz, kısa numaraya gönder.",
    amount: 50,
  },
  {
    code: "ASEVI",
    title: "Aşevi",
    desc: "İhtiyaç sahibi bir aileye bir kap sıcak yemek ulaştırmak için kodu gönder.",
    amount: 50,
  },
  {
    code: "GAZZE",
    title: "Gazze Yardımı",
    desc: "Gazze'de bir sofraya vesile olmak için kodu gönder.",
    amount: 50,
  },
  {
    code: "SUKUYUSU",
    title: "Afrika Su Kuyusu",
    desc: "Nijerya'da temiz suya erişimi olmayan bir köye kuyu açılmasına destek ol.",
    amount: 50,
  },
];

export default function SmsDonateSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 300) + 24;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <Reveal className="mb-10 text-center">
        <h2 className="font-display text-3xl text-ink sm:text-4xl">SMS ile Bağışla</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-ink/60">
          Kod yaz, kısa numaraya gönder — kart bilgisi olmadan, faturana yansıyan tek satırlık bir
          iyilik.
        </p>
      </Reveal>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SMS_CAMPAIGNS.map((s) => (
            <Link
              href="/iletisim"
              data-card
              key={s.code}
              className="group relative flex w-[270px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 sm:w-[300px]"
            >
              <div className="flex items-start justify-between p-6 pb-2">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-light text-accent transition-transform duration-300 group-hover:scale-110">
                  <Heart size={26} />
                </span>
                <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-white shadow-sm">
                  {s.amount}₺
                </span>
              </div>

              <div className="flex-grow px-6 py-2">
                <h3 className="mb-2 font-display text-xl text-ink transition-colors group-hover:text-primary-dark">
                  {s.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-ink/55">{s.desc}</p>

                <div className="mb-2 flex items-center gap-3 rounded-2xl border border-line bg-sand/40 p-3">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-white text-ink/30">
                    <QrCode size={22} />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
                      Kodu Yaz
                    </span>
                    <span className="text-base font-bold tracking-wider text-ink">{s.code}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between bg-ink px-6 py-4 text-white transition-colors duration-300 group-hover:bg-primary-dark">
                <div className="flex flex-col">
                  <span className="text-xs opacity-70">Kısa numara</span>
                  <span className="text-lg font-bold tracking-[0.2em]">XXXX</span>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  Detay
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 hidden items-center justify-center gap-4 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Önceki"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink/60 transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Sonraki"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink/60 transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <p className="mx-auto mt-4 max-w-xl text-center text-xs text-ink/40">
        * SMS bağış hattı operatör başvuru sürecinde — kısa numara aktive edildiğinde
        güncellenecektir. Şimdilik &quot;Detay&quot; bağlantısı iletişim sayfamıza yönlendirir.
      </p>
    </section>
  );
}
