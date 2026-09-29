import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Service" },
  { id: 2, label: "Professional" },
  { id: 3, label: "Date & Time" },
  { id: 4, label: "Details" },
  { id: 5, label: "Confirmation" },
];

export function Progress({
  step,
  canJump,
  onJump,
}: {
  step: number;
  canJump: (target: number) => boolean;
  onJump: (target: number) => void;
}) {
  return (
    <nav aria-label="Booking progress">
      <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted md:hidden">
        Step {step} of 5 · {steps[step - 1]?.label}
      </p>
      <ol className="flex items-start gap-1 overflow-x-auto pb-1">
        {steps.map((item, index) => {
          const complete = item.id < step;
          const current = item.id === step;
          const allowed = canJump(item.id);
          return (
            <li key={item.id} className="flex min-w-0 flex-1 items-center last:flex-none">
              <button
                type="button"
                disabled={!allowed}
                aria-current={current ? "step" : undefined}
                onClick={() => onJump(item.id)}
                className="group flex shrink-0 flex-col items-center gap-2 disabled:cursor-not-allowed"
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border text-xs transition",
                    current && "border-ink bg-ink text-paper",
                    complete && "border-ink bg-ink text-paper",
                    !current && !complete && "border-line bg-paper text-muted",
                    allowed && !current && "group-hover:border-taupe",
                  )}
                >
                  {complete || (current && step === 5) ? (
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                      <path d="M3.5 8.2 6.4 11l6.1-6.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  ) : (
                    item.id
                  )}
                </span>
                <span className={cn("hidden text-[11px] tracking-wide sm:block", current ? "text-ink" : "text-muted")}>
                  {item.label}
                </span>
              </button>
              {index < steps.length - 1 ? (
                <span className={cn("mx-2 mb-0 h-px flex-1 sm:mb-5", item.id < step ? "bg-ink" : "bg-line")} />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
