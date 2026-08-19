"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-[42px]">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-primary-light"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
              <Check size={14} className="text-white" />
            </span>
            Teşekkürler, bültenimize eklendiniz.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
          >
            <input
              type="email"
              required
              placeholder="e-posta adresiniz"
              className="focus-ring w-full min-w-0 rounded-full border border-white/20 bg-white/8 px-4 py-2.5 text-sm text-white placeholder:text-white/50 transition-all hover:bg-white/12 focus:border-primary/70 focus:bg-white/15 focus:placeholder:text-white/60"
            />
            <button
              type="submit"
              aria-label="Bültene katıl"
              className="focus-ring flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white transition-all hover:scale-110 hover:shadow-lg hover:bg-primary-dark active:scale-95"
            >
              <ArrowRight size={16} />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
