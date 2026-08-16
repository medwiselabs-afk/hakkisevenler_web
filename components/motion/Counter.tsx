"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.8,
  format = "number",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  format?: "number" | "compact";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  const text =
    format === "compact"
      ? Math.round(display).toLocaleString("tr-TR", { notation: "compact", maximumFractionDigits: 1 })
      : Math.round(display).toLocaleString("tr-TR");

  return (
    <span ref={ref}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
