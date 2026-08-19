import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "./motion/Reveal";

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
          <div className="relative h-72 w-full sm:h-80">
            <Image
              src="https://images.unsplash.com/photo-1593113630400-ea4288922497?w=1600&h=800&fit=crop&auto=format&q=80"
              alt="Gönüllüler yardım kolilerini araca yüklüyor"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1100px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
          </div>
          <div className="absolute inset-0 flex max-w-md flex-col items-start justify-center gap-4 px-6 sm:max-w-lg sm:px-14">
            <h2 className="text-balance font-display text-3xl leading-tight text-white sm:text-4xl">
              Bugün başlayın: iyiliğin bir sonraki satırını birlikte yazalım.
            </h2>
            <p className="text-sm text-white/75 sm:text-base">
              Tek seferlik ya da düzenli bağışınızla, ihtiyaç sahiplerine kanıtlanabilir bir umut
              gönderin.
            </p>
            <Link
              href="/kampanyalar"
              className="focus-ring group mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-cta px-6 py-3 text-sm font-semibold text-white shadow-glow-accent transition-all duration-300 hover:-translate-y-0.5"
            >
              Bağış Yap
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
