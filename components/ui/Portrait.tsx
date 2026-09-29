import Image from "next/image";
import { professionalImage } from "@/lib/editorial-images";
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
  src,
}: {
  id: string;
  name: string;
  initials?: string;
  size?: "sm" | "md" | "lg" | "xl";
  src?: string;
}) {
  const letters =
    initials ??
    name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("");
  const photo = src ?? professionalImage(id);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-gradient-to-br shadow-soft",
        tones[id] ?? "from-[#2c2824] to-[#a89880]",
        size === "xl" && "relative h-44 w-full min-h-[11rem] rounded-none sm:rounded-l-[1.5rem]",
        size === "lg" && "h-28 w-28 rounded-[1.6rem]",
        size === "md" && "h-16 w-16 rounded-2xl",
        size === "sm" && "h-10 w-10 rounded-full",
      )}
      aria-hidden
    >
      <Image src={photo} alt="" fill sizes={size === "xl" ? "400px" : "120px"} className="object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_42%)]" />
      <span
        className={cn(
          "absolute inset-0 hidden items-center justify-center font-serif text-paper",
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
