import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  emma: "from-[#3a322c] via-[#6e5f51] to-[#cfc0ae]",
  sofia: "from-[#2a241f] via-[#8d7462] to-[#eadfd2]",
  mia: "from-[#1c1916] via-[#514940] to-[#c4b5a4]",
};

export function Portrait({
  id,
  name,
  initials,
  size = "lg",
}: {
  id: string;
  name: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
}) {
  const letters =
    initials ??
    name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("");

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-gradient-to-br",
        tones[id] ?? "from-[#2c2824] to-[#a89880]",
        size === "lg" && "h-28 w-28 rounded-[1.6rem]",
        size === "md" && "h-16 w-16 rounded-2xl",
        size === "sm" && "h-10 w-10 rounded-full",
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_42%)]" />
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center font-serif text-paper",
          size === "lg" && "text-4xl",
          size === "md" && "text-xl",
          size === "sm" && "text-sm",
        )}
      >
        {letters}
      </span>
    </div>
  );
}
