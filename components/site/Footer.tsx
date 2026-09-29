import Link from "next/link";
import { studio } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-serif text-2xl tracking-[0.14em]">LUMIÈRE STUDIO</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-ink-soft">
            A demonstration booking experience. The studio, stylists, guests, and appointments are fictional.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-ink-soft md:items-end">
          <p>{studio.address[0]}</p>
          <p>{studio.phone}</p>
          <Link href="/dashboard" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            Studio dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
