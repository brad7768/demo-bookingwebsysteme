"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { studioImages } from "@/lib/studio-images";

export function FeaturedBalayage({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper" data-explore>
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <Reveal className="relative min-h-[52vh] lg:min-h-[70vh]">
          <Image
            src={studioImages.details.balayage}
            alt="Close-up of hand-painted balayage highlights"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ink/20 to-ink/80 lg:to-ink" />
        </Reveal>
        <div className="relative flex flex-col justify-center px-6 py-16 md:px-12 lg:py-24">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.32em] text-paper/50">Featured service</p>
            <h2 className="mt-4 font-serif text-5xl uppercase tracking-[0.04em] md:text-6xl">Balayage</h2>
            <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-paper/75">
              A natural,
              <br />
              luminous look.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mt-10 space-y-2 text-sm uppercase tracking-[0.16em] text-paper/60">
            <p>180 minutes</p>
            <p className="font-serif text-3xl normal-case tracking-normal text-paper">From $260</p>
            <p className="normal-case tracking-normal text-paper/55">Includes consultation</p>
          </Reveal>
          <Reveal delay={0.14} className="mt-10">
            <Button onClick={onBook} className="btn-editorial bg-paper text-ink hover:bg-champagne">
              Book now →
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
