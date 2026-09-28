import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">404</p>
      <h1 className="mt-3 font-serif text-5xl text-ink">This page is not on the book.</h1>
      <p className="mt-4 max-w-sm text-ink-soft">
        The link may be out of date. The studio and the dashboard are both still open.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonClass()}>
          Booking page
        </Link>
        <Link href="/dashboard" className={buttonClass("secondary")}>
          Dashboard
        </Link>
      </div>
    </main>
  );
}
