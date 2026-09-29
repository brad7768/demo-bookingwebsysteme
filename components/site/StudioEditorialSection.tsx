"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { studioImages } from "@/lib/studio-images";

const highlights = [
  { n: "01", title: "Private appointments", text: "One guest at a time with each stylist — the hour is yours." },
  { n: "02", title: "Experienced specialists", text: "Cut, color, and finish under one roof, with clear roles." },
  { n: "03", title: "Thoughtful service", text: "Consultation, craft, and a finish you can leave in." },
];

export function StudioEditorialSection({ onExplore }: { onExplore: () => void }) {
  return (
    <section id="studio" className="scroll-mt-24 overflow-hidden bg-champagne/30" data-explore>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:gap-16 md:px-8 md:py-28">
        <div className="relative">
          <Reveal className="relative min-h-[480px] overflow-hidden rounded-[2rem] shadow-elevated md:min-h-[620px]">
            <Image
              src={studioImages.studio.interior}
              alt="Lumière Studio interior with warm architectural lighting"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal
            delay={0.12}
            className="absolute -bottom-8 right-4 z-10 hidden w-[42%] overflow-hidden rounded-2xl border-4 border-paper shadow-float md:block"
          >
            <div className="relative aspect-[4/5]">
              <Image src={studioImages.studio.mirror} alt="Salon mirror and styling station detail" fill sizes="240px" className="object-cover" />
            </div>
          </Reveal>
          <button
            type="button"
            onClick={onExplore}
            className="absolute bottom-6 left-6 z-20 hidden h-24 w-24 items-center justify-center rounded-full border border-paper/40 bg-paper/90 text-[10px] uppercase tracking-[0.22em] text-ink shadow-float transition hover:scale-105 md:flex"
          >
            Explore
          </button>
        </div>
        <div>
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-brown">The studio</p>
            <h2 className="mt-3 font-serif text-4xl uppercase leading-tight tracking-[0.03em] md:text-5xl">Designed around your time.</h2>
            <p className="mt-5 text-sm leading-7 text-ink-soft">
              Warm interiors, editorial light, and a pace that respects the work — fewer guests, longer appointments, and a calm room before you sit down.
            </p>
          </Reveal>
          <div className="mt-10 space-y-8">
            {highlights.map((item, index) => (
              <Reveal key={item.n} delay={index * 0.07}>
                <div className="flex gap-5 border-t border-line/80 pt-6 first:border-t-0 first:pt-0">
                  <span className="font-serif text-3xl text-taupe tabular-nums">{item.n}</span>
                  <div>
                    <h3 className="font-serif text-2xl">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
