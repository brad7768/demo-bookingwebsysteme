"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function EditorialImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fill,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={900}
      priority={priority}
      sizes={sizes}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
