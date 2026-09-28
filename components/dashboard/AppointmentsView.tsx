"use client";

import { useMemo, useState } from "react";
import { AppointmentsTable } from "@/components/dashboard/AppointmentsTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { useStudio } from "@/lib/use-studio";
import { cn } from "@/lib/utils";

const filters = ["All", "Confirmed", "Pending", "Completed"] as const;

export function AppointmentsView() {
  const studio = useStudio();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return studio.appointments.filter((appointment) => {
      const statusOk = filter === "All" || appointment.status === filter.toLowerCase();
      const text = `${appointment.customerName} ${appointment.serviceName} ${appointment.professionalName}`.toLowerCase();
      return statusOk && (!needle || text.includes(needle));
    });
  }, [filter, query, studio.appointments]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Appointments"
        title="The full book"
        description="Every fictional appointment on this week’s calendar, plus any reservation made in the demo."
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition",
                filter === item ? "bg-ink text-paper" : "border border-line bg-paper text-ink-soft hover:border-taupe",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search guest or service"
          className="h-11 w-full rounded-full border border-line bg-paper px-4 text-sm outline-none focus:border-ink/40 sm:max-w-xs"
        />
      </div>
      <section className="overflow-hidden rounded-3xl border border-line bg-paper shadow-soft">
        <AppointmentsTable rows={rows} showDate />
      </section>
    </div>
  );
}
