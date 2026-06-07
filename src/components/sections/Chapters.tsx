"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { chapters } from "@/lib/content";

/**
 * Pinned horizontal scrub (desktop): the section pins and the card track
 * translates sideways with scroll. Mobile: native horizontal scroll-snap.
 */
export default function Chapters() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const trackEl = track.current!;
          const distance = () => trackEl.scrollWidth - window.innerWidth + 96;

          gsap.to(trackEl, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => "+=" + distance(),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="whats-inside" className="relative bg-cream">
      <div className="flex min-h-[100svh] flex-col justify-center py-20 md:overflow-hidden md:py-0">
        <div className="mb-8 px-6 sm:px-10 md:mb-12 md:px-[8vw]">
          <p className="eyebrow">What&rsquo;s inside</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold sm:text-5xl">
            Eight chapters. Real, doable care.
          </h2>
        </div>

        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-10 md:snap-none md:overflow-visible md:px-[8vw] [&::-webkit-scrollbar]:hidden"
        >
          {chapters.map((c) => (
            <article
              key={c.n}
              className="group relative flex w-[78vw] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-sand bg-cream shadow-[0_18px_50px_-30px_rgba(59,58,54,0.5)] sm:w-[360px] md:w-[380px]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 768px) 78vw, 380px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-blush">
                  {String(c.n).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-sage">
                  {c.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {c.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
