"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const steps = [
  { n: "01", title: "Choose your service", text: "Visual cards with timing and price — no surprises at checkout." },
  { n: "02", title: "Choose your time", text: "Pick your stylist and an opening that fits the length of your appointment." },
  { n: "03", title: "You're booked", text: "A digital confirmation card — add it to your calendar in one tap." },
];

export function HowItWorksSection({ onBook }: { onBook: () => void }) {
  return (
    <section id="process" className="scroll-mt-24 border-t border-line/80 bg-paper/40">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">How booking works</p>
          <h2 className="mt-3 max-w-lg font-serif text-4xl md:text-5xl">Three quiet steps.</h2>
        </Reveal>
        <Stagger className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <StaggerItem key={step.n}>
              <p className="font-serif text-6xl text-taupe/40 tabular-nums">{step.n}</p>
              <h3 className="mt-4 font-serif text-3xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{step.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-14" delay={0.1}>
          <button
            type="button"
            onClick={onBook}
            className="text-sm uppercase tracking-[0.18em] text-ink underline decoration-taupe underline-offset-8 transition hover:decoration-ink"
          >
            Start booking
          </button>
        </Reveal>
      </div>
    </section>
  );
}
