# Architecture

Companion to `00-overview.md`. Implements brief §3 (flow), §11 (tech), with the two-phase pipeline that resolves the 60-second preview budget.

## 1. Component diagram

```
Browser ── Vercel (Next.js 16) ──┬── Neon Postgres (Drizzle)
   │ Turnstile widget            ├── Inngest Cloud ──► report/generate (stepped fn)
   │                             └── Vercel Blob (PDFs)     ├── Claude API (haiku / sonnet)
   ▼                                                       ├── Tavily (search)
Worker (Fly.io · Hono · Playwright) ◄── HMAC-signed HTTP ──┘
  POST /crawl-core · /crawl-ext · /mobile-check · /pdf
Resend (PDF email, sales alert)        events table (funnel)
```

- **web** renders UI, runs Server Actions, persists via Drizzle, sends Inngest events, verifies Turnstile.
- **inngest** executes `report/generate` as discrete checkpointed steps; each step writes its status/duration into `reports.steps` jsonb. Triggered via `INNGEST_EVENT_KEY` from `web/src/server/inngest.ts`; handler mounted at `web/src/app/api/inngest/route.ts` with `INNGEST_SIGNING_KEY`.
- **worker** is a stateless HTTP service holding a Playwright/Chromium pool. Every request is HMAC-signed (`WORKER_SHARED_SECRET`), payload validated against `packages/shared` zod schemas. One browser serves crawling and PDF rendering.

## 2. Two-phase report pipeline (the latency decision)

The brief wants preview ≤60s and politeness. 25 pages at ~1s render + delay ≈ 80s of crawl alone — impossible inside 60s. So the crawl is phased:

- **Phase A → preview**: `crawl-core` (homepage, booking page, ≤8 priority pages: rooms / dining / spa / experiences / faq / about / contact / offers), then parallel `parse-hotel-facts` + `detect-tech` + `search-ota`, then `extract-packages`, `compute-score`, couple-page copy → `status = preview_ready` → progress UI auto-redirects.
- **Phase B → full report**: `crawl-ext` (to the 25-page cap), full 15–20 ideas, family + business profiles, `mobile-quality`. Runs during/after preview. Unlock before B finishes shows a skeleton + "Finishing your report…" and reveals when done (unlock Server Action returns after `report.ready` gate with timeout).

Priority ordering for page discovery (BFS from homepage, same-origin only):
`/rooms|suites|accommodation/ > /dining|restaurant/ > /spa|wellness/ > /experiences|activities|tours/ > /offers|packages/ > /faq|faqs/ > /about|story/ > /contact/` — deduped, stripped of query strings except pagination, `/wp-admin/`-style paths never fetched.

### Latency budget

| Phase | p50 | p95 | Timeout → fallback |
|---|---|---|---|
| create + cache check | ≤2s | — | — (cache hit ⇒ instant ready) |
| crawl-core (≤10 pages) | 14–20s | 35s | 60s ⇒ use partial, mark `degraded` |
| facts ∥ tech ∥ search | ≤10s | 20s | each independent: search fail ⇒ $95 band |
| extract-packages | ≤12s | 25s | 40s×3 ⇒ generic list fallback |
| score + couple copy | ≤10s | 18s | copy fail ⇒ templated copy |
| **preview total** | **≤60s** | **≤90s** | |
| crawl-ext + ideas + 2 profiles + mobile | +30–50s | +60s | any failure degrades only its section |

### Step timeout / retry (Inngest)

| Step | Timeout | Retries | Backoff |
|---|---|---|---|
| crawl-core / crawl-ext | 60s | 2 | fixed 5s |
| parse-hotel-facts (LLM) | 40s | 3 | exp (2s base) |
| search-ota | 15s | 2 | exp |
| extract-packages (LLM) | 40s | 3 | exp |
| generate-ideas / guest copy (LLM) | 40s | 3 | exp |
| mobile-quality | 30s | 1 | — |
| compute-score | in-process | 0 | — (pure fn; zod-validated inputs) |
| render-pdf | 90s | 2 | fixed 10s |
| send-email | 15s | 3 | exp |

## 3. Worker API

