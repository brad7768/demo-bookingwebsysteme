"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { layoutDay } from "@/lib/schedule";
import type { EnrichedAppointment } from "@/lib/types";
import { addDays, cn, formatMonthDay, formatWeekdayShort, sameDay, startOfWeek, toISODate, toMinutes } from "@/lib/utils";

const ROW = 46;
const START = 9 * 60;
const END = 19 * 60;
const HEIGHT = ((END - START) / 30) * ROW;

const tones: Record<string, string> = {
  emma: "bg-[#2c2824] text-[#f6f1ea]",
  sofia: "bg-[#8d7d6b] text-white",
  mia: "bg-[#e7dccf] text-[#2c2824]",
};

export function WeekCalendar({
  now,
  appointments,
}: {
  now: Date;
  appointments: EnrichedAppointment[];
}) {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const weekStart = addDays(startOfWeek(now), offset * 7);
  const days = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const weekKeys = new Set(days.map((day) => toISODate(day)));
  const visible = appointments.filter((appointment) => weekKeys.has(appointment.date));
  const selected = visible.find((appointment) => appointment.id === selectedId) ?? null;
  const hours = Array.from({ length: 11 }, (_, index) => 9 + index);
  const showNow = offset === 0 && now.getHours() * 60 + now.getMinutes() >= START && now.getHours() * 60 + now.getMinutes() <= END;

  const byDay = new Map<string, ReturnType<typeof layoutDay<EnrichedAppointment>>>();
  days.forEach((day) => {
    const iso = toISODate(day);
    byDay.set(iso, layoutDay(visible.filter((appointment) => appointment.date === iso)));
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-serif text-3xl">
            {formatMonthDay(days[0] ?? weekStart)} – {formatMonthDay(days[6] ?? weekStart)}
          </p>
          <p className="mt-1 text-sm text-ink-soft">Monday through Sunday · all three stylists</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setOffset(0)} className="rounded-full border border-line bg-paper px-3 py-2 text-sm hover:border-taupe">
            This week
          </button>
          <button type="button" aria-label="Previous week" onClick={() => setOffset((value) => value - 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper">
            ‹
          </button>
          <button type="button" aria-label="Next week" onClick={() => setOffset((value) => value + 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper">
            ›
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-ink-soft">
        {[
          ["emma", "Emma Laurent"],
          ["sofia", "Sofia Martin"],
          ["mia", "Mia Chen"],
        ].map(([id, label]) => (
          <span key={id} className="inline-flex items-center gap-2">
            <span className={cn("h-2.5 w-2.5 rounded-full", tones[id])} />
            {label}
          </span>
        ))}
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border border-dashed border-taupe-deep" />
          Pending
        </span>
      </div>

      <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-soft">
        <div className="overflow-x-auto">
          <div className="min-w-[920px]">
            <div className="grid grid-cols-[68px_repeat(7,minmax(0,1fr))] border-b border-line">
              <div />
              {days.map((day) => {
                const today = sameDay(day, now);
                const closed = day.getDay() === 0;
                return (
                  <div key={toISODate(day)} className={cn("px-2 py-3 text-center", today && "bg-sand/40")}>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{formatWeekdayShort(day)}</p>
                    <p className={cn("mt-1 font-serif text-2xl", closed && "text-muted")}>{day.getDate()}</p>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-[68px_repeat(7,minmax(0,1fr))]">
              <div className="relative" style={{ height: HEIGHT }}>
                {hours.map((hour) => (
                  <div key={hour} className="absolute right-2 -translate-y-2 text-[11px] tabular-nums text-muted" style={{ top: ((hour * 60 - START) / 30) * ROW }}>
                    {String(hour).padStart(2, "0")}:00
                  </div>
                ))}
              </div>
              {days.map((day) => {
                const iso = toISODate(day);
                const today = sameDay(day, now);
                const blocks = byDay.get(iso) ?? [];
                return (
                  <div key={iso} className={cn("relative border-l border-line", today && "bg-sand/25", day.getDay() === 0 && "bg-ivory/80")} style={{ height: HEIGHT }}>
                    {hours.map((hour) => (
                      <div key={hour} className="absolute inset-x-0 border-t border-line/80" style={{ top: ((hour * 60 - START) / 30) * ROW }} />
                    ))}
                    {showNow && today ? (
                      <div className="absolute inset-x-0 z-10 h-px bg-taupe-deep" style={{ top: ((now.getHours() * 60 + now.getMinutes() - START) / 30) * ROW }} />
                    ) : null}
                    {blocks.map((block) => {
                      const top = ((toMinutes(block.time) - START) / 30) * ROW;
                      const height = Math.max((block.duration / 30) * ROW - 4, 28);
                      const active = selectedId === block.id;
                      return (
                        <button
                          key={block.id}
                          type="button"
                          onClick={() => setSelectedId(block.id)}
                          className={cn(
                            "absolute overflow-hidden rounded-2xl px-2.5 py-2 text-left shadow-soft transition duration-300 hover:scale-[1.02] hover:shadow-elevated",
                            tones[block.professionalId] ?? tones.emma,
                            block.status === "pending" && "ring-1 ring-dashed ring-ink/40",
                            block.status === "completed" && "opacity-60",
                            active && "ring-2 ring-ink scale-[1.02]",
                          )}
                          style={{
                            top: top + 2,
                            height,
                            left: `calc(${(block.col / block.cols) * 100}% + 3px)`,
                            width: `calc(${100 / block.cols}% - 6px)`,
                          }}
                        >
                          <p className="text-[10px] tabular-nums opacity-80">{block.time}</p>
                          <p className="truncate text-xs font-medium">{block.customerName}</p>
                          {height > 58 ? <p className="truncate text-[10px] opacity-80">{block.serviceName}</p> : null}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <>
            <motion.button
              type="button"
              aria-label="Close appointment details"
              className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-sm"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-paper/95 p-6 shadow-elevated backdrop-blur-xl"
              initial={reduce ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Appointment</p>
                  <h3 className="mt-2 font-serif text-4xl">{selected.customerName}</h3>
                </div>
                <button type="button" onClick={() => setSelectedId(null)} className="text-sm text-muted hover:text-ink">
                  Close
                </button>
              </div>
              <dl className="mt-8 space-y-4 text-sm">
                <DrawerRow label="Customer" value={selected.customerName} />
                <DrawerRow label="Service" value={selected.serviceName} />
                <DrawerRow label="Professional" value={selected.professionalName} />
                <DrawerRow label="Date" value={selected.date} />
                <DrawerRow label="Time" value={selected.time} />
                <DrawerRow label="Status" value={selected.status} />
                <DrawerRow label="Duration" value={`${selected.duration} min`} />
              </dl>
              <div className="mt-auto flex flex-col gap-2 pt-8">
                <Button size="sm">Confirm</Button>
                <Button size="sm" variant="secondary">Reschedule</Button>
                <Button size="sm" variant="ghost">Cancel</Button>
              </div>
            </motion.aside>
          </>
        ) : (
          <p className="text-sm text-ink-soft">Select an appointment to open details. Scroll sideways on a small screen.</p>
        )}
      </AnimatePresence>
    </div>
  );
}

function DrawerRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line/70 pb-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right capitalize text-ink">{value}</dd>
    </div>
  );
}
