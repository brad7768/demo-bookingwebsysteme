"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { studioImages } from "@/lib/studio-images";

const stats = [
  { label: "Client retention", value: "82%" },
  { label: "Reminder campaigns", value: "3 active" },
  { label: "Rebooking rate", value: "68%" },
];

export function MarketingView() {
  return (
    <div className="space-y-8">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Marketing</p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">Grow loyalty beyond the chair.</h1>
        <p className="mt-3 max-w-xl text-sm text-ink-soft">Automated reminders and follow-ups that turn appointments into long-term relationships.</p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06} className="glass-panel rounded-3xl p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted">{stat.label}</p>
            <p className="mt-3 font-serif text-4xl tabular-nums">{stat.value}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="overflow-hidden rounded-[2rem] border border-line bg-ink text-paper shadow-elevated">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[280px]">
            <Image src={studioImages.details.balayage} alt="" fill sizes="50vw" className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink" />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <h2 className="font-serif text-3xl leading-tight md:text-4xl">
              Create beauty.
              <br />
              Build loyalty.
            </h2>
            <p className="mt-4 text-sm leading-7 text-paper/70">
              Turn appointments into long-term clients with automated reminders, follow-ups, and rebooking prompts — tailored to your studio voice.
            </p>
            <Button className="btn-editorial mt-8 w-fit bg-paper text-ink hover:bg-champagne">View marketing tools →</Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
