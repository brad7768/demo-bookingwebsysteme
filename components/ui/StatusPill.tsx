import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  confirmed: "bg-sand text-ink",
  pending: "bg-paper text-taupe-deep ring-1 ring-inset ring-taupe",
  completed: "bg-ivory text-muted",
  Active: "bg-sand text-ink",
  New: "bg-ink text-paper",
  Inactive: "bg-ivory text-muted ring-1 ring-inset ring-line",
};

export function StatusPill({ status }: { status: string }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] tracking-wide", tones[status] ?? tones.confirmed)}>
      {label}
    </span>
  );
}
