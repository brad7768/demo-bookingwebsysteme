"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { useStudio } from "@/lib/use-studio";
import { customerName, formatLongDate } from "@/lib/utils";

export function CustomersView() {
  const studio = useStudio();
  const [query, setQuery] = useState("");
  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return studio.customers
      .filter((customer) => {
        const text = `${customerName(customer.firstName, customer.lastName)} ${customer.email} ${customer.phone}`.toLowerCase();
        return !needle || text.includes(needle);
      })
      .sort((a, b) => (b.lastVisit ?? "").localeCompare(a.lastVisit ?? ""));
  }, [query, studio.customers]);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Customers" title="The guest book" description="Fictional clients used to show how a studio keeps names, visits, and status in one place." />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by name, email, or phone"
        className="h-11 w-full max-w-md rounded-full border border-line bg-paper px-4 text-sm outline-none focus:border-ink/40"
      />
      <section className="overflow-hidden rounded-3xl border border-line bg-paper shadow-soft">
        {rows.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-[11px] uppercase tracking-[0.14em] text-muted">
                <tr className="border-b border-line">
                  {["Name", "Email", "Phone", "Last appointment", "Total appointments", "Status"].map((heading) => (
                    <th key={heading} className="px-6 py-3 font-medium">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((customer) => (
                  <tr key={customer.id} className="border-b border-line/80 last:border-0 hover:bg-ivory/80">
                    <td className="px-6 py-4">{customerName(customer.firstName, customer.lastName)}</td>
                    <td className="px-6 py-4 text-ink-soft">{customer.email}</td>
                    <td className="px-6 py-4 tabular-nums">{customer.phone}</td>
                    <td className="px-6 py-4">{customer.lastVisit ? formatLongDate(customer.lastVisit) : "—"}</td>
                    <td className="px-6 py-4 tabular-nums">{customer.totalAppointments}</td>
                    <td className="px-6 py-4">
                      <StatusPill status={customer.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-10 text-sm text-ink-soft">No guests match that search.</p>
        )}
      </section>
    </div>
  );
}
