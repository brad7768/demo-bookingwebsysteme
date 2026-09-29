import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const control =
  "peer w-full rounded-2xl border bg-paper/90 px-4 pb-3 pt-6 text-base text-ink outline-none transition duration-300 placeholder:text-transparent focus:border-ink/35 focus:shadow-[0_0_0_3px_rgba(28,25,22,0.06)]";

const labelClass =
  "pointer-events-none absolute left-4 top-4 text-[11px] uppercase tracking-[0.16em] text-muted transition-all duration-300 peer-focus:top-2 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]";

export function Field({
  label,
  error,
  id,
  ...props
}: { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const fieldId = id ?? props.name;
  return (
    <div>
      <div className="relative">
        <label htmlFor={fieldId} className={labelClass}>
          {label}
        </label>
        <input
          id={fieldId}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          className={cn(control, error ? "border-taupe-deep" : "border-line")}
          {...props}
        />
      </div>
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
        className={cn(control, "mt-2 min-h-28 resize-y border-line pt-4 placeholder:text-muted/80")}
        {...props}
      />
    </div>
  );
}
