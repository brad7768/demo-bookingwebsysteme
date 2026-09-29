"use client";

import { motion, useReducedMotion } from "framer-motion";

export function KpiCard({
  label,
  value,
  caption,
  trend,
  spark,
}: {
  label: string;
  value: string;
  caption: string;
  trend?: string;
  spark?: number[];
}) {
  const reduce = useReducedMotion();
  const points = spark ?? [4, 6, 5, 8, 7, 9, 8];
  const max = Math.max(...points);
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - (p / max) * 80 - 10;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <motion.article
      className="glass-panel relative overflow-hidden rounded-3xl p-5"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={reduce ? undefined : { y: -2 }}
    >
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-3 font-serif text-5xl tabular-nums tracking-tight">{value}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-sm text-ink-soft">{caption}</p>
        {trend ? <span className="text-xs text-taupe-deep">{trend}</span> : null}
      </div>
      <svg viewBox="0 0 100 100" className="pointer-events-none absolute bottom-0 right-0 h-16 w-28 opacity-30" aria-hidden>
        <path d={path} fill="none" stroke="currentColor" strokeWidth="2" className="text-taupe" />
      </svg>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-line">
        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-taupe/80 to-ink/40" />
      </div>
    </motion.article>
  );
}
