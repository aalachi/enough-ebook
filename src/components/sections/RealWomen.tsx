import { realWomen } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

/** Marquee auto-scroll of story excerpts from inside the book (not reviews). */
export default function RealWomen() {
  const row = [...realWomen, ...realWomen];

  return (
    <section className="overflow-hidden bg-sage-soft py-[clamp(4rem,11vh,7rem)]">
      <div className="mx-auto mb-12 max-w-4xl px-6 text-center sm:px-10">
        <Reveal>
          <p className="eyebrow">Real women</p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Inside, you&rsquo;ll meet women like you
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Short, honest stories woven through the book — different ages, same
            quiet exhaustion, and the small shifts that helped.
          </p>
        </Reveal>
      </div>

      <div className="marquee relative w-full">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-sage-soft to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-sage-soft to-transparent" />

        <div className="marquee-track flex w-max gap-5 px-3">
          {row.map((w, i) => (
            <figure
              key={i}
              className="flex w-[78vw] shrink-0 flex-col justify-between rounded-2xl border border-sage/15 bg-cream p-7 sm:w-[380px]"
            >
              <blockquote className="font-display text-2xl font-medium leading-snug text-ink">
                &ldquo;{w.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium tracking-wide text-sage">
                {w.name}, {w.age}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
