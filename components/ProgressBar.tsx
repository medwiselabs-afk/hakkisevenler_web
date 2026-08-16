"use client";

import { motion } from "framer-motion";
import { formatTl } from "@/lib/format";

export default function ProgressBar({
  current,
  goal,
}: {
  current: number;
  goal: number;
}) {
  const pct = Math.min(100, Math.round((current / Math.max(goal, 1)) * 100));

  return (
    <div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-sand">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="mt-2 flex items-baseline justify-between font-mono text-xs">
        <span className="font-semibold text-primary-dark">{formatTl(current)} toplandı</span>
        <span className="text-ink/50">Hedef {formatTl(goal)}</span>
      </div>
    </div>
  );
}
