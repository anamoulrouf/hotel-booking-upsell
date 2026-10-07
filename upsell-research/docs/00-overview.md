# Booking Upsell Report — Build Overview

Status: implementation plan v1, 3 October 2026. Source spec: `../booking-upsell-report-brief.md` (the brief). Field validation: `../examples/thedolli-data-test.md`. Evidence base: `../market.md`.

## 1. What we are building

A free web tool and the main lead magnet for UpLayer. A hotel enters its website URL and within about a minute gets a report with four parts:

1. **Upsell score** — A–F grade out of 100, plus an estimate of missed pre-arrival revenue.
2. **Sample booking upsell pages** — 3 personal pages in the hotel's brand (family, couple, business).
3. **ROI and payback** — projected yearly revenue, payback month, 3-year UpLayer vs upsell-SaaS cost.
4. **Package ideas** — 15–20 packages suited to the hotel, with names, copy and price ranges.

Flow: entry + Cloudflare Turnstile → live progress list → **instant preview with no email** (score + missed revenue + the couple sample page) → unlock gate (work email, name, role, room count) → full report with shareable link and live-editable ROI → PDF by email → CTA to book a 15-minute walkthrough.

## 2. Personas

| User | Reach | Want |
|---|---|---|
| Hotel GM / owner / revenue manager | Landing page, blog, social | "How much am I missing, and what would it look like for my hotel?" |
| Prospect from outreach (M2 batch) | Pre-generated private link | Their hotel's report with zero form-filling |
| UpLayer sales (M2) | Internal batch mode | Score + qualify a lead list, `{{report_link}}` merge field |

## 3. Success metrics (brief §13) and how we compute them

All from the `events` table (`07` cases assert they fire):

| Metric | Target (60d) | Query shape |
|---|---|---|
| Reports started | 300 | count(events where type='report_started') |
| Preview → unlock | ≥ 30% | unlocked / preview_seen |
| Unlocked & qualified | ≥ 60% of unlocks | join leads → reports where star≥3 ∧ engine detected ∧ packages≥4 |
| Walkthrough calls booked | 5% of unlocks | `cta_clicked` → booking confirmation callback (M2: CRM) |
| Outreach with link vs without | measured split (M2) | batch-mode A/B |

## 4. Scope

**Milestone 1 (this plan, ~3.5 weeks)** — the full public flow: entry → crawl → score → preview → unlock → full report → PDF → email → CTA. Includes: all 10 data points from brief §4, fingerprints (engines incl. WebHotelier + upsell tools), price-banded spend, inclusion detection, manual-payment-link signal, share links, noindex, removal requests, the 45-case E2E suite.

**Milestone 2 (later)** — batch CSV mode (500/day), CRM sync, leaderboard/benchmark export, headless booking-flow probe (v2 flag), SMS, PostHog product analytics, Sentry, localization.

**Out of scope entirely**: becoming merchant of record (market.md §4.8 — hotel is MoR), any claim of UpLayer results (nothing exists yet), naming hotels publicly without opt-in.

## 5. Stack (decided)

| Layer | Choice | Why |
|---|---|---|
| App | Next.js 16, App Router, RSC, Server Actions, TS strict, Turbopack | Brief names Next on Vercel; 16 is current stable |
| UI | shadcn/ui latest + Tailwind CSS v4 + lucide-react | Fast, accessible, ownable code |
| DB | Neon Postgres + Drizzle ORM + drizzle-kit | Serverless fits Vercel; branching gives per-CI databases |
| Jobs | Inngest Cloud (stepped functions, retries, throttle) | Durable multi-step pipeline with progress checkpointing |
| Worker | Fly.io (or Railway) container: Hono + Playwright + Chromium | Crawl, mobile checks and PDF can't run on Vercel serverless; one browser serves crawl AND pdf |
| LLM | Claude haiku-4-5 (extraction) · sonnet-5-5 (copy, ideas) via Anthropic API, tool-use JSON | Brief specifies Claude; split models per brief §11 |
| Search | Tavily API | OTA listing lookup for stars/ratings/price (Dolli learning 4) |
| Bot check | Cloudflare Turnstile (invisible) | Brief §3 |
| Email | Resend | PDF delivery + sales lead alert |
| Files | Vercel Blob | PDF storage |
| Analytics | `events` table now; PostHog M2 | Brief §11 funnel events |

## 6. Repo layout

```
Uplayer/
├── CLAUDE.md
├── pnpm-workspace.yaml
├── package.json               # scripts: dev, lint, typecheck, test, e2e
├── .env.example
├── web/                       # Next.js 16 app (Vercel)
│   └── src/{app,components,lib,server}
├── worker/                    # Hono + Playwright (Fly.io) — crawl, mobile, pdf
├── packages/shared/           # zod schemas, engine libs (score, roi, bands), fingerprints
├── fixtures/hotel-site/       # E2E fixture hotels A/B/C (see 06)
├── docs/  → this folder (plans); research lives in ../
└── upsell-research/           # brief, market.md, competitors/, examples/ (untouched)
```

## 7. Assumptions / inputs needed from UpLayer

- Brand tokens (logo, palette, type, tone) for the landing page and fallback report theme — placeholders until provided.
- Tool name constant: "Booking Upsell Report" until brief §15 is decided.
- USD display everywhere in M1; default build price USD 15,000; email gate after preview; no public leaderboard in M1 (brief §15 defaults).
- Politeness default 750 ms/page (knob `CRAWL_DELAY_MS`); brief's "polite rate" honored via identified UA + robots.txt + per-host sequencing.

## 8. Hard rules that survive every milestone

1. Every number on a report is labeled **estimate** or **industry data, vendor reported**. No UpLayer results claims.
2. The LLM never assigns scores and never computes money — deterministic engines only (see 08 §2).
3. Crawl: public pages only, robots.txt respected, ≤25 pages, no logins, no form submissions, no bookings, identified UA.
4. Report pages: noindex, private, sample banner, removable on request.
