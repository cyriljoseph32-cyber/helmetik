# Helmetik — Automated Helmet Cleaning (Koh Samui)

Premium, mobile-first, tri-lingual (EN / TH / FR) marketing + service site for
**Helmetik** — automated helmet cleaning (UV-C disinfection + 3D foam) on Koh
Samui, Thailand.

Built with **Next.js (App Router) · TypeScript (strict) · Tailwind CSS v4**,
deployable to Vercel.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /en)
```

```bash
npm run build && npm run start   # production
npm run typecheck                # tsc --noEmit
npm run lint                     # eslint
```

## Deploy (Vercel)

```bash
npx vercel        # preview
npx vercel --prod # production
```

Set `NEXT_PUBLIC_SITE_URL` to the production domain (used for canonical / OG /
sitemap).

---

## Architecture

- **i18n** — locale-segmented routing `/[locale]/…` (`en` default, `th`, `fr`)
  via `src/middleware.ts`. A locale is only ever linked when its dictionary is
  complete. Per-locale metadata, canonicals and `hreflang` via `src/lib/seo.ts`.
- **Content is the single source of truth** and lives in `src/content/`
  (typed, editable without touching components):
  - `site.ts` — entity, phone, WhatsApp, email, hours, map centre
  - `pricing.ts` — the ONE price grid (Standard 100 THB / 5 min · Premium 150 THB / 8 min)
  - `locations.ts` — machine list (map markers + schema.org `Place`)
  - `cycle.ts`, `faq.ts` — cycle steps, compatibility, FAQ ids
  - `src/i18n/dictionaries/{en,th,fr}.ts` — all copy, hand-written per language
- **Forms** (`Contact`, `Become a host`) — typed validation (`zod`), honeypot
  and light rate-limiting in `src/app/api/submit/route.ts`. Primary channel is a
  prefilled **WhatsApp** deep link built from the submitted fields (works today).
  Email delivery via Resend is wired but **dormant** until `RESEND_API_KEY` is set.
- **Map** — Leaflet + OpenStreetMap tiles, lazy-loaded client-only
  (`src/components/map/`). No API key, markers synced to the list, "Nearest to
  me" via geolocation with explicit consent + fallback.
- **SEO** — `sitemap.ts`, `robots.ts`, `manifest.ts`, dynamic favicon
  (`icon.tsx`), Apple icon, dynamic OG image (`opengraph-image.tsx`),
  schema.org (`AutomotiveBusiness` / `Service` / `Offer` / `FAQPage` / `Place`).

## Environment variables

See `.env.example`. All are optional for the site to run; forms fall back to
WhatsApp when email isn't configured.

| Var | Purpose |
|-----|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical / OG / sitemap base URL |
| `RESEND_API_KEY` | Enables email delivery of form submissions (optional) |
| `CONTACT_INBOX` | Destination address for form emails (default `info@helmetik.com`) |

---

## ⚠️ Needs real client data (editorial placeholders in the code)

None of the below are invented — each is a clearly-marked placeholder ready to fill:

1. **Machine locations** — `src/content/locations.ts` ships one demo entry
   flagged "Sample — to be replaced". Add real venues (host name, area, exact
   lat/lng, `mapsPlaceUrl`, `googleBusinessUrl`) and set `isDemo: false`.
2. **Phone number** — confirm `+66 65 395 9083` in `src/content/site.ts`.
3. **Legal entity** — replace the trading-name placeholder in `site.ts`
   (`legalEntity`) and set `confirmed: true`.
4. **UV / germ claim proof** — a lab test / manufacturer sheet is required before
   any "% of germs" figure; the FAQ + How-It-Works currently state only the
   defensible "UV-C disinfection cycle + 3D foam treatment".
5. **HD photography** — the real monkey mascot logo is now integrated
   (`public/brand/helmetik-mark.png`, extracted from the official logo and used
   site-wide via `src/components/brand/BrandMark.tsx`); still needs real
   machine/helmet/foam photos for the hero and editorial slots. A crisp
   vector/SVG of the logo would also be ideal for future scaling.
6. **Social accounts** — add URLs in `site.ts` (`social`); footer slots stay
   hidden until then.
7. **Accepted payment methods** — confirm and flip `paymentMethods.confirmed`
   in `pricing.ts`.
8. **Google Business Profile** — create one per machine and link it in
   `locations.ts` (`googleBusinessUrl`) — the #1 local-SEO lever for this service.
