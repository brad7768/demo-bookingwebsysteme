"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button, buttonClass } from "@/components/ui/Button";
import { editorialImages } from "@/lib/editorial-images";
import { EditorialImage } from "@/components/site/EditorialImage";

const ease = [0.22, 1, 0.36, 1] as const;

export function CinematicHero({
  onBook,
  onExplore,
}: {
  onBook: () => void;
  onExplore: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[78vh] overflow-hidden md:min-h-[85vh]" data-explore>
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease }}
      >
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1, 1.05] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <EditorialImage src={editorialImages.hero} alt="" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/45 to-ink/15"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.05, ease }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,rgba(28,25,22,0.35)_55%)]" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-5 pb-14 pt-28 md:min-h-[85vh] md:px-8 md:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.55fr)]">
          <div>
            <motion.p
              className="text-[11px] uppercase tracking-[0.32em] text-paper/70"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease }}
            >
              Lumière Studio
            </motion.p>
            <motion.h1
              className="mt-4 max-w-xl font-serif text-[3.25rem] leading-[0.92] tracking-[-0.03em] text-paper sm:text-7xl lg:text-[5.25rem]"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease }}
            >
              Your time.
              <br />
              Your beauty.
            </motion.h1>
            <motion.p
              className="mt-5 max-w-md text-base font-light leading-relaxed text-paper/80"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease }}
            >
              A private atelier for cut, color, and care — reserved by the hour, not the queue.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease }}
            >
              <Button onClick={onBook} className="bg-paper text-ink hover:bg-paper/90">
                Book an appointment
              </Button>
              <button type="button" onClick={onExplore} className={buttonClass("secondary", "md", "border-paper/30 bg-paper/10 text-paper backdrop-blur hover:bg-paper/20")}>
                Explore the studio
              </button>
            </motion.div>
          </div>

          <motion.aside
            className="glass-card ml-auto w-full max-w-sm rounded-3xl p-6 text-paper shadow-elevated lg:mb-4"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-paper/60">Next guest</p>
            <p className="mt-4 font-serif text-5xl tabular-nums tracking-tight">09:30</p>
            <p className="mt-2 text-lg text-paper/90">Balayage</p>
            <p className="text-sm text-paper/70">Emma Laurent</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/90" />
              Confirmed
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
