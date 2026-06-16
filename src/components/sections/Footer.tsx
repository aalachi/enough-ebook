import { book } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-[clamp(4rem,12vh,8rem)] text-cream sm:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-display text-3xl font-medium leading-tight text-cream sm:text-5xl">
            You are enough. You&rsquo;re allowed to start today.
          </p>
          <a
            href={book.buyHref}
            data-cta="buy"
            className="mt-10 inline-flex min-h-[54px] items-center justify-center rounded-full bg-cream px-9 text-base font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            Get the book — {book.price}
          </a>
        </Reveal>

        <p className="mx-auto mt-16 max-w-2xl text-xs leading-relaxed text-cream/50">
          This book offers support and encouragement, not medical advice. It
          isn&rsquo;t a substitute for care from a qualified professional. If
          you&rsquo;re struggling with your mental health, please reach out to a
          doctor, therapist, or a local crisis line.
        </p>
        <p className="mt-6 text-xs text-cream/40">
          © {new Date().getFullYear()} Enough · Real self-care for busy women.
        </p>
      </div>
    </footer>
  );
}
