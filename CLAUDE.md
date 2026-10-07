# CLAUDE.md — Uplayer / Booking Upsell Report

Build guidance for Claude Code sessions in this repo.

## What this is

The **Booking Upsell Report**: a free lead-magnet tool (Next.js app) where a hotel enters its website URL and gets an upsell score (A–F), a missed-revenue estimate, 3 branded sample guest pages, an ROI/payback section, and 15–20 package ideas. Product spec: [upsell-research/booking-upsell-report-brief.md](upsell-research/booking-upsell-report-brief.md). Evidence/rules: [upsell-research/market.md](upsell-research/market.md). Field test: [upsell-research/examples/thedolli-data-test.md](upsell-research/examples/thedolli-data-test.md).

## Plans & docs

Implementation plans live in [upsell-research/docs/](upsell-research/docs/). Read before building anything:

| Doc | Contents |
|---|---|
| [00-overview.md](upsell-research/docs/00-overview.md) | Goals, scope M1 vs M2, stack + rationale, hard rules |
| [01-architecture.md](upsell-research/docs/01-architecture.md) | Two-phase pipeline, latency budgets, worker API, failure matrix |
| [02-data-model.md](upsell-research/docs/02-data-model.md) | Drizzle schema, retention |
| [03-pipeline.md](upsell-research/docs/03-pipeline.md) | Data-point acquisition, fingerprints, LLM contracts, brand extraction |
| [04-scoring-roi.md](upsell-research/docs/04-scoring-roi.md) | Score rubric, capture interpolation, price bands, ROI formulas, golden values |
| [05-frontend.md](upsell-research/docs/05-frontend.md) | Routes, components, states, theming |
| [06-testing-strategy.md](upsell-research/docs/06-testing-strategy.md) | Fixtures, stubs, CI |
| [07-e2e-test-cases.md](upsell-research/docs/07-e2e-test-cases.md) | The 45 E2E cases — test titles mirror case IDs |
| [08-security-legal.md](upsell-research/docs/08-security-legal.md) | Injection defenses, crawl legality, claims discipline |
| [09-milestones.md](upsell-research/docs/09-milestones.md) | M0–M8 with exit criteria, env vars, DoD |
| [10-DESIGN.md](upsell-research/docs/10-DESIGN.md) | Design system (measured from uplayer.agency): tokens, type, components — **the UI source of truth** |
| [11-build-plan-m2-m8.md](upsell-research/docs/11-build-plan-m2-m8.md) | Task-level implementation plan for the remaining milestones, with current state |
| [12-deploy-runbook.md](upsell-research/docs/12-deploy-runbook.md) | Fly + Vercel + Inngest deployment steps and post-deploy smoke |

## Stack

Next.js 16 (App Router, RSC, Server Actions, TS strict) · shadcn/ui + Tailwind CSS v4 · Neon Postgres + Drizzle · Inngest · Fly.io worker (Hono + Playwright + Chromium: crawl, mobile checks, PDF) · Claude haiku-4-5 (extraction) / sonnet-5-5 (copy) · Tavily · Turnstile · Resend · Vercel Blob.

## Repo layout

```
web/               Next.js app (deploy: Vercel)
worker/            Hono + Playwright service (deploy: Fly.io)
packages/shared/   zod schemas, engine libs (score/roi/bands), fingerprints — shared by web & worker
fixtures/          E2E fixture hotel sites + stub servers
upsell-research/   research: brief, market.md, competitors/, examples/, docs/ (plans)
```

## Commands

```bash
pnpm install
pnpm dev                  # web (3000) — worker: pnpm --filter worker dev
pnpm fixtures:serve       # fixture sites + stub servers for tests
pnpm lint && pnpm typecheck
pnpm test                 # vitest unit + integration
pnpm e2e                  # Playwright (needs fixtures + stubs + inngest dev running)
pnpm db:generate          # drizzle-kit generate
pnpm db:migrate           # apply migrations
```

## Non-negotiable rules

1. **Claims discipline**: every number on a report is labeled "Estimate" or "Industry data, vendor reported". Never claim UpLayer results (none exist). Never write "guaranteed" outside the brief §9 build-process section.
2. **LLM never scores and never computes money.** Scores, grades, capture rates, revenue — deterministic engines in `packages/shared/src/engines/` only. LLM output is zod-validated facts/strings, rendered escaped (no `dangerouslySetInnerHTML` on LLM text).
3. **Crawl legally**: robots.txt, ≤25 pages, identified UA, no form submissions, no bookings. Report pages: noindex (meta + header), sample banner, removable.
4. **Token = access control**: report routes/endpoints are token-scoped; raw ids never leave the server.
5. **Latency budgets**: preview ≤60s p50 (two-phase pipeline, doc 01 §2). Don't add synchronous work to the preview path.
6. **Brief §15 constants** (tool name, email gate, $15k build price, leaderboard) live in `web/src/lib/constants.ts` — never hardcode them elsewhere.
7. Dolli learnings are product requirements, not trivia: price-banded spend, inclusion detection, engine-403 fallback, OTA search step, manual-payment-link signal, WebHotelier in fingerprints (doc 03).

## Conventions

- TypeScript strict; zod at every boundary (worker payloads, LLM outputs, forms).
- Server Actions for mutations; route handlers for polling/worker callbacks.
- shadcn/ui components only as UI primitives; custom wrappers in `web/src/components/report/`.
- Tests: `data-testid` on interactive elements; E2E titles mirror doc 07 case IDs (`"C11 — preview shows grade…"`);
- Keep `upsell-research/` untouched by app code except adding docs.
