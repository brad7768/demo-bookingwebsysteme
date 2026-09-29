"use client";

import Image from "next/image";
import { professionals } from "@/lib/data";
import { staffImage } from "@/lib/studio-images";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function ProfessionalsSection({ onBook }: { onBook: (professionalId: string) => void }) {
  return (
    <section id="professionals" className="scroll-mt-24 border-t border-line/80 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-brown">Professionals</p>
          <h2 className="mt-3 font-serif text-4xl uppercase tracking-[0.03em] md:text-5xl">The atelier team.</h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {professionals.map((person) => (
            <StaggerItem key={person.id}>
              <article className="group relative overflow-hidden rounded-[1.75rem] bg-ink shadow-elevated transition duration-500 hover:-translate-y-1 hover:shadow-float">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={staffImage(person.id)}
                    alt={`${person.name}, ${person.role}`}
                    fill
                    sizes="(max-width: 768px) 85vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                    <div>
                      <h3 className="font-serif text-2xl uppercase tracking-[0.04em] text-paper">{person.name}</h3>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-paper/65">{person.role}</p>
                      {person.yearsExperience ? (
                        <p className="mt-2 text-xs text-paper/55">{person.yearsExperience} years of experience</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => onBook(person.id)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/30 bg-paper/10 text-paper opacity-100 backdrop-blur transition group-hover:scale-105 md:opacity-0 md:group-hover:opacity-100"
                      aria-label={`Book with ${person.name}`}
                    >
                      →
                    </button>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
