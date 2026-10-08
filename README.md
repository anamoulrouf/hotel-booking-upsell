# Booking Upsell Report

A free lead-magnet tool for **UpLayer**'s personalized booking upsell experience: a hotelier enters
their website URL and gets an upsell score (A–F), a missed-revenue estimate, their booking-stack
fingerprint, a fix plan, sample guest pages in their own brand, and a live ROI editor — built to
convert them into a booked walkthrough call.

Product spec: [`upsell-research/booking-upsell-report-brief.md`](upsell-research/booking-upsell-report-brief.md).
Build plans: [`upsell-research/docs/`](upsell-research/docs/) (00–12; 12 is the deploy runbook).

## Stack

| Layer | Tech |
|---|---|
| Web | Next.js 16 (App Router, RSC, Server Actions) · Tailwind v4 · shadcn/ui |
| DB | Neon Postgres + Drizzle |
| Jobs | Inngest (6-step report pipeline + retention cron) |
| Crawl/PDF worker | Fly.io · Hono · Playwright · Chromium (HMAC-authed) |
| Extraction | Claude haiku-4-5 (facts, packages) · sonnet-5-5 (ideas) · zod at every boundary |
| Search | Tavily (OTA listing → star rating + nightly rate) |
| Storage/Mail | Vercel Blob (PDFs) · Resend (delivery + sales alerts) |

## Layout

```
web/               Next.js app (routes, server actions, pipeline, Inngest)
worker/            Fly.io worker: /crawl-core /crawl-ext /mobile-check /pdf
packages/shared/   zod contracts, deterministic engines (score/revenue/ROI), fingerprints
fixtures/          fixture hotel sites + stub servers for tests
upsell-research/   brief, market research, build docs, deploy runbook
```

## Non-negotiable rules

1. **Claims discipline** — every number is labeled "Estimate" or "Industry data, vendor reported".
   No UpLayer results are claimed.
2. **The LLM never scores and never computes money** — scores, grades, capture rates and revenue
   come from the deterministic engines in `packages/shared/src/engines/` only.
3. **Crawl legally** — robots.txt, ≤25 pages, identifying UA, no form submissions, no bookings.
   Reports are noindex, sample-labeled, removable (`/remove`), and expire after 30 days.
4. **Token = access control** — report routes are token-scoped; raw ids never leave the server.
5. **Preview ≤60s** — the two-phase pipeline; nothing slow on the preview path.

## Commands

```bash
pnpm install
pnpm dev            # web on :3000 (loads web/.env.local)
pnpm fixtures:serve # fixture hotel sites on :4311-4313 (needed by e2e)
pnpm lint && pnpm typecheck && pnpm test
pnpm --filter worker dev   # worker on :4310 (WORKER_URL=http://localhost:4310 to wire it in)
pnpm e2e            # Playwright: smoke + canary (fully local via FIXTURE_HOST_MAP)
pnpm db:generate && pnpm db:migrate
```

## Environment

See [`.env.example`](.env.example) and the deploy runbook
([`upsell-research/docs/12-deploy-runbook.md`](upsell-research/docs/12-deploy-runbook.md)).
Everything degrades honestly: no Anthropic key ⇒ heuristic extraction; no Tavily ⇒ baseline price
band; no Resend/Blob/CRM ⇒ unlock still works, delivery skips.

## Status

M0–M8 built (see [`upsell-research/docs/09-milestones.md`](upsell-research/docs/09-milestones.md)):
crawl → extraction → deterministic score → dashboard report → email-gated ROI editor → package
ideas → guest pages → PDF/email/CRM/scheduler → retention + funnel metrics. Remaining: production
deploy (operator auth) and the full 45-case E2E matrix.
