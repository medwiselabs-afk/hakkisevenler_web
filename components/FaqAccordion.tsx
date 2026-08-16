"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Bağışım gerçekten ihtiyaç sahibine ulaşıyor mu, nasıl görebilirim?",
    a: "Her kampanya için teslimat fotoğrafı, konum veya video kaydı tutulur ve hesabınızdaki 'Bağışlarım' sayfasından bu kanıtlara erişebilirsiniz.",
  },
  {
    q: "Kredi kartı bilgilerim güvende mi?",
    a: "Ödemeler doğrudan bizim sunucularımızdan değil, iyzico'nun PCI-DSS sertifikalı güvenli ödeme formu üzerinden alınır. Kart bilgileriniz bize hiçbir zaman ulaşmaz.",
  },
  {
    q: "Düzenli (aylık) bağış yapabilir miyim?",
    a: "Evet, kampanya sayfasında 'Aylık Düzenli' seçeneğini işaretleyerek düzenli bağışçı olabilirsiniz.",
  },
  {
    q: "Bağış makbuzumu nereden alabilirim?",
    a: "Başarılı bağışlar sonrası makbuz e-posta adresinize otomatik gönderilir; ayrıca hesabınızdaki bağış geçmişinden de indirebilirsiniz.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-sand/40"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-ink">{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-light text-primary"
              >
                <Plus size={15} strokeWidth={2.5} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[65ch] px-5 pb-4 text-sm leading-relaxed text-ink/65">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
