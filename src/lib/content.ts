// All page copy in one place. "Real Women" are illustrative characters FROM
// the book (not customer testimonials), so the section is framed honestly.

export const book = {
  title: "Enough",
  subtitle: "Real Self-Care for Women Who Are Too Busy for It",
  tagline:
    "Small, doable ways to feel like yourself again — even on your worst weeks.",
  pages: 50,
  price: "$24",
  regularPrice: "$39",
  launchTag: "Launch price",
  priceNote: "Instant PDF download",
  // Paste your Gumroad product URL here (with ?wanted=true to open the overlay
  // checkout directly), e.g. "https://yourname.gumroad.com/l/enough?wanted=true".
  // Buyers pay by normal credit/debit card; the gumroad.js script in layout.tsx
  // turns these CTAs into an in-page checkout modal. Until set, it just scrolls.
  buyHref: "#get-the-book",
  cover: "/images/cover.png",
};

export const empathyLines = [
  "You're tired.",
  "Not the kind a good night's sleep fixes — the kind that lives in your shoulders.",
  "Nothing is wrong with you. You're just carrying a lot, mostly without anyone noticing.",
];

export const reframe = {
  eyebrow: "The shift",
  quote: "Self-care isn't a reward you earn. It's the maintenance that keeps you well.",
  body: "You don't water a plant as a prize for surviving the week. You water it so it doesn't wilt. You are the same — and you're allowed to start today.",
};

export type Chapter = {
  n: number;
  title: string;
  blurb: string;
  image: string;
};

export const chapters: Chapter[] = [
  {
    n: 1,
    title: "Why You're So Tired",
    blurb: "The real reasons you're running on empty — and why none of them are your fault.",
    image: "/images/chapter_1.png",
  },
  {
    n: 2,
    title: "Self-Care Is Maintenance, Not a Reward",
    blurb: "Stop waiting to earn rest. Care is upkeep, not a prize for finishing the list.",
    image: "/images/chapter_2.png",
  },
  {
    n: 3,
    title: "Mindfulness in 60 Seconds",
    blurb: "Calm that fits a chaotic day — one breath, one sip, one doorway at a time.",
    image: "/images/chapter_3.png",
  },
  {
    n: 4,
    title: "The Art of Saying No",
    blurb: "Boundaries without the guilt. “No” is a complete, kind sentence.",
    image: "/images/chapter_4.png",
  },
  {
    n: 5,
    title: "Rest Without Earning It",
    blurb: "Sleep, doing nothing, and micro-rest — for the woman who never stops.",
    image: "/images/chapter_5.png",
  },
  {
    n: 6,
    title: "Talk to Yourself Like Someone You Love",
    blurb: "Trade the inner critic for the voice of a good, honest friend.",
    image: "/images/chapter_6.png",
  },
  {
    n: 7,
    title: "Your Body Is Not the Enemy",
    blurb: "Gentle movement, food without guilt, and a calmer nervous system.",
    image: "/images/chapter_7.png",
  },
  {
    n: 8,
    title: "Building a System That Survives a Bad Week",
    blurb: "Tiny habits and minimum-viable self-care that hold when life doesn't.",
    image: "/images/chapter_8.png",
  },
];

// Illustrative women from inside the book — shown as story excerpts, not reviews.
export const realWomen = [
  { quote: "I'd been waiting for permission to rest that was never coming.", name: "Maya", age: 34 },
  { quote: "I finally stopped treating a glass of water like a reward.", name: "Carmen", age: 29 },
  { quote: "One breath before I walk in the door changed my whole evening.", name: "Aisha", age: 33 },
  { quote: "The wall I was so afraid of turned out to be made of paper.", name: "Lauren", age: 36 },
  { quote: "A bad week didn't erase everything. I came out still standing.", name: "Renée", age: 47 },
];

export const includes = [
  "8 warm, practical chapters (~50 pages) — no jargon, no guilt",
  "A “Try This Today” action in every chapter — each under 10 minutes",
  "Dozens of short journaling prompts",
  "A 7-Day Reset to start small",
  "An Emergency Self-Care Menu for your hardest days",
  "A one-page Toolkit to keep close",
  "Instant PDF — read it on any device, forever",
];
