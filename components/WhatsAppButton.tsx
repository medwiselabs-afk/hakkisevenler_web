"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "./SocialIcons";
import { whatsappLink } from "@/lib/contact";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink("Merhaba, bir sorum var.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp'tan bize yazın"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group fixed bottom-5 right-5 z-[60] flex items-center sm:bottom-6 sm:right-6"
    >
      <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-ink px-0 py-2.5 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:max-w-[220px] group-hover:px-4 group-hover:opacity-100 group-hover:mr-2">
        WhatsApp'tan Yazın
      </span>

      <span className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-warm transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-[#25D366]" />
        <WhatsAppIcon size={26} className="relative text-white" />
      </span>
    </motion.a>
  );
}
