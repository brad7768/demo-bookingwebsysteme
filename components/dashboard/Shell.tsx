"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: "grid" },
  { href: "/dashboard/appointments", label: "Appointments", icon: "list" },
  { href: "/dashboard/calendar", label: "Calendar", icon: "cal" },
  { href: "/dashboard/services", label: "Services", icon: "spark" },
  { href: "/dashboard/staff", label: "Staff", icon: "people" },
  { href: "/dashboard/customers", label: "Customers", icon: "user" },
  { href: "/dashboard/settings", label: "Settings", icon: "gear" },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;

  return (
    <div className="min-h-screen bg-[#f3efe9]">
      {open ? (
        <button type="button" className="fixed inset-0 z-40 bg-ink/30 md:hidden" aria-label="Close menu" onClick={() => setMenuPath(null)} />
      ) : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-paper transition-transform md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="px-6 pb-4 pt-6">
          <Link href="/dashboard" className="block">
            <p className="font-serif text-xl tracking-[0.16em]">LUMIÈRE</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted">Admin dashboard</p>
          </Link>
          <span className="mt-3 inline-flex rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted">
            Demo
          </span>
        </div>
        <nav className="flex-1 space-y-1 px-3" aria-label="Dashboard">
          {items.map((item) => {
            const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition",
                  active ? "bg-ink text-paper" : "text-ink-soft hover:bg-sand/70 hover:text-ink",
                )}
              >
                <Icon name={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-4">
          <Link href="/" className="block rounded-2xl px-3 py-2 text-sm text-ink-soft transition hover:bg-sand/70 hover:text-ink">
            View booking page
          </Link>
        </div>
      </aside>

      <div className="md:pl-64">
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-[#f3efe9]/90 px-4 py-3 backdrop-blur md:hidden">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper"
            aria-label="Open menu"
            onClick={() => setMenuPath(pathname)}
          >
            <Icon name="menu" />
          </button>
          <p className="font-serif tracking-[0.14em]">LUMIÈRE</p>
          <span className="rounded-full border border-line bg-paper px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted">Demo</span>
        </div>
        <div className="px-4 py-6 md:px-8 md:py-8">{children}</div>
      </div>
    </div>
  );
}

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    grid: "M3.5 3.5h4v4h-4zm5.5 0h4v4H9zm5.5 0h4v4h-4zM3.5 9h4v4h-4zM9 9h4v4H9zm5.5 0h4v4h-4zM3.5 14.5h4v4h-4zM9 14.5h4v4H9zm5.5 0h4v4h-4z",
    list: "M4 5.5h12M4 10h12M4 14.5h8",
    cal: "M4 5.5h12v10H4zM4 8.5h12M7.5 3.5v3M12.5 3.5v3",
    spark: "M10 3.5 11.2 8 15.5 9.2 11.2 10.4 10 15 8.8 10.4 4.5 9.2 8.8 8z",
    people: "M7 9.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4zM3.8 15.5c.4-2 1.8-3 3.2-3s2.8 1 3.2 3M13.2 8.8a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6zM12.2 15.5c.3-1.5 1.2-2.4 2.3-2.6 1 .2 1.8 1 2.2 2.6",
    user: "M10 10a2.6 2.6 0 1 0 0-5.2A2.6 2.6 0 0 0 10 10zM5 16c.6-2.4 2.4-3.6 5-3.6s4.4 1.2 5 3.6",
    gear: "M10 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4zM10 3.5v1.6M10 14.9v1.6M4.2 6.2l1.4.8M14.4 13l1.4.8M4.2 13.8l1.4-.8M14.4 7l1.4-.8",
    menu: "M4 6.5h12M4 10h12M4 13.5h12",
  };
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
      <path d={paths[name] ?? paths.grid} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