All endpoints: `POST`, HMAC-SHA256 signature header `X-UpLayer-Signature` over `timestamp + body`, timestamp window ±5 min, zod-validated body.

| Endpoint | Input | Output | Notes |
|---|---|---|---|
| `/crawl-core` | `{reportId, domain, priorityPaths}` | `{pages: [{url, status, text, title, kind, loadMs}], robots, engineLinks, blockReason?}` | Politeness: sequential per host, `CRAWL_DELAY_MS` (default 750), UA `UpLayerReportBot/1.0 (+https://…/bot)`, robots.txt respected, ≤25 pages total, same-origin subresources only, no cookie jar, never submits forms |
| `/crawl-ext` | `{reportId, discoveredPaths}` | same, incremental | fills to the 25 cap |
| `/mobile-check` | `{urls: [home, booking]}` | `{perUrl: {horizontalOverflow, tapTargetsOk, loadMs, screenshotKey?}}` | 390×844 viewport; any hard fail ⇒ that URL skipped (score area "not scored") |
| `/pdf` | `{url, storageKey}` | `{blobKey, page_count}` | loads report `?print=1`, waits `networkidle` + `document.fonts.ready`, prints via Chromium `page.pdf()` (5–7 pages via print CSS) |

Worker health: `GET /healthz`. Global concurrency 2 crawls (Inngest throttle + worker semaphore); per-host single flight. Sensitive-target knob: set `CRAWL_DELAY_MS=2000` per crawl via payload flag.

## 4. Progress contract

`GET /api/reports/[token]/status` (token-scoped — the unguessable token is the access control):

```json
{ "status": "generating", "steps": {"crawl_core": {"state":"done","ms":18234},
  "facts": {"state":"done","ms":4120}, "search": {"state":"running"},
  "packages": {"state":"pending"}, "score": {"state":"pending"}},
  "phase": "A", "degraded": ["search"] }
```

Progress screen polls every 2s while `status ∉ {preview_ready, ready, failed}`; on `preview_ready` it redirects to `/report/[token]`.

## 5. Failure matrix

| Failure | Detection | Behavior |
|---|---|---|
| DNS dead / unreachable site | crawl-core error | status=failed, error screen + Retry; later steps skipped (case 6) |
| robots.txt blocks all | robots parse | failed with "we're not allowed to read your site" copy |
| Engine page 403s | HTTP status | fingerprint from landing page only; flow item "Could not check" (case 41) |
| No JSON-LD / sparse site | facts step | Haiku fallback; rooms asked at unlock (case 40) |
| LLM timeout / garbage | zod validation | retry ×3 → generic package list labeled "generic list — we couldn't read specific packages" (case 42) |
| OTA search fail | Tavily error | price band defaults $95 row + estimate label; score unaffected (case 43) |
| Mobile check fail | worker result | area skipped, total "X/90" (case 8) |
| PDF render fail | worker error | banner "PDF will arrive shortly", report usable, email retry path (case 35) |
| Unlock replay | unique (reportId) lead | idempotent: 1 lead, 1 email (case 20) |

## 6. Caching

30-day per-domain reuse (brief §11): new request for a cached domain clones the prior report (fresh token, `cachedFromId`), jumps to ready. Evicted by `/remove`. Fixture assertion: zero worker requests on cache hit (case 4).

## 7. Observability

- Inngest dashboard: function runs, step retries (first stop for debugging).
- `reports.steps` jsonb: per-step state + duration — powers the progress UI and a simple latency view later.
- `events` table: funnel; also `report_failed` with reason.
- Vercel logs + Fly logs; Sentry in M2.
- No PII in logs (leads emails never logged).

## 8. Environments

| Env | App | DB | Inngest | Worker |
|---|---|---|---|---|
| Local | `pnpm dev` | Neon branch or docker postgres | Inngest Dev Server | `pnpm --filter worker dev` (localhost) |
| CI | build + lint + tests | ephemeral Neon branch | dev server | worker built + run in docker |
| Preview (Vercel) | per-PR | Neon branch per-PR | Inngest env per branch | staging worker on Fly |
| Prod | Vercel | Neon main | Inngest Cloud | Fly machine (1 shared vCPU) |

Env vars: see `09-milestones.md` §5 / `.env.example`.
