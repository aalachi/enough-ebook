import type { NextRequest } from "next/server";

/**
 * Server-side tracking endpoint.
 *
 * The browser POSTs lightweight analytics events here (page views, CTA
 * clicks). This handler formats them and forwards a message to a Telegram
 * group via the Bot API.
 *
 * Why a server route (and not call Telegram from the browser): the bot token
 * must stay secret. If it were in client code, anyone could read it and post
 * to / take over your group. So the token lives in server-only env vars
 * (NOT prefixed with NEXT_PUBLIC) and never reaches the browser.
 *
 * Required env (set in .env.local locally, and in Vercel → Settings → Env Vars):
 *   TELEGRAM_BOT_TOKEN  — from @BotFather, e.g. 123456:ABC-DEF...
 *   TELEGRAM_CHAT_ID    — the group's chat id, e.g. -1001234567890
 *
 * Without those set, this safely no-ops (returns 204) so local dev is unaffected.
 */

// Always run on the server at request time (never cached / prerendered).
export const dynamic = "force-dynamic";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

type EventType = "page_view" | "cta_click";

interface TrackPayload {
  type?: EventType;
  path?: string;
  cta?: string;
  label?: string;
  href?: string;
  referrer?: string;
  utm?: Record<string, string>;
  screen?: string;
}

// Escape values before putting them into a Telegram HTML-parsed message.
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .slice(0, 500);
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function buildMessage(p: TrackPayload, req: NextRequest): string {
  const ua = req.headers.get("user-agent") ?? "";
  const ip = clientIp(req);
  const country =
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    "";

  const lines: string[] = [];

  if (p.type === "cta_click") {
    lines.push(`🛒 <b>CTA click</b> — <b>${esc(p.cta ?? "button")}</b>`);
    if (p.label) lines.push(`• Label: ${esc(p.label)}`);
    if (p.href) lines.push(`• Goes to: ${esc(p.href)}`);
  } else {
    lines.push("👀 <b>New visitor</b> — page view");
  }

  if (p.path) lines.push(`• Page: ${esc(p.path)}`);
  if (p.referrer) lines.push(`• From: ${esc(p.referrer)}`);

  if (p.utm && Object.keys(p.utm).length) {
    const utm = Object.entries(p.utm)
      .map(([k, v]) => `${esc(k)}=${esc(v)}`)
      .join(", ");
    lines.push(`• UTM: ${utm}`);
  }

  const meta: string[] = [];
  if (country) meta.push(country);
  if (p.screen) meta.push(esc(p.screen));
  if (meta.length) lines.push(`• ${meta.join(" · ")}`);

  lines.push(`• IP: <code>${esc(ip)}</code>`);
  if (ua) lines.push(`• <i>${esc(ua)}</i>`);

  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  // No bot configured → accept and ignore (keeps local dev quiet).
  if (!BOT_TOKEN || !CHAT_ID) {
    return new Response(null, { status: 204 });
  }

  let payload: TrackPayload;
  try {
    payload = (await req.json()) as TrackPayload;
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  if (payload.type !== "page_view" && payload.type !== "cta_click") {
    return new Response("Unknown event", { status: 400 });
  }

  const text = buildMessage(payload, req);

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!res.ok) {
      // Surface Telegram's error server-side; don't leak it to the client.
      console.error("Telegram sendMessage failed:", res.status, await res.text());
      return new Response(null, { status: 502 });
    }
  } catch (err) {
    console.error("Telegram request error:", err);
    return new Response(null, { status: 502 });
  }

  return new Response(null, { status: 204 });
}
