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
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/80">
              <Check size={13} />
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
              className="focus-ring w-full min-w-0 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-bg/40 focus:border-primary/60"
            />
            <button
              type="submit"
              aria-label="Bültene katıl"
              className="focus-ring flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105 hover:bg-primary-dark"
            >
              <ArrowRight size={16} />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
