import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const control =
  "mt-2 w-full rounded-2xl border bg-paper px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/80 focus:border-ink/40";

export function Field({
  label,
  error,
  id,
  ...props
}: { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const fieldId = id ?? props.name;
  return (
    <div>
      <label htmlFor={fieldId} className="text-[11px] uppercase tracking-[0.16em] text-muted">
        {label}
      </label>
      <input
        id={fieldId}
        aria-invalid={error ? true : undefined}
        className={cn(control, error ? "border-taupe-deep" : "border-line")}
        {...props}
      />
      {error ? <p className="mt-1.5 text-xs text-ink">{error}</p> : null}
    </div>
  );
}

export function TextArea({
  label,
  id,
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const fieldId = id ?? props.name;
  return (
    <div>
      <label htmlFor={fieldId} className="text-[11px] uppercase tracking-[0.16em] text-muted">
        {label}
      </label>
      <textarea
        id={fieldId}
        className={cn(control, "min-h-28 resize-y border-line")}
        {...props}
      />
    </div>
  );
}
