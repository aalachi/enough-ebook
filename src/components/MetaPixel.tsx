"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

/**
 * Meta (Facebook) Pixel.
 * - Injects the base code and fires PageView + ViewContent on load (this is
 *   what powers audience/demographic breakdowns and Custom/Lookalike audiences).
 * - Fires InitiateCheckout when any buy CTA (data-cta="buy") is clicked.
 * - No-ops safely when NEXT_PUBLIC_FB_PIXEL_ID is not set (local/dev).
 *
 * Note: the actual Purchase happens on the external checkout
 * (shop.readenough.com), so add this same Pixel ID in your checkout/Gumroad
 * settings to capture Purchase events. See README-meta-pixel.md.
 */
export default function MetaPixel() {
  useEffect(() => {
    if (!PIXEL_ID) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-cta="buy"]') && window.fbq) {
        window.fbq("track", "InitiateCheckout", {
          content_name: "Enough ebook",
          value: 24,
          currency: "USD",
        });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
          fbq('track', 'ViewContent', {content_name: 'Enough ebook', value: 24, currency: 'USD'});
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
