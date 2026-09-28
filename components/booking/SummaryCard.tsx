import { professionalById, serviceById } from "@/lib/data";
import type { BookingDraft, Service } from "@/lib/types";
import { formatDuration, formatLongDate, formatPrice } from "@/lib/utils";

export function SummaryCard({ draft, catalog }: { draft: BookingDraft; catalog: Service[] }) {
  const service = serviceById(draft.serviceId, catalog);
  const professional = professionalById(draft.professionalId);

  const rows = [
    { label: "Service", value: service ? `${service.name}` : "—", detail: service ? formatDuration(service.duration) : undefined },
    { label: "Professional", value: professional?.name ?? "—", detail: professional?.role },
    { label: "Date", value: draft.date ? formatLongDate(draft.date) : "—" },
    { label: "Time", value: draft.time ?? "—" },
  ];

  return (
    <aside className="rounded-3xl border border-line bg-paper p-5 shadow-soft lg:sticky lg:top-24">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Your appointment</p>
      <dl className="mt-4 space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4">
            <dt className="text-xs text-muted">{row.label}</dt>
            <dd className="text-right">
              <p className="text-sm text-ink">{row.value}</p>
              {row.detail ? <p className="text-xs text-ink-soft">{row.detail}</p> : null}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 border-t border-line pt-4">
        <div className="flex items-end justify-between">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Price</p>
          <p className="font-serif text-3xl leading-none">{service ? formatPrice(service.price) : "—"}</p>
        </div>
      </div>
    </aside>
  );
}
