"use client";

import { Reveal } from "@/components/motion/Reveal";
import { editorialImages } from "@/lib/editorial-images";
import { EditorialImage } from "@/components/site/EditorialImage";

const highlights = [
  { n: "01", title: "Private appointments", text: "One guest at a time with each stylist — the hour is yours." },
  { n: "02", title: "Experienced specialists", text: "Cut, color, and finish under one roof, with clear roles." },
  { n: "03", title: "Thoughtful service", text: "Consultation, craft, and a finish you can leave in." },
];

export function StudioEditorialSection() {
  return (
    <section id="studio" className="scroll-mt-24 overflow-hidden" data-explore>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[0.58fr_0.42fr] md:items-center md:gap-14 md:px-8 md:py-28">
        <Reveal className="relative min-h-[420px] overflow-hidden rounded-[2rem] md:min-h-[640px]">
          <EditorialImage src={editorialImages.studio} alt="" fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
        </Reveal>
        <div>
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">The studio</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">Designed around your time.</h2>
            <p className="mt-5 text-sm leading-7 text-ink-soft">
              Lumière keeps the day short on purpose — fewer guests, longer appointments, and a room that feels calm before you sit down.
            </p>
          </Reveal>
          <div className="mt-10 space-y-8">
            {highlights.map((item, index) => (
              <Reveal key={item.n} delay={index * 0.08}>
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
