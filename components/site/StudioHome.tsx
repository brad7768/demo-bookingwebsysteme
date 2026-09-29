"use client";

import { useState } from "react";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { HeroVisual } from "@/components/site/HeroVisual";
import { Button, buttonClass } from "@/components/ui/Button";
import { services, studio } from "@/lib/data";
import { cn, formatDuration, formatPrice } from "@/lib/utils";

type Section = "services" | "about" | "contact";

export function StudioHome() {
  const [mode, setMode] = useState<"site" | "book">("site");
  const [launch, setLaunch] = useState<{ id: number; serviceId: string | null } | null>(null);

  function openBooking(serviceId?: string) {
    setLaunch({ id: Date.now(), serviceId: serviceId ?? null });
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
      <Header mode={mode} onNavigate={navigate} onBook={() => openBooking()} />
      {mode === "book" ? (
        <BookingFlow launch={launch} onExit={() => navigate()} />
      ) : (
        <main id="main">
          <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:py-28">
            <div className="animate-rise">
              <p className="text-[11px] uppercase tracking-[0.28em] text-taupe-deep">Hair & beauty · Private appointments</p>
              <h1 className="mt-5 font-serif text-[3.4rem] leading-[0.92] tracking-[-0.03em] text-ink sm:text-7xl lg:text-[5.4rem]">
                Your time.
                <br />
                Your beauty.
              </h1>
              <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-ink-soft">
                A private studio for cut, color, and care. Choose your service, your stylist, and the hour — then arrive to a room that is already yours.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button onClick={() => openBooking()}>Book an appointment</Button>
                <button type="button" onClick={() => navigate("services")} className={buttonClass("secondary")}>
                  View services
                </button>
              </div>
              <p className="mt-8 text-xs uppercase tracking-[0.18em] text-muted">By appointment · New York</p>
            </div>
            <div className="relative animate-rise lg:justify-self-end" style={{ animationDelay: "80ms" }}>
              <div className="absolute -inset-4 rounded-[2.4rem] bg-sand/60" />
              <HeroVisual />
            </div>
          </section>

          <section id="services" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
            <div className="max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Services</p>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl">The book, kept simple.</h2>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Five appointments. Clear timing. A price you can see before you reserve the hour.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              {services.map((service, index) => (
                <article
                  key={service.id}
                  className={cn(
                    "flex flex-col rounded-3xl border border-line bg-paper p-6 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-taupe",
                    index < 3 ? "xl:col-span-2" : "xl:col-span-3",
                    index === 4 && "md:col-span-2",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-3xl">{service.name}</h3>
                    <p className="text-sm">{formatPrice(service.price)}</p>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-6 text-ink-soft">{service.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted">{formatDuration(service.duration)}</p>
                    <Button size="sm" variant="secondary" onClick={() => openBooking(service.id)}>
                      Select
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="about" className="scroll-mt-24 mx-auto grid max-w-6xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">About</p>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl">A short book, on purpose.</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-ink-soft">
                <p>
                  Lumière Studio keeps fewer guests on the day so the appointment can move at the pace of the work — the consultation, the cut or color, and a finish you can leave in.
                </p>
                <p>There is no walk-in queue. You reserve the time, and we hold it.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Reserved hours", "One guest at a time with each stylist."],
                ["A real consultation", "Color and cuts begin with a conversation."],
                ["Time to finish", "The style is part of the appointment, not an extra."],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-3xl border border-line bg-paper/80 p-5">
                  <h3 className="font-serif text-2xl">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="scroll-mt-24 border-t border-line">
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Contact</p>
                <h2 className="mt-2 font-serif text-4xl">Visit the studio.</h2>
                <p className="mt-3 text-sm leading-6 text-ink-soft">New guests are welcome by appointment.</p>
                <Button className="mt-6" onClick={() => openBooking()}>
                  Book an appointment
                </Button>
              </div>
              <address className="rounded-3xl border border-line bg-paper p-6 not-italic">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Studio</p>
                <p className="mt-3 text-sm leading-7">
                  {studio.address[0]}
                  <br />
                  {studio.address[1]}
                </p>
                <p className="mt-4 text-sm">{studio.phone}</p>
                <p className="text-sm">{studio.email}</p>
              </address>
              <div className="rounded-3xl border border-line bg-paper p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Hours</p>
                <dl className="mt-3 space-y-3">
                  {studio.hours.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4 text-sm">
                      <dt className="text-ink-soft">{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      )}
    </>
  );
}
