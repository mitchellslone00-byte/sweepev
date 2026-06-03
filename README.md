# SweepEV

Sweepstakes casino review and ranking site at **sweepev.com**.

Built with Next.js 15 (App Router) + TypeScript + Tailwind. Site data lives in
[`data/sites.json`](data/sites.json) — edit that file to add, remove, or update
sites. No database required.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/page.tsx` — homepage with the ranked list
- `app/sites/[slug]/page.tsx` — individual review pages (statically generated)
- `app/guides/page.tsx` — long-form guide content
- `app/go/[slug]/route.ts` — click-tracking redirect to affiliate URLs
- `data/sites.json` — site list (edit this to update content)
- `lib/sites.ts` — typed loader; sorts by rating descending
- `lib/site-config.ts` — brand name, domain, tagline

## Adding a new site

Edit `data/sites.json`, append a new object, save. The homepage, review page,
sitemap, and `/go/<slug>` redirect all pick it up automatically.

## Affiliate links

Outbound buttons hit `/go/<slug>`, which 302-redirects to the `affiliateUrl`
field in `data/sites.json`. Replace those URLs with your own affiliate links
once you have them. The route sets `Cache-Control: no-store` and a noindex
header so search engines don't follow them.

## Deploy to Netlify

1. Push this folder to a GitHub repo.
2. New site → Import from Git → select the repo.
3. Netlify auto-detects Next.js and uses the included `netlify.toml`.
4. Add the custom domain `sweepev.com` (and `www`) in Netlify domain settings.

To deploy to Vercel instead, just `vercel` from this folder — no config needed.

## Editing the brand

`lib/site-config.ts` controls the site name, domain, description, and tagline.
The favicon/logo currently uses an inline "EV" badge in `components/Header.tsx`
— swap to an image when you have a logo.

## Disclosures

The footer includes an FTC-style affiliate disclosure and a 1-800-GAMBLER
responsible-gaming line. Keep both.
