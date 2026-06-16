"use client";

import Image from "next/image";
import { book, includes } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

/** Sticky-stack: pricing card sticks while the "what you get" list reveals. */
export default function Offer() {
  return (
    <section
      id="get-the-book"
      className="bg-cream px-6 py-[clamp(5rem,13vh,9rem)] sm:px-10"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        {/* Sticky pricing card */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="overflow-hidden rounded-3xl border border-sand bg-blush-soft shadow-[0_30px_80px_-50px_rgba(59,58,54,0.6)]">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={book.cover}
                alt="The Enough self-care ebook"
                fill
                sizes="(max-width: 768px) 90vw, 520px"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-sage">
                {book.title}
              </h2>
              <p className="mt-1 text-muted">{book.subtitle}</p>

              <span className="mt-6 inline-flex items-center rounded-full bg-blush/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sage">
                {book.launchTag}
              </span>
              <div className="mt-3 flex items-end gap-3">
                <span className="font-display text-5xl font-semibold text-ink">
                  {book.price}
                </span>
                <span className="mb-1 font-display text-2xl text-muted line-through decoration-blush/80">
                  {book.regularPrice}
                </span>
                <span className="mb-1.5 text-sm text-muted">
                  · {book.priceNote}
                </span>
              </div>

              <a
                href="https://shop.readenough.com"
                data-cta="buy"
                className="mt-6 flex min-h-[54px] w-full items-center justify-center rounded-full bg-sage px-8 text-base font-medium text-cream transition-transform duration-300 hover:scale-[1.02]"
              >
                Get the book — {book.price}
              </a>
              <p className="mt-4 text-center text-xs text-muted">
                Instant PDF · read on any device · yours forever
              </p>
            </div>
          </div>
        </div>

        {/* Revealing value list */}
        <div>
          <Reveal>
            <p className="eyebrow">What you get</p>
            <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
              Everything you need to start small
            </h2>
          </Reveal>
          <ul className="mt-10 space-y-5">
            {includes.map((item, i) => (
              <li key={i}>
                <Reveal delay={i * 0.05} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage"
                  >
                    ✓
                  </span>
                  <span className="text-lg leading-relaxed text-ink">
                    {item}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
