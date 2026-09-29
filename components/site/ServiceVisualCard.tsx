"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Service } from "@/lib/types";
import { serviceImage } from "@/lib/editorial-images";
import { EditorialImage } from "@/components/site/EditorialImage";
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
  const reduce = useReducedMotion();

  return (
    <article className={`group relative overflow-hidden rounded-[1.75rem] bg-ink shadow-elevated ${className ?? ""}`}>
      <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5]">
        <EditorialImage
          src={serviceImage(service.id)}
          alt=""
          fill
          sizes="(max-width: 768px) 85vw, 33vw"
          className="transition duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80 transition duration-500 group-hover:opacity-95" />
        <div className="absolute inset-x-0 bottom-0 p-6 transition duration-500 group-hover:-translate-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-paper/60">{formatDuration(service.duration)}</p>
          <h3 className="mt-2 font-serif text-3xl text-paper md:text-4xl">{service.name}</h3>
          <p className="mt-1 font-serif text-2xl text-taupe">{formatPrice(service.price)}</p>
          <p className="mt-3 text-sm leading-6 text-paper/75 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-24 md:group-hover:opacity-100">
            {service.description}
          </p>
          <div className="mt-4 md:translate-y-2 md:opacity-0 md:transition md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <Button size="sm" onClick={onBook} className="bg-paper text-ink hover:bg-paper/90">
              Book
            </Button>
          </div>
        </div>
        {!reduce ? (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100"
            layout={false}
          />
        ) : null}
      </div>
    </article>
  );
}
