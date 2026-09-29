"use client";

import Link from "next/link";
import { AppointmentsTable } from "@/components/dashboard/AppointmentsTable";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Reveal } from "@/components/motion/Reveal";
import { useStudio } from "@/lib/use-studio";
import { formatLongDate, formatMoney, greeting, toISODate } from "@/lib/utils";

export function Overview() {
  const studio = useStudio();
  const todayLabel = formatLongDate(toISODate(studio.now));
  const stats = [
    { label: "Today's appointments", value: String(studio.stats.today), caption: "On the book today", trend: "+2 vs avg", spark: [3, 5, 6, 8, 7, 9, studio.stats.today] },
    { label: "This week's bookings", value: String(studio.stats.week), caption: "Across the studio", trend: "+12%", spark: [20, 22, 24, 26, 28, 30, studio.stats.week] },
    { label: "New clients", value: String(studio.stats.newCustomers), caption: "First visit on file", trend: "steady", spark: [2, 3, 2, 4, 3, 5, studio.stats.newCustomers] },
    { label: "Revenue", value: formatMoney(studio.stats.revenue), caption: "Services this week", trend: "+8%", spark: [40, 42, 45, 48, 50, 52, 55] },
  ];

  return (
    <div className="space-y-8 texture-grain">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Dashboard</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-6xl">{greeting(studio.now)}.</h1>
        <p className="mt-3 text-sm text-ink-soft">
          {todayLabel} · {studio.stats.today} appointment{studio.stats.today === 1 ? "" : "s"} on the book
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <KpiCard key={stat.label} {...stat} />
        ))}
      </div>

      <Reveal>
        <section className="overflow-hidden rounded-3xl border border-line/80 bg-paper/90 shadow-soft backdrop-blur">
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
      </Reveal>
    </div>
  );
}
