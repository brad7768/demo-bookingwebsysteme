"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/motion/Counter";
import { Button, buttonClass } from "@/components/ui/Button";
import { studioImages } from "@/lib/studio-images";

const ease = [0.22, 1, 0.36, 1] as const;

const metrics = [
  { value: 500, suffix: "+", label: "Happy clients" },
  { value: 3, label: "Expert stylists" },
  { value: 5, label: "Premium services" },
  { value: 4.9, decimals: 1, label: "Google rating" },
];

export function CinematicHero({
  onBook,
  onExplore,
}: {
  onBook: () => void;
  onExplore: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[88vh] overflow-hidden md:min-h-[92vh]" data-explore>
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.15, ease }}
      >
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1, 1.04] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <Image
            src={studioImages.hero.salon}
            alt="Warm-lit luxury hair salon interior"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/82 via-ink/50 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-between px-5 pb-8 pt-28 md:min-h-[92vh] md:px-8 md:pb-10">
        <div className="grid flex-1 items-end gap-12 pb-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.5fr)]">
          <div>
            <motion.p
              className="text-[11px] uppercase tracking-[0.38em] text-paper/65"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              Lumière Studio
            </motion.p>
            <motion.h1
              className="mt-5 max-w-2xl font-serif text-[2.75rem] uppercase leading-[0.9] tracking-[0.02em] text-paper sm:text-6xl lg:text-[4.75rem]"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease }}
            >
              Your time.
              <br />
              Your beauty.
            </motion.h1>
            <motion.p
              className="mt-6 max-w-md text-base font-light leading-relaxed text-paper/78"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
            >
              Editorial color and precision cuts in a private atelier — every appointment held with intention.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap gap-4"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
            >
              <Button onClick={onBook} className="btn-editorial bg-paper px-7 text-ink hover:bg-champagne">
                Book an appointment →
              </Button>
              <button
                type="button"
                onClick={onExplore}
                className={buttonClass("secondary", "md", "btn-editorial border-paper/35 bg-paper/8 text-paper backdrop-blur hover:bg-paper/15")}
              >
                Explore the studio →
              </button>
            </motion.div>
          </div>

          <motion.aside
            className={`glass-card shadow-float ml-auto w-full max-w-[22rem] rounded-[1.75rem] p-5 text-paper md:p-6 ${reduce ? "" : "animate-float"}`}
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.5, ease }}
          >
            <p className="text-[10px] uppercase tracking-[0.26em] text-paper/55">Next appointment</p>
            <div className="mt-4 flex gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-paper/20">
                <Image src={studioImages.hero.stylist} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div>
                <p className="font-serif text-4xl tabular-nums leading-none">09:30</p>
                <p className="mt-1 text-sm text-paper/85">Balayage</p>
                <p className="text-xs text-paper/65">Emma Laurent</p>
              </div>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-paper/75">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/90" />
              Confirmed
            </div>
          </motion.aside>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-6 border-t border-paper/15 pt-6 md:grid-cols-4"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {metrics.map((m) => (
            <div key={m.label}>
              <p className="font-serif text-3xl text-paper md:text-4xl">
                <Counter value={m.value} decimals={m.decimals ?? 0} suffix={m.suffix ?? ""} />
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-paper/55">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
