import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Enough — Real Self-Care for Women Who Are Too Busy for It",
  description:
    "Small, doable ways to feel like yourself again — even on your worst weeks. A warm, practical self-care guide for busy women.",
  openGraph: {
    title: "Enough — Real Self-Care for Women Who Are Too Busy for It",
    description:
      "Small, doable ways to feel like yourself again — even on your worst weeks.",
    images: ["/images/cover.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lora.variable}`}>
      <body className="min-h-full">
        <SmoothScroll>{children}</SmoothScroll>
        {/* Gumroad overlay: turns links to your Gumroad product URL into an
            in-page card-checkout modal. Inert until buyHref is a Gumroad URL. */}
        <Script src="https://gumroad.com/js/gumroad.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
