# Implementation Plan — M2 → M8

Task-level breakdown of the remaining milestones in [09-milestones.md](09-milestones.md),
grounded in what already ships. Order: M2 → M3 → M5 → M6 → M7 → M8 (M4 engines are
largely done; leftovers fold into M2/M6).

## Lead-gen thread (added 7 Oct 2026)

Lead generation is the primary goal; the roadmap is sequenced around the funnel:

```
report started → preview_seen → cta_clicked (proxy, live today) → unlock (email captured) → call_booked (real metric, M7)
```

Targets (brief §13): 300 reports in 60 days · ≥30% preview→unlock · ≥5% unlock→walkthrough.

- **Live now:** verdict band after the KPIs + sticky mid-page bar + closing CTA, all firing
  `cta_clicked` with placement via `/api/reports/[token]/cta-click`
- **M6 — unlock lite** (pulled forward from M7): email gate starts capturing leads ~a week earlier.
  No migration — `leads` (unique `reportId`) and `reports.unlocked` already exist
- **M7 — scheduler:** CTA's mailto becomes a booking link; `call_booked` eventType (migration);
  CRM sync via `leads.crm_synced_at`
- **M8 — funnel report:** the five-stage funnel vs §13 targets
- Recorded decision: pulling unlock into M5 would capture leads ~a week earlier still, but expands
  the deploy-slice milestone; kept in M6 (CEO call, 7 Oct 2026)

## Where we are (7 Oct 2026)

| Milestone | State |
|---|---|
| M0 scaffold | ✅ |
| M1 foundation | ✅ landing, submit action, Inngest, status polling, progress page, DB events |
| M1.5 preview slice | ✅ fetch-crawl ≤6 pages, JSON-LD facts, fingerprints, heuristic packages, score + missed revenue, report UI (light doc layout) |
| M4 engines | ~90% — score/grade/capture/bands/revenue + golden tests; `mobile: null` input remains until M2 |

Design system applied app-wide ([10-DESIGN.md](10-DESIGN.md)); report page simplified to the
document layout. Suite green: lint, typecheck, 13 unit tests, smoke E2E A1.

---

## M2 — Real crawl via worker (2–3d)

The biggest unknown; de-risk first. Playwright moves out of the web app into the Fly worker.

| # | Task | Files | Notes |
|---|---|---|---|
| 2.1 | Fixture content: rich-hotel (JSON-LD `Hotel`, 6+ priced packages, FAQ page, `/engine/rates` 403 on 2nd hit — already in server.ts), sparse-hotel (JS-rendered, no JSON-LD), canary-hotel (injection strings) | `fixtures/*/index.html`, `fixtures/dining.html`, … | Content is the test suite's ground truth (docs 06, 07) |
| 2.2 | HMAC middleware (SHA-256 over `timestamp + body`, ±5 min window) on every worker route | `worker/src/index.ts` | docs 01 §3; reject without `WORKER_SHARED_SECRET` |
| 2.3 | `/crawl-core`: robots.txt parse → BFS priority pages ≤25, `CRAWL_DELAY_MS` politeness, identified UA, rendered text + load times, no forms/logins/bookings | `worker/src/` (new modules: `crawl.ts`, `robots.ts`, `hmac.ts`) | Return zod-validated crawl JSON |
| 2.4 | `/mobile-check`: render booking page at 390px, layout + load checks → `MobileInput` for the score | worker | Un-`null` the score's mobile area; `scoreOutOf` → 100 |
| 2.5 | Web side: split the M1 inline pipeline into Inngest `step.run()` granularity calling the worker; keep the M1 fetch-crawler as fallback with `degraded=true` (column exists) | `web/src/server/pipeline.ts`, `functions.ts`, `worker/client.ts` (new) | Engine-403 fallback: retry once → mark step `skipped`, score degrades honestly (Dolli learning 3) |
| 2.6 | CI: fixtures + stub servers boot, crawl JSON for fixture A asserted | CI workflow, `pnpm fixtures:serve` | Exit: **H37, H38** |

**Exit:** crawl JSON for fixture A in CI; smoke E2E green; mobile area scored.

## M3 — Extraction (2–3d)

