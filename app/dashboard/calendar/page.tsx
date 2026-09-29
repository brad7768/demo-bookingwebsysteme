"use client";

import { WeekCalendar } from "@/components/dashboard/WeekCalendar";
import { PageHeader } from "@/components/ui/PageHeader";
import { useStudio } from "@/lib/use-studio";

export default function CalendarPage() {
  const studio = useStudio();
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Calendar"
        title="The week at a glance"
        description="A single view of the book — staff, time, and status — so the day can be managed from one place."
      />
      <WeekCalendar now={studio.now} appointments={studio.appointments} />
    </div>
  );
}
