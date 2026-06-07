"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { empathyLines } from "@/lib/content";

/**
 * Pinned-scrub: the panel pins and the empathy lines crossfade one at a time
 * as you scroll. Reduced motion → lines render stacked & static.
 */
export default function Empathy() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lines = gsap.utils.toArray<HTMLElement>(".empathy-line");
        gsap.set(lines, { position: "absolute", autoAlpha: 0, y: 40 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".empathy-pin",
            start: "top top",
            end: "+=" + lines.length * 100 + "%",
            pin: true,
            scrub: 0.5,
          },
        });

        lines.forEach((line, i) => {
          tl.to(line, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" });
          if (i < lines.length - 1) {
            tl.to(line, { autoAlpha: 0, y: -40, duration: 1, ease: "power2.in" }, "+=1.1");
          }
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-cream text-ink">
      <div className="empathy-pin flex min-h-[100svh] flex-col items-center justify-center gap-8 px-6 py-24 text-center sm:px-10">
        {empathyLines.map((line, i) => (
          <p
            key={i}
            className="empathy-line max-w-3xl font-display text-3xl font-medium leading-[1.15] text-ink sm:text-5xl md:text-6xl"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
