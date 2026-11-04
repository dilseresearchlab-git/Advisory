# Meridian Research & Advisory — Website

Premium research/advisory marketing site. Next.js 16 (App Router), JavaScript, Tailwind CSS 4. No backend, database, auth or payments. "Meridian" is a placeholder name.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to edit

| What | File |
| --- | --- |
| Brand name, tagline, contact details, nav, regulatory status line | `src/data/site.js` |
| Packages, INR prices, comparison table, FAQs | `src/data/pricing.js` |
| Service tracks | `src/data/services.js` |
| Illustrative research content | `src/data/research.js` |
| Learning content, glossary, ratios | `src/data/learning.js` |
| Logo mark | `src/components/Logo.jsx` |
| Colour palette & fonts | `src/app/globals.css` (`@theme`) |
| Calculator maths and statutory charge rates | `src/lib/calculations.js` |
| Legal page text | `src/app/{disclosures,privacy,terms}/page.js` |

## Regulatory guardrails

- The site makes no claim of SEBI registration and shows no registration number.
- Pricing and service text are drafts, labelled as such, and need business + regulatory approval.
- No guaranteed returns, performance records or testimonials. All research is fictional and labelled illustrative.
- Legal pages are template text and must be reviewed by counsel.
- Brokerage charge rates are indicative defaults; verify before relying on them.

## Notes

- The contact form opens the visitor's email app (`mailto:`) because there is no backend.
- Fonts (Inter, Newsreader) load via `next/font/google` at build time.
