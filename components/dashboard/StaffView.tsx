"use client";

import { Portrait } from "@/components/ui/Portrait";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { professionals } from "@/lib/data";
import { useStudio } from "@/lib/use-studio";
import { toISODate } from "@/lib/utils";

export function StaffView() {
  const studio = useStudio();
  const today = toISODate(studio.now);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Staff" title="The atelier" description="Three fictional professionals. Their color on the calendar matches the swatch beside their name." />
      <div className="grid gap-4 lg:grid-cols-3">
        {professionals.map((person) => {
          const todayBook = studio.appointments.filter((appointment) => appointment.professionalId === person.id && appointment.date === today);
          const weekCount = studio.weekAppointments.filter((appointment) => appointment.professionalId === person.id).length;
          return (
            <article key={person.id} className="rounded-3xl border border-line bg-paper p-6 shadow-soft">
              <Portrait id={person.id} name={person.name} initials={person.initials} />
              <h2 className="mt-5 font-serif text-3xl">{person.name}</h2>
              <p className="mt-1 text-sm text-taupe-deep">{person.role}</p>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{person.bio}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted">{weekCount} this week</p>
              <div className="mt-5 space-y-3 border-t border-line pt-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Today</p>
                {todayBook.length ? (
                  todayBook.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between gap-3 text-sm">
                      <div>
                        <p className="tabular-nums">{appointment.time}</p>
                        <p className="text-ink-soft">{appointment.serviceName}</p>
                      </div>
                      <StatusPill status={appointment.status} />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-ink-soft">No appointments today.</p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
