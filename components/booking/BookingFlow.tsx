"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, TextArea } from "@/components/ui/Field";
import { Portrait } from "@/components/ui/Portrait";
import { DateTimePicker } from "@/components/booking/DateTimePicker";
import { Progress } from "@/components/booking/Progress";
import { SummaryCard } from "@/components/booking/SummaryCard";
import { serviceImage, studioImages } from "@/lib/studio-images";
import { professionalById, professionals, serviceById } from "@/lib/data";
import { saveGuestBooking } from "@/lib/guest-bookings";
import { downloadAppointmentIcs } from "@/lib/ics";
import { useServiceCatalog } from "@/lib/stored";
import type { BookingDraft } from "@/lib/types";
import { cn, formatDuration, formatLongDate, formatPrice, nextOpenDate, toISODate } from "@/lib/utils";

const emptyDraft: BookingDraft = {
  serviceId: null,
  professionalId: null,
  date: null,
  time: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  note: "",
};

type Launch = { id: number; serviceId: string | null; professionalId: string | null };

export function BookingFlow({ launch, onExit }: { launch: Launch | null; onExit: () => void }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);
  const catalog = useServiceCatalog();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");

  useEffect(() => {
    if (!launch) return;
    const next: BookingDraft = {
      ...emptyDraft,
      serviceId: launch.serviceId,
      professionalId: launch.professionalId,
    };
    setDraft(next);
    if (launch.serviceId && launch.professionalId) setStep(3);
    else if (launch.serviceId) setStep(2);
    else if (launch.professionalId) setStep(2);
    else setStep(1);
  }, [launch?.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const bookable = catalog.filter((service) => service.active);
  const service = serviceById(draft.serviceId, catalog);
  const professional = professionalById(draft.professionalId);

  function canJump(target: number) {
    if (target === step) return true;
    if (target < step) return target < 5 || step === 5;
    if (target === 5) return false;
    if (target >= 2 && !draft.serviceId) return false;
    if (target >= 3 && !draft.professionalId) return false;
    if (target >= 4 && (!draft.date || !draft.time)) return false;
    return true;
  }

  function goTo(target: number) {
    if (!canJump(target) || target === step) return;
    setStep(target);
  }

  function continueFrom(current: number) {
    if (current === 1 && draft.serviceId) setStep(2);
    if (current === 2 && draft.professionalId) {
      setDraft((value) => (value.date ? value : { ...value, date: toISODate(nextOpenDate(new Date())) }));
      setStep(3);
    }
    if (current === 3 && draft.date && draft.time) setStep(4);
  }

  async function confirm() {
    const nextErrors = validateDetails(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || !service || !professional || !draft.date || !draft.time) return;
    setSubmitting(true);
    await wait(480);
    const id = `LM-${Date.now().toString().slice(-6)}`;
    setReference(id);
    saveGuestBooking({
      id,
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      duration: service.duration,
      professionalId: professional.id,
      professionalName: professional.name,
      date: draft.date,
      time: draft.time,
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      note: draft.note.trim(),
      createdAt: new Date().toISOString(),
    });
    setSubmitting(false);
    setStep(5);
  }

  function bookAnother() {
    setDraft(emptyDraft);
    setErrors({});
    setReference("");
    setStep(1);
  }

  function addToCalendar() {
    if (!service || !professional || !draft.date || !draft.time) return;
    downloadAppointmentIcs({
      id: reference || `booking-${draft.date}-${draft.time}`,
      title: `${service.name} at Lumière Studio`,
      description: `${service.name} with ${professional.name}. Confirmation ${reference}.`,
      date: draft.date,
      time: draft.time,
      duration: service.duration,
    });
  }

  return (
    <div className="relative mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-sand/40 to-transparent" />
      <button type="button" onClick={onExit} className="relative text-sm text-ink-soft transition hover:text-ink">
        ← Back to studio
      </button>
      <div className="relative mt-6">
        <Progress step={step} canJump={canJump} onJump={goTo} />
      </div>

      <div className="relative mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className={cn(step === 4 ? "order-2 lg:order-1" : "order-1")}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {step === 1 ? (
              <section>
                <StepHeading eyebrow="Step 1" title="Select a service" text="Each card shows timing and price before you commit." />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {bookable.map((item) => {
                    const selected = draft.serviceId === item.id;
                    return (
                      <article
                        key={item.id}
                        className={cn(
                          "group relative overflow-hidden rounded-3xl border bg-ink shadow-elevated transition duration-300",
                          selected ? "border-paper ring-2 ring-paper/80" : "border-line hover:-translate-y-0.5",
                        )}
                      >
                        <div className="relative h-44">
                          <Image src={serviceImage(item.id)} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-5">
                            <h3 className="font-serif text-3xl text-paper">{item.name}</h3>
                            <p className="mt-1 text-sm text-paper/75">{formatPrice(item.price)} · {formatDuration(item.duration)}</p>
                          </div>
                        </div>
                        <div className="p-5">
                          <p className="text-sm leading-6 text-paper/80">{item.description}</p>
                          <Button
                            className="mt-4"
                            variant={selected ? "primary" : "secondary"}
                            size="sm"
                            onClick={() => setDraft((value) => ({ ...value, serviceId: item.id, time: null }))}
                          >
                            {selected ? "Selected" : "Select"}
                          </Button>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <StepNav onNext={() => continueFrom(1)} nextDisabled={!draft.serviceId} hint={draft.serviceId ? undefined : "Select a service to continue."} />
              </section>
            ) : null}

            {step === 2 ? (
              <section>
                <StepHeading eyebrow="Step 2" title="Select a professional" text="Portraits and specialties — choose who you would like to see." />
                <div className="mt-6 grid gap-4">
                  {professionals.map((person) => {
                    const selected = draft.professionalId === person.id;
                    return (
                      <article
                        key={person.id}
                        className={cn(
                          "overflow-hidden rounded-3xl border bg-paper shadow-soft transition duration-300",
                          selected ? "border-ink ring-1 ring-ink" : "border-line hover:-translate-y-0.5 hover:shadow-elevated",
                        )}
                      >
                        <div className="grid sm:grid-cols-[200px_1fr_auto] sm:items-center">
                          <Portrait id={person.id} name={person.name} initials={person.initials} size="xl" />
                          <div className="p-5 sm:py-6">
                            <h3 className="font-serif text-3xl">{person.name}</h3>
                            <p className="mt-1 text-sm text-taupe-deep">{person.role}</p>
                            <p className="mt-2 text-sm leading-6 text-ink-soft">{person.bio}</p>
                          </div>
                          <div className="p-5 sm:pr-6">
                            <Button variant={selected ? "primary" : "secondary"} size="sm" onClick={() => setDraft((value) => ({ ...value, professionalId: person.id }))}>
                              {selected ? "Selected" : "Select"}
                            </Button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <StepNav onBack={() => setStep(1)} onNext={() => continueFrom(2)} nextDisabled={!draft.professionalId} hint={draft.professionalId ? undefined : "Select a professional to continue."} />
              </section>
            ) : null}

            {step === 3 && service ? (
              <section>
                <StepHeading eyebrow="Step 3" title="Select a date and time" text="Openings respect the length of your service." />
                <div className="mt-6 rounded-3xl border border-line/80 bg-paper/80 p-4 shadow-soft backdrop-blur md:p-6">
                  <DateTimePicker
                    professionalId={draft.professionalId ?? ""}
                    duration={service.duration}
                    date={draft.date}
                    time={draft.time}
                    onDate={(iso) => setDraft((value) => ({ ...value, date: iso, time: null }))}
                    onTime={(slot) => setDraft((value) => ({ ...value, time: slot }))}
                  />
                </div>
                <StepNav onBack={() => setStep(2)} onNext={() => continueFrom(3)} nextDisabled={!draft.date || !draft.time} hint={draft.date && draft.time ? undefined : "Choose a date and an open time."} />
              </section>
            ) : null}

            {step === 4 ? (
              <section>
                <StepHeading eyebrow="Step 4" title="Your details" text="We’ll hold this appointment under your name." />
                <form
                  className="mt-6 space-y-4 rounded-3xl border border-line/80 bg-paper/90 p-5 shadow-soft md:p-6"
                  noValidate
                  onSubmit={(event) => {
                    event.preventDefault();
                    void confirm();
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="First name" name="firstName" autoComplete="given-name" value={draft.firstName} error={errors.firstName} onChange={(event) => setDraft((value) => ({ ...value, firstName: event.target.value }))} />
                    <Field label="Last name" name="lastName" autoComplete="family-name" value={draft.lastName} error={errors.lastName} onChange={(event) => setDraft((value) => ({ ...value, lastName: event.target.value }))} />
                  </div>
                  <Field label="Email" name="email" type="email" autoComplete="email" value={draft.email} error={errors.email} onChange={(event) => setDraft((value) => ({ ...value, email: event.target.value }))} />
                  <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="(212) 555-0100" value={draft.phone} error={errors.phone} onChange={(event) => setDraft((value) => ({ ...value, phone: event.target.value }))} />
                  <TextArea label="Optional note" name="note" value={draft.note} placeholder="Anything your stylist should know" onChange={(event) => setDraft((value) => ({ ...value, note: event.target.value }))} />
                  <StepNav onBack={() => setStep(3)} submitLabel={submitting ? "Confirming…" : "Confirm appointment"} nextDisabled={submitting} />
                </form>
              </section>
            ) : null}

            {step === 5 && service && professional && draft.date && draft.time ? (
              <section className="relative mx-auto max-w-lg min-h-[32rem] overflow-hidden rounded-[2rem] text-center" aria-live="polite">
                <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
                  <div className="relative h-full min-h-[32rem]">
                    <Image src={studioImages.details.texture} alt="" fill className="object-cover" />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(185,165,140,0.35),transparent_55%)]" />
                <div className="relative px-4 py-10">
                <motion.div
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ink text-paper shadow-float ring-4 ring-champagne/40"
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden>
                    <path d="M5 12.5 9.2 17 19 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                <motion.p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-taupe-deep" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  Appointment confirmed
                </motion.p>
                <motion.h2 className="mt-3 font-serif text-5xl md:text-6xl" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
                  You&apos;re booked.
                </motion.h2>
                <motion.div
                  className="mt-8 overflow-hidden rounded-3xl border border-line bg-paper text-left shadow-elevated"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.55 }}
                >
                  <div className="bg-ink px-6 py-5 text-paper">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-paper/60">Digital appointment card</p>
                    <p className="mt-2 font-serif text-3xl">{service.name}</p>
                  </div>
                  <dl className="space-y-3 p-6">
                    <Row label="Professional" value={professional.name} />
                    <Row label="Date" value={formatLongDate(draft.date)} />
                    <Row label="Time" value={draft.time} />
                    <Row label="Reference" value={reference} />
                  </dl>
                </motion.div>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button onClick={addToCalendar} className="btn-editorial">Add to calendar</Button>
                  <Button variant="secondary" onClick={bookAnother} className="btn-editorial">Book another appointment</Button>
                </div>
                </div>
              </section>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {step < 5 ? (
          <div className={cn(step === 4 ? "order-1 lg:order-2" : "order-2", step < 4 && "hidden lg:block")}>
            <SummaryCard draft={draft} catalog={catalog} />
          </div>
        ) : null}
      </div>
      <p className="mt-10 text-center text-xs text-muted">Demo booking · no payment is taken and no email is sent.</p>
    </div>
  );
}

function StepHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">{title}</h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">{text}</p>
    </div>
  );
}

function StepNav({
  onBack,
  onNext,
  nextDisabled,
  hint,
  submitLabel,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  hint?: string;
  submitLabel?: string;
}) {
  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
      {onBack ? <Button variant="ghost" onClick={onBack}>Back</Button> : <span />}
      <div className="flex flex-col items-stretch gap-3 sm:items-end">
        {hint ? <p className="text-sm text-muted">{hint}</p> : null}
        {submitLabel ? (
          <Button type="submit" disabled={nextDisabled}>{submitLabel}</Button>
        ) : (
          <Button onClick={onNext} disabled={nextDisabled}>Continue</Button>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  );
}

function validateDetails(draft: BookingDraft) {
  const next: Record<string, string> = {};
  if (!draft.firstName.trim()) next.firstName = "Enter a first name.";
  if (!draft.lastName.trim()) next.lastName = "Enter a last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) next.email = "Enter a valid email.";
  if (draft.phone.replace(/\D/g, "").length < 7) next.phone = "Enter a phone number.";
  return next;
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
