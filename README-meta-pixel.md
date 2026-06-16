# Meta Pixel — setup & usage

The Meta (Facebook) Pixel is wired into this site via
`src/components/MetaPixel.tsx` (rendered in `src/app/layout.tsx`). It powers
**audience breakdowns** (age / gender / region / placement of your visitors and
buyers in Ads Manager) and lets you build **Custom & Lookalike Audiences**.

## 1. Get your Pixel ID
1. Go to **business.facebook.com → Events Manager**.
2. **Connect Data Sources → Web → Meta Pixel → Connect.** Name it "Enough".
3. Copy the **Pixel ID** (a ~15-digit number).

## 2. Add it to the site
Local: create `.env.local` (copy from `.env.example`) with:
```
NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456
```
On **Vercel**: Project → Settings → Environment Variables → add the same key →
**Redeploy**. (Until it's set, the pixel is a safe no-op — nothing fires.)

## 3. What it tracks automatically
| Event | When | Why it matters |
|-------|------|----------------|
| `PageView` | every visit | demographic/region/placement breakdowns; site-visitor audiences |
| `ViewContent` | on landing | audience of people who saw the offer (great for retargeting) |
| `InitiateCheckout` | click any "Get the book" button | measures intent; optimize ads toward clickers |

> Buttons are tagged with `data-cta="buy"`; the pixel fires `InitiateCheckout`
> on click. Add `data-cta="buy"` to any future buy button to track it too.

## 4. Track the actual Purchase (important)
Checkout happens on **shop.readenough.com** (external), so the `Purchase` event
must fire **there**, not on this site:
- **Gumroad:** Settings → Advanced (Third-party analytics) → add the **same
  Pixel ID**. Gumroad fires `Purchase` on each sale.
- Then in Events Manager you'll see the full funnel: PageView → ViewContent →
  InitiateCheckout → Purchase.

## 5. Verify it's working
- Install the **Meta Pixel Helper** Chrome extension, open the live site, and
  confirm PageView/ViewContent fire and the ID matches.
- Or Events Manager → your Pixel → **Test Events** → enter the URL.

## 6. Using it in Ads Manager
- **Breakdowns:** in a campaign report, **Breakdown → By Delivery → Age / Gender
  / Region / Placement** to see who responds.
- **Custom Audience:** Audiences → Create → Custom → Website → "All visitors
  (180 days)" or "ViewContent". Retarget non-buyers.
- **Lookalike:** create a 1% Lookalike from your Purchasers (once you have
  ~100+) or from ViewContent to find new similar women.
- **Optimize:** once Purchase fires, set the ad set to optimize for
  **Conversions → Purchase** (use InitiateCheckout early while volume is low).

## Privacy note
A pixel tracks visitors. Add a short privacy/cookie notice to the site and
your store before scaling paid traffic (and consider Meta's Consent Mode /
a consent banner for EU traffic).
