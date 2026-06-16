"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { book } from "@/lib/content";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Entrance: eyebrow → title letters → sub/CTA, soft and slow.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 1 },
        });
        tl.from(".hero-eyebrow", { autoAlpha: 0, y: 16 })
          .from(
            ".hero-letter",
            { autoAlpha: 0, yPercent: 120, stagger: 0.06, duration: 1.1 },
            "-=0.6",
          )
          .from(
            ".hero-fade",
            { autoAlpha: 0, y: 20, stagger: 0.12 },
            "-=0.7",
          )
          .from(".hero-cue", { autoAlpha: 0, duration: 0.8 }, "-=0.4");

        // Parallax: image drifts slower than scroll; content lifts & fades.
        gsap.to(".hero-media", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-content", {
          yPercent: -12,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const title = "Enough";

  return (
    <section
      ref={root}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden"
    >
      {/* Full-bleed hero photo (cover.png) with parallax wrapper */}
      <div className="hero-media absolute inset-0 -top-[8%] h-[116%] w-full">
        <Image
          src={book.cover}
          alt="A calm, sunlit journal, tea, and dried flowers"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Legibility wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/10" />
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 flex h-full flex-col justify-end px-6 pb-20 sm:px-10 md:px-14 lg:pb-28">
        <div className="mx-auto w-full max-w-6xl">
          <p className="hero-eyebrow eyebrow !text-cream/85">A self-care guide</p>

          <h1 className="mt-4 flex overflow-hidden text-cream">
            <span className="sr-only">{title}</span>
            <span aria-hidden className="flex">
              {title.split("").map((ch, i) => (
                <span
                  key={i}
                  className="hero-letter inline-block text-[22vw] font-semibold leading-[0.85] sm:text-[16vw] md:text-[12rem] lg:text-[14rem]"
                >
                  {ch}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-xl font-[var(--font-body)] text-lg text-cream/90 sm:text-xl">
            {book.subtitle}
          </p>
          <p className="hero-fade mt-2 max-w-xl text-base italic text-cream/75">
            {book.tagline}
          </p>

          <div className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={book.buyHref}
              data-cta="buy"
              className="inline-flex h-13 min-h-[52px] items-center justify-center rounded-full bg-cream px-8 text-base font-medium tracking-wide text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              Get the book — {book.price}
            </a>
            <a
              href="#whats-inside"
              className="inline-flex h-13 min-h-[52px] items-center justify-center rounded-full border border-cream/50 px-8 text-base font-medium text-cream transition-colors duration-300 hover:bg-cream/10"
            >
              What&rsquo;s inside
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-cue pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-cream/70">
        <span className="block h-10 w-px animate-pulse bg-cream/60" />
      </div>
    </section>
  );
}
