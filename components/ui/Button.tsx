import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-300 ease-out hover:scale-[1.02] active:scale-[0.99]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
    "disabled:cursor-not-allowed disabled:opacity-40",
    size === "md" ? "h-11 px-5 text-sm" : "h-9 px-3.5 text-[13px]",
    variant === "primary" && "bg-ink text-paper hover:bg-[#2c2824]",
    variant === "secondary" && "border border-line bg-paper text-ink hover:border-taupe hover:bg-sand/50",
    variant === "ghost" && "text-ink hover:bg-sand/80",
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />;
}
