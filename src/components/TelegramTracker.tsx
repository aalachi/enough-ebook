"use client";

import { useEffect } from "react";

/**
 * Client-side event tracker → /api/track → Telegram group.
 *
 * - Fires ONE `page_view` per browser session (deduped via sessionStorage)
 *   so refreshes / client navigations don't flood the group.
 * - Listens for clicks on any element marked `data-cta` (the same convention
 *   the Meta Pixel uses) and reports a `cta_click` with the button's label
 *   and destination.
 *
 * Events are sent with `navigator.sendBeacon` (falling back to `fetch` with
 * `keepalive`) so a click that immediately navigates to the shop still
 * delivers the event before the page unloads.
 *
 * This component renders nothing. It is a safe no-op if the server has no
 * Telegram credentials configured — /api/track simply returns 204.
 */

interface TrackPayload {
  type: "page_view" | "cta_click";
  path: string;
  cta?: string;
  label?: string;
  href?: string;
  referrer?: string;
  utm?: Record<string, string>;
  screen?: string;
}

function send(payload: TrackPayload) {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon("/api/track", blob)) return;
    }
  } catch {
    // fall through to fetch
  }
  // keepalive lets the request outlive the page during navigation.
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

function readUtm(): Record<string, string> {
  const utm: Record<string, string> = {};
  const params = new URLSearchParams(window.location.search);
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ]) {
    const v = params.get(key);
    if (v) utm[key.replace("utm_", "")] = v;
  }
  return utm;
}

export default function TelegramTracker() {
  useEffect(() => {
    // --- page view (once per session) ---
    const SESSION_KEY = "tg_pageview_sent";
    if (!sessionStorage.getItem(SESSION_KEY)) {
      sessionStorage.setItem(SESSION_KEY, "1");
      send({
        type: "page_view",
        path: window.location.pathname + window.location.search,
        referrer: document.referrer || undefined,
        utm: readUtm(),
        screen: `${window.innerWidth}×${window.innerHeight}`,
      });
    }

    // --- CTA clicks ---
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-cta]");
      if (!el) return;

      const anchor = el.closest<HTMLAnchorElement>("a");
      send({
        type: "cta_click",
        path: window.location.pathname,
        cta: el.dataset.cta || "button",
        label: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
        href: anchor?.href || undefined,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
