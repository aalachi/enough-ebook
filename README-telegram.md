# Telegram tracking notifications

Get a Telegram message every time someone visits the landing page or clicks a
buy / CTA button.

## How it works

```
Browser (TelegramTracker.tsx)  →  /api/track (route.ts, server)  →  Telegram Bot API  →  your group
```

- **page_view** — fired once per browser session (refreshes don't re-notify).
- **cta_click** — fired when any `data-cta` button is clicked (Hero, Nav, Offer,
  Footer buy buttons). Includes the button label and where it links to.

The bot token lives **only on the server** (`TELEGRAM_BOT_TOKEN`), so it never
reaches visitors' browsers. If the env vars aren't set, everything safely
no-ops — local dev stays quiet.

## Setup (5 minutes)

### 1. Create the bot

1. In Telegram, message [@BotFather](https://t.me/BotFather).
2. Send `/newbot`, follow the prompts.
3. Copy the token it gives you — looks like `123456789:ABCdefGhIJKlmно...`.
   This is your `TELEGRAM_BOT_TOKEN`.

### 2. Create the group and add the bot

1. Create a Telegram group (or use an existing one).
2. Add your new bot to the group as a member.
3. (Optional) In @BotFather, `/setprivacy` → **Disable** so the bot can read
   group context — not strictly required since we only *send*, but harmless.

### 3. Get the group chat id

Send any message in the group, then open this URL in a browser (paste your
token in):

```
https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
```

Look for `"chat":{"id":-100xxxxxxxxxx,...}`. The negative number (group ids are
negative, often starting `-100`) is your `TELEGRAM_CHAT_ID`.

> If `getUpdates` is empty, send a fresh message in the group and reload. If the
> bot was added a while ago, remove and re-add it, then post again.

### 4. Set the env vars

**Local** — create `.env.local`:

```
TELEGRAM_BOT_TOKEN=123456789:ABCdef...
TELEGRAM_CHAT_ID=-1001234567890
```

**Production (Vercel)** — Project → Settings → Environment Variables, add both,
then redeploy.

### 5. Test

Run `npm run dev`, open the page → you should get a "👀 New visitor" message.
Click a buy button → you should get a "🛒 CTA click" message.

## Tuning

- **Page-view volume**: currently one message per session. To notify on *every*
  load, remove the `sessionStorage` guard in
  [src/components/TelegramTracker.tsx](src/components/TelegramTracker.tsx). To
  stop page-view messages entirely (clicks only), delete that `send({ type:
  "page_view", ... })` block.
- **Track more buttons**: add `data-cta="<name>"` to any element. The same
  attribute also feeds the Meta Pixel.
- **Rate limits**: Telegram allows ~20 messages/min to a single group. On
  high-traffic days consider the "clicks only" setting above, or aggregating.

## Note on `/api/track`

The endpoint is public (it has to be, the browser calls it). It only accepts
the two known event types and truncates field lengths, but a determined actor
could still POST fake events. For a landing page that's an acceptable
trade-off; if it ever becomes a problem, add a shared-secret header or basic
rate limiting in [src/app/api/track/route.ts](src/app/api/track/route.ts).
