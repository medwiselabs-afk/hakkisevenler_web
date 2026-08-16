"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, X, Images } from "lucide-react";
import { WhatsAppIcon } from "./SocialIcons";
import { whatsappLink } from "@/lib/contact";

const SESSION_KEY = "tereddut-popup-gosterildi";
const DELAY_MS = 20000;

export default function HesitationPopup() {
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") return;

    function show() {
      if (shownRef.current) return;
      shownRef.current = true;
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }

    const timer = setTimeout(show, DELAY_MS);

    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) show();
    }
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  function close() {
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-soft sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Kapat"
              className="focus-ring absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-sand hover:text-ink"
            >
              <X size={16} />
            </button>

            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-light text-accent">
              <ShieldCheck size={24} />
            </span>

            <h2 className="mt-4 font-display text-xl text-ink sm:text-2xl">Tereddütleriniz mi var?</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              Bağışınızın her aşamasını Şeffaflık Defteri&apos;nde paylaşıyoruz. Teslimat kanıtlarını
              fotoğraf ve videoyla iletiyor, sorularınızı canlı olarak yanıtlıyoruz.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                href="/#kanitlar"
                onClick={close}
                className="focus-ring flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink/80 transition-colors hover:border-primary hover:text-primary"
              >
                <Images size={16} />
                Kanıt Galerisi
              </Link>
              <a
                href={whatsappLink("Merhaba, bağışlarla ilgili bilgi almak istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="focus-ring flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon size={16} />
                WhatsApp Destek Hattı
              </a>
            </div>

            <button
              type="button"
              onClick={close}
              className="focus-ring mx-auto mt-4 block text-center text-xs font-medium text-ink/40 underline-offset-2 hover:text-ink/60 hover:underline"
            >
              Daha sonra hatırlat
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
