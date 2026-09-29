"use client";

import { professionals } from "@/lib/data";
import { professionalImage } from "@/lib/editorial-images";
import { Reveal } from "@/components/motion/Reveal";
import { EditorialImage } from "@/components/site/EditorialImage";
import { Button } from "@/components/ui/Button";

export function ProfessionalsSection({ onBook }: { onBook: (professionalId: string) => void }) {
  return (
    <section id="professionals" className="scroll-mt-24 border-t border-line/80">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Professionals</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Stylists who listen.</h2>
        </Reveal>
        <div className="mt-10 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {professionals.map((person, index) => (
            <Reveal key={person.id} delay={index * 0.06} className="min-w-[78vw] shrink-0 snap-center md:min-w-0">
              <article className="group relative overflow-hidden rounded-[1.75rem] bg-ink shadow-elevated">
                <div className="relative aspect-[3/4]">
                  <EditorialImage
                    src={professionalImage(person.id)}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 78vw, 33vw"
                    className="transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 transition duration-500 group-hover:-translate-y-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-paper/60">{person.role}</p>
                    <h3 className="mt-2 font-serif text-3xl text-paper">{person.name}</h3>
                    <p className="mt-2 text-sm text-paper/75 opacity-90 md:opacity-0 md:transition md:group-hover:opacity-100">
                      {person.bio.split(".")[0]}.
                    </p>
                    <div className="mt-4 opacity-100 md:opacity-0 md:transition md:group-hover:opacity-100">
                      <Button size="sm" variant="secondary" className="border-paper/30 bg-paper/15 text-paper backdrop-blur" onClick={() => onBook(person.id)}>
                        View profile
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
