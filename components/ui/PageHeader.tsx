import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{eyebrow}</p> : null}
        <h1 className="mt-1 font-serif text-4xl tracking-tight text-ink md:text-5xl">{title}</h1>
        {description ? <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