| # | Task | Files | Notes |
|---|---|---|---|
| 3.1 | LLM facts fallback (haiku-4-5): when JSON-LD yields nothing, LLM reads rendered text → zod `Facts` contract; `LLM_BASE_URL` stub in tests | `web/src/server/extraction/facts.ts` (new) | Never scores, never computes money |
| 3.2 | Tavily OTA search: star rating + nightly rate → `spendPerBooking` price bands; `SEARCH_BASE_URL` stub | `extraction/search.ts` (new) | Feeds the funnel's $ band (brief §5) |
| 3.3 | Packages extraction (haiku): name, price, **inclusion detection** ("breakfast included"), category; heuristic scan stays as fallback | `extraction/packages.ts` (new), `observe.ts` stays | Dolli learnings 1–2 |
| 3.4 | Injection defense: canary fixture strings must never surface as report text; all LLM output zod-validated + rendered escaped (already `react/no-danger: error`) | tests vs fixture C | docs 08 §2; exit **I40, I41, I43** |

**Exit:** 10/10 data points on fixture A.

## M5 — Thin vertical slice deployed (1–2d)

| # | Task | Notes |
|---|---|---|
| 5.1 | Fly.io deploy for worker: Dockerfile (Chromium + deps), healthz, secrets | docs 01 §4 |
| 5.2 | Vercel staging for web: env vars from 09 §5, Inngest live keys | |
| 5.3 | Latency check: preview p50 ≤60s / p95 ≤90s on fixtures + the Dolli | Exit: **C11, B7–B9** on staging |

## M6 — Full report UI (3–4d)

| # | Task | Files | Notes |
|---|---|---|---|
| 6.0 | **Unlock lite:** `unlockReport` Server Action (zod boundary; idempotent — insert `leads`, set `reports.unlocked`, write `unlocked` event); inline form gating the ROI editor: work email, name, role, room count **prefilled from `hotels.roomCount`**; consent notice + privacy link (brief §12) | `web/src/server/actions/unlock.ts` (new), report page | No migration — schema already has `leads` + `unlocked` |
| 6.1 | 3 sample guest pages: matcher (family/couple/business) + renderer in hotel brand; inactive pay buttons; sample banner | `web/src/components/report/guest-*.tsx` (new) | Product engine reuse (brief §6) |
| 6.2 | Brand extraction: logo/colors/fonts/hero from rendered page → `.hotel-theme` CSS vars (hook exists in globals.css); UpLayer neutral fallback | `web/src/server/brand.ts` (new) | |
| 6.3 | ROI editor: live recompute client-side via `computeRoi` (shared, deterministic), persist on unlock inputs; low/mid/high scenarios | `report/[token]/roi-editor.tsx` (new) | §15 constants from `lib/constants.ts` only |
| 6.4 | Package ideas: sonnet-5-5 copy → zod → grouped by category; never contradicts the site (inclusion-aware); "suggested" label | `extraction/ideas.ts`, report section | Exit: **E21–E28, F29–F32, B10** |

## M7 — PDF · email · scheduler (2d; unlock moved to M6)

| # | Task | Notes |
|---|---|---|
| 7.1 | Worker `/pdf`: report `?print=1` print CSS → headless Chrome → Vercel Blob | fonts already self-hosted |
| 7.2 | Resend: PDF email + sales alert with grade + link; CRM post per unlock (`leads.crm_synced_at`) | **Blocker: CEO must flip §15 constants first** (tool name, email gate, build price, leaderboard, domain) |
| 7.3 | Scheduler: `WALKTHROUGH_EMAIL` mailto → booking-URL constant; new `call_booked` eventType (migration); CTA band flips to booking link once unlocked | the real conversion metric |
| | | Exit: **G33–G35** (unlock cases D16–D20 move to M6) |

## M8 — Hardening (2d)

| # | Task | Notes |
|---|---|---|
| 8.1 | noindex + banner audit on every report surface (report/progress already done) | |
| 8.2 | "Estimate" / "vendor reported" label sweep — every number | claims discipline, docs 08 §4 |
| 8.3 | Retention cron (30-day), per-IP rate limit, `/remove` cache-eviction test | |
| 8.4 | Funnel metrics view: started → preview_seen → cta_clicked → unlocked → call_booked vs §13 targets | |
| 8.5 | Injection canary E2E, full 45-case suite green in CI | Exit: **H36–H39, I42, I44, I45** |

## Sequencing & risks

- **M2 before M3** — extraction consumes the worker's crawl JSON; fixture content (2.1) unblocks both.
- **M1 heuristic pipeline stays as fallback** through M3 (schema has `degraded` for this).
- **Dolli learnings as acceptance checks**, not trivia: price-banded spend → 3.2; inclusion detection → 3.3; engine-403 fallback → 2.5; OTA search step → 3.2; manual-payment-link → done (fingerprints); WebHotelier in fingerprints → done (`fingerprints.ts` learning 6).
- **§15 CEO decisions block M7 only** — everything through M6 can build with defaults.
- Batch mode (M2′) stays out of scope until the single-report path is live.
