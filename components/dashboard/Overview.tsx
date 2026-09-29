"use client";

import Link from "next/link";
import { AppointmentsTable } from "@/components/dashboard/AppointmentsTable";
import { useStudio } from "@/lib/use-studio";
import { formatLongDate, formatMoney, greeting, toISODate } from "@/lib/utils";

export function Overview() {
  const studio = useStudio();
  const todayLabel = formatLongDate(toISODate(studio.now));
  const stats = [
    { label: "Today's appointments", value: String(studio.stats.today), caption: "On the book today" },
    { label: "This week", value: String(studio.stats.week), caption: "Across the studio" },
    { label: "New customers", value: String(studio.stats.newCustomers), caption: "First visit on file" },
    { label: "Estimated revenue", value: formatMoney(studio.stats.revenue), caption: "Services this week" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Overview</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">{greeting(studio.now)}.</h1>
        <p className="mt-2 text-sm text-ink-soft">
          {todayLabel} · {studio.stats.today} appointment{studio.stats.today === 1 ? "" : "s"} on the book
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-3xl border border-line bg-paper p-5 shadow-soft">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{stat.label}</p>
            <p className="mt-3 font-serif text-5xl tabular-nums tracking-tight">{stat.value}</p>
            <p className="mt-2 text-sm text-ink-soft">{stat.caption}</p>
          </article>
        ))}
      </div>

      <section className="overflow-hidden rounded-3xl border border-line bg-paper shadow-soft">
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <div>
            <h2 className="font-serif text-3xl">Upcoming appointments</h2>
            <p className="mt-1 text-sm text-ink-soft">Today at the studio</p>
          </div>
          <Link href="/dashboard/appointments" className="text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            View all
          </Link>
        </div>
        <AppointmentsTable rows={studio.todayAppointments} />
      </section>
    </div>
  );
}
