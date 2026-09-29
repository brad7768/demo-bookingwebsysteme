"use client";

import Image from "next/image";
import type { Service } from "@/lib/types";
import { serviceImage } from "@/lib/studio-images";
import { Button } from "@/components/ui/Button";
import { formatDuration, formatPrice } from "@/lib/utils";

export function ServiceVisualCard({
  service,
  onBook,
  className,
}: {
  service: Service;
  onBook: () => void;
  className?: string;
}) {
  return (
    <article
      className={`group relative w-[min(78vw,340px)] shrink-0 snap-center overflow-hidden rounded-[1.75rem] bg-ink shadow-elevated transition duration-500 hover:-translate-y-1.5 hover:shadow-float md:w-auto ${className ?? ""}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={serviceImage(service.id)}
          alt={`${service.name} at Lumière Studio`}
          fill
          sizes="340px"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-90 transition duration-500 group-hover:opacity-95" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-serif text-2xl uppercase tracking-[0.04em] text-paper md:text-3xl">{service.name}</h3>
          <p className="mt-2 text-sm text-paper/70">
            {formatPrice(service.price)} · {formatDuration(service.duration)}
          </p>
          <div className="mt-4 translate-y-3 opacity-100 transition duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <Button size="sm" onClick={onBook} className="btn-editorial bg-paper text-ink hover:bg-champagne">
              Book →
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
