"use client";

import { useState } from "react";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CinematicHero } from "@/components/site/CinematicHero";
import { ExploreCursor } from "@/components/site/ExploreCursor";
import { HowItWorksSection } from "@/components/site/HowItWorksSection";
import { ProfessionalsSection } from "@/components/site/ProfessionalsSection";
import { ServiceVisualCard } from "@/components/site/ServiceVisualCard";
import { StudioEditorialSection } from "@/components/site/StudioEditorialSection";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { services, studio } from "@/lib/data";

type Section = "services" | "studio" | "professionals" | "process" | "contact";

export function StudioHome() {
  const [mode, setMode] = useState<"site" | "book">("site");
  const [launch, setLaunch] = useState<{ id: number; serviceId: string | null; professionalId: string | null } | null>(null);

  function openBooking(serviceId?: string, professionalId?: string) {
    setLaunch({ id: Date.now(), serviceId: serviceId ?? null, professionalId: professionalId ?? null });
    setMode("book");
  }

  function navigate(section?: Section) {
    setMode("site");
    if (!section) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  return (
    <>
      <ExploreCursor />
      <Header mode={mode} onNavigate={navigate} onBook={() => openBooking()} />
      {mode === "book" ? (
        <BookingFlow launch={launch} onExit={() => navigate()} />
      ) : (
        <main id="main">
          <CinematicHero onBook={() => openBooking()} onExplore={() => navigate("studio")} />

          <section id="services" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Featured services</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">The book, in pictures.</h2>
            </Reveal>
            <div className="mt-10 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-visible lg:grid-cols-5">
              {services.map((service, index) => (
                <ServiceVisualCard
                  key={service.id}
                  service={service}
                  onBook={() => openBooking(service.id)}
                  className={`min-w-[72vw] shrink-0 snap-center md:min-w-0 ${index >= 3 ? "lg:col-span-1" : ""}`}
                />
              ))}
            </div>
          </section>

          <StudioEditorialSection />
          <ProfessionalsSection onBook={(id) => openBooking(undefined, id)} />
          <HowItWorksSection onBook={() => openBooking()} />

          <section id="contact" className="scroll-mt-24 relative overflow-hidden border-t border-line">
            <div className="absolute inset-0 bg-gradient-to-br from-sand/50 via-ivory to-paper" />
            <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-3 md:px-8 md:py-28">
              <Reveal>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Reserve</p>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl">Your hour is waiting.</h2>
                <Button className="mt-8" onClick={() => openBooking()}>
                  Book an appointment
                </Button>
              </Reveal>
              <Reveal delay={0.08} className="glass-panel rounded-3xl p-6 not-italic">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Studio</p>
                <address className="mt-3 text-sm leading-7 not-italic">
                  {studio.address[0]}
                  <br />
                  {studio.address[1]}
                </address>
                <p className="mt-4 text-sm">{studio.phone}</p>
              </Reveal>
              <Reveal delay={0.12} className="glass-panel rounded-3xl p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Hours</p>
                <dl className="mt-3 space-y-3">
                  {studio.hours.map((row) => (
                    <div key={row.label} className="flex justify-between gap-4 text-sm">
                      <dt className="text-ink-soft">{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </section>
          <Footer />
        </main>
      )}
    </>
  );
}
