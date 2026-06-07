"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { reframe } from "@/lib/content";

/** Line-reveal: the quote wipes in left-to-right via clip-path on enter. */
export default function Reframe() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".reframe-quote", {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 65%" },
        });
        gsap.from(".reframe-body", {
          autoAlpha: 0,
          y: 24,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 50%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="bg-sage px-6 py-[clamp(5rem,14vh,9rem)] text-cream sm:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow !text-cream/70">{reframe.eyebrow}</p>
        <blockquote
          className="reframe-quote mt-6 font-display text-[2rem] font-medium leading-[1.12] text-cream sm:text-5xl md:text-6xl"
          style={{ willChange: "clip-path" }}
        >
          {reframe.quote}
        </blockquote>
        <p className="reframe-body mt-8 max-w-2xl text-lg leading-relaxed text-cream/85">
          {reframe.body}
        </p>
      </div>
    </section>
  );
}
