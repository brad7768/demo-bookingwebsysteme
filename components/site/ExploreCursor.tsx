"use client";

import { useEffect, useState } from "react";

export function ExploreCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduce) return;
    setEnabled(true);

    const onMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      const target = (event.target as HTMLElement | null)?.closest("[data-explore]");
      setVisible(Boolean(target));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled || !visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[60] hidden mix-blend-difference md:block"
      style={{ left: pos.x + 14, top: pos.y + 14 }}
      aria-hidden
    >
      <span className="text-[10px] uppercase tracking-[0.28em] text-paper">Explore</span>
    </div>
  );
}
