"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { book } from "@/lib/content";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > (typeof window !== "undefined" ? window.innerHeight : 800) * 0.85);
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-sand/80 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#top"
          className={`font-display text-2xl font-semibold tracking-tight transition-colors duration-500 ${
            solid ? "text-sage" : "text-cream"
          }`}
        >
          Enough
        </a>
        <a
          href={book.buyHref}
          data-cta="buy"
          className={`inline-flex min-h-[44px] items-center rounded-full px-5 text-sm font-medium transition-colors duration-500 ${
            solid
              ? "bg-sage text-cream hover:bg-sage/90"
              : "bg-cream/90 text-ink hover:bg-cream"
          }`}
        >
          Get the book
        </a>
      </div>
    </header>
  );
}
