"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export function Header({
  mode,
  onNavigate,
  onBook,
}: {
  mode: "site" | "book";
  onNavigate: (section?: (typeof links)[number]["id"]) => void;
  onBook: () => void;
}) {
  const [open, setOpen] = useState(false);

  function navigate(section?: (typeof links)[number]["id"]) {
    setOpen(false);
    onNavigate(section);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-ivory/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-8">
        <button type="button" onClick={() => navigate()} className="flex items-baseline gap-2 text-left">
          <span className="font-serif text-[1.35rem] tracking-[0.16em] text-ink">LUMIÈRE</span>
          <span className="hidden text-[10px] tracking-[0.24em] text-muted sm:inline">STUDIO</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Studio">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => navigate(link.id)}
              className="text-sm text-ink-soft transition hover:text-ink"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="rounded-full border border-line bg-paper px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted">
            Demo
          </span>
          <Link href="/dashboard" className="hidden text-sm text-muted transition hover:text-ink lg:inline">
            Admin
          </Link>
          <button type="button" onClick={onBook} className={buttonClass("primary", "sm", "px-4 sm:px-5")}>
            <span className="sm:hidden">{mode === "book" ? "Booking" : "Book"}</span>
            <span className="hidden sm:inline">Book an appointment</span>
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1">
              <span className={cn("block h-px w-3.5 bg-ink transition", open && "translate-y-[2.5px] rotate-45")} />
              <span className={cn("block h-px w-3.5 bg-ink transition", open && "-translate-y-[2.5px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-line bg-ivory px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => navigate(link.id)}
                className="rounded-2xl px-3 py-3 text-left text-sm hover:bg-sand/60"
              >
                {link.label}
              </button>
            ))}
            <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-2xl px-3 py-3 text-sm text-ink-soft hover:bg-sand/60">
              Admin dashboard
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
