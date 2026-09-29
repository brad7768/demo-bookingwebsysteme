import { StatusPill } from "@/components/ui/StatusPill";
import type { EnrichedAppointment } from "@/lib/types";
import { formatLongDate } from "@/lib/utils";

export function AppointmentsTable({
  rows,
  showDate = false,
}: {
  rows: EnrichedAppointment[];
  showDate?: boolean;
}) {
  if (!rows.length) {
    return <p className="px-6 py-10 text-sm text-ink-soft">Nothing on the book for this view.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="text-[11px] uppercase tracking-[0.14em] text-muted">
          <tr className="border-b border-line">
            {showDate ? <th className="px-6 py-3 font-medium">Date</th> : null}
            <th className="px-6 py-3 font-medium">Time</th>
            <th className="px-6 py-3 font-medium">Professional</th>
            <th className="px-6 py-3 font-medium">Service</th>
            <th className="px-6 py-3 font-medium">Customer</th>
            <th className="px-6 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line/80 last:border-0 transition hover:bg-ivory/80">
              {showDate ? <td className="px-6 py-4 text-ink-soft">{formatLongDate(row.date)}</td> : null}
              <td className="px-6 py-4 tabular-nums">{row.time}</td>
              <td className="px-6 py-4">{row.professionalName}</td>
              <td className="px-6 py-4">{row.serviceName}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-champagne text-[11px] font-medium text-brown">
                    {row.customerName
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>
                    {row.customerName}
                    {row.source === "demo" ? <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-muted">Demo</span> : null}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusPill status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
