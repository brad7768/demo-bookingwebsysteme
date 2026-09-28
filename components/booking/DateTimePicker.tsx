"use client";

import { useMemo, useState } from "react";
import { slotsFor } from "@/lib/schedule";
import { addMonths, cn, formatMonthYear, parseISODate, sameDay, startOfDay, toISODate } from "@/lib/utils";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function DateTimePicker({
  professionalId,
  duration,
  date,
  time,
  onDate,
  onTime,
}: {
  professionalId: string;
  duration: number;
  date: string | null;
  time: string | null;
  onDate: (iso: string) => void;
  onTime: (slot: string) => void;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const initial = date ? parseISODate(date) : today;
  const [visible, setVisible] = useState(() => new Date(initial.getFullYear(), initial.getMonth(), 1));
  const maxMonth = useMemo(() => {
    const next = addMonths(today, 3);
    return new Date(next.getFullYear(), next.getMonth(), 1);
  }, [today]);

  const cells = useMemo(() => {
    const first = new Date(visible.getFullYear(), visible.getMonth(), 1);
    const pad = (first.getDay() + 6) % 7;
    const count = new Date(visible.getFullYear(), visible.getMonth() + 1, 0).getDate();
    const days: Array<Date | null> = Array.from({ length: pad }, () => null);
    for (let day = 1; day <= count; day += 1) {
      days.push(new Date(visible.getFullYear(), visible.getMonth(), day));
    }
    return days;
  }, [visible]);

  const slots = date && professionalId ? slotsFor(professionalId, date, duration) : [];
  const canPrev = visible > new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-2xl">{formatMonthYear(visible)}</h3>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous month"
              disabled={!canPrev}
              onClick={() => setVisible((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line disabled:opacity-30"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next month"
              disabled={visible >= maxMonth}
              onClick={() => setVisible((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line disabled:opacity-30"
            >
              <Chevron direction="right" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-[0.14em] text-muted">
          {weekdays.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, index) => {
            if (!day) return <div key={`empty-${index}`} />;
            const iso = toISODate(day);
            const closed = day.getDay() === 0;
            const past = day < today;
            const selected = date === iso;
            const isToday = sameDay(day, today);
            const disabled = closed || past;
            return (
              <button
                key={iso}
                type="button"
                disabled={disabled}
                onClick={() => onDate(iso)}
                className={cn(
                  "mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm transition",
                  selected && "bg-ink text-paper",
                  !selected && !disabled && "hover:bg-sand",
                  !selected && isToday && "ring-1 ring-inset ring-taupe",
                  disabled && "cursor-not-allowed text-muted/50",
                )}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-muted">Sunday is closed. Saturday appointments end at 17:00.</p>
      </div>

      <div>
        <h3 className="font-serif text-2xl">Openings</h3>
        {date ? (
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
            {slots.map((slot) => {
              const selected = time === slot.time && slot.state === "open";
              const disabled = slot.state !== "open";
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={disabled}
                  onClick={() => onTime(slot.time)}
                  className={cn(
                    "rounded-2xl border px-3 py-3 text-sm transition",
                    selected && "border-ink bg-ink text-paper",
                    !selected && slot.state === "open" && "border-line bg-paper hover:border-taupe",
                    disabled && "cursor-not-allowed border-line/70 bg-ivory text-muted",
                  )}
                >
                  <span className={cn(disabled && "line-through")}>{slot.time}</span>
                  {slot.state === "booked" ? <span className="mt-0.5 block text-[10px] uppercase tracking-[0.14em] no-underline">Booked</span> : null}
                  {slot.state === "short" ? <span className="mt-0.5 block text-[10px] uppercase tracking-[0.14em] no-underline">Too short</span> : null}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 text-sm text-ink-soft">Select a date to see openings.</p>
        )}
      </div>
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
      <path
        d={direction === "left" ? "M10 3.5 5.5 8 10 12.5" : "M6 3.5 10.5 8 6 12.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
