"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const POSTER = "/studio/hero-poster.svg";
/** `public/studio/atelier-form.glb` — replace via Higgsfield image→3D when credits are available (see docs/HIGGSFIELD_ASSETS.md). */
const MODEL = "/studio/atelier-form.glb";

export function HeroVisual() {
  const [show3d, setShow3d] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShow3d(true);
      },
      { rootMargin: "120px" },
    );
    const node = document.getElementById("hero-visual");
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!show3d || reduced) return;
    let cancelled = false;
    fetch(MODEL, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) return;
        if (cancelled) return;
        setModelReady(true);
        if (customElements.get("model-viewer")) {
          setScriptReady(true);
          return;
        }
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
        script.onload = () => !cancelled && setScriptReady(true);
        document.head.appendChild(script);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [show3d, reduced]);

  return (
    <div id="hero-visual" className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line shadow-soft sm:aspect-[5/6] lg:h-[640px] lg:w-[460px]">
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,#efe4d6,transparent_42%),radial-gradient(circle_at_78%_72%,#8d7b68,transparent_46%),linear-gradient(165deg,#1c1916_0%,#3a332c_46%,#c9bbaa_100%)]",
          modelReady && show3d && scriptReady && !reduced && "opacity-0 transition-opacity duration-700",
        )}
        aria-hidden
      />
      {!reduced && modelReady && show3d && scriptReady ? (
        // @ts-expect-error model-viewer is a custom element
        <model-viewer
          src={MODEL}
          poster={POSTER}
          alt="Abstract ceramic form in warm studio light"
          camera-controls={false}
          touch-action="pan-y"
          interaction-prompt="none"
          auto-rotate
          rotation-per-second="12deg"
          shadow-intensity="0.55"
          exposure="0.92"
          environment-image="neutral"
          className="absolute inset-0 h-full w-full bg-[#1c1916]"
          style={{ "--poster-color": "#1c1916" }}
        />
      ) : (
        <img src={POSTER} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/50 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-8 text-paper">
        <p className="text-[11px] uppercase tracking-[0.22em] text-paper/70">The atelier</p>
        <p className="mt-2 font-serif text-4xl leading-none">Light, kept quiet.</p>
      </div>
    </div>
  );
}
