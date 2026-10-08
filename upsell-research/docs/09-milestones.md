# Milestones

Each milestone ends green: `pnpm lint && pnpm typecheck && pnpm test` (+ E2E subset where noted). Order de-risks: crawler + extraction first (biggest unknown), thin slice early.

| # | Milestone | Deliverables | Exit criteria (E2E cases) | Effort |
|---|---|---|---|---|
| M0 | **Scaffold** ✅ | pnpm workspace, web/worker/shared/fixtures, configs, env templates, first migration, CI skeleton | install/lint/typecheck/unit green; both apps boot; migration applies | 0.5d |
| M1 | Foundation | shadcn theme + landing page, Drizzle tables, Inngest wiring, Turnstile verify, submit Server Action, DB events | landing → submit creates report row via Inngest; A1–A5 | 1d |
| M2 | Crawler spike ✅ | worker `/crawl-core` `/crawl-ext` `/mobile-check` against fixtures; robots/cap/politeness/log; HMAC auth | crawl JSON for fixture A in CI; H37, H38 | 2–3d |
| M3 | Extraction ✅ | facts (JSON-LD + Haiku), fingerprints (engines/upsell/PMS/manual-payment-link), Tavily search, packages extraction incl. inclusion detection | 10/10 data points on fixture A; I40, I41, I43 | 2–3d |
| M4 | Engines ✅ | score, capture, price bands, ROI pure libs + golden unit tests; zod contracts wired to steps | engines 100% branch coverage; doc 04 §4 goldens | 1–2d |
| M5 | Thin vertical slice 🔶 code ready, deploy pending operator auth | entry → progress → preview deployed (Vercel + Fly staging); status polling; fallbacks wired | C11, B7–B9 pass against staging; preview ≤60s p50 on fixtures | 1–2d |
| M6 | Full report UI ✅ | **unlock lite (email gate → `leads`, no migration)**, findings, ROI editor (live + persist, gated on unlock), package ideas, 3 guest pages, theming + fallback, Phase-B skeletons | E21–E28, F29–F32, B10, D16–D20 | 3–4d |
| M7 | PDF · email · scheduler | worker `/pdf` (print CSS, fonts), Blob storage, Resend sends, sales alert, CRM sync, booking-link scheduler + `call_booked` | G33–G35 | 2d |
| M8 | Legal polish + hardening ✅ | noindex everywhere, banners, labels/`EstimateLabel`, `/remove` + cache eviction, injection canary, retention cron, funnel metrics view (§13) | H36–H39, I42, I44, I45; **full 45-case suite green in CI** | 2d |
| M2′ (later) | Batch mode | CSV ingest UI (internal), fan-out, qualification columns, `{{report_link}}` export, CRM sync, leaderboard aggregates | batch cases (new doc then) | +1–2wk |

## 5. Env vars (single list; `.env.example` mirrors it)

```
DATABASE_URL=                # Neon
INNGEST_EVENT_KEY=  INNGEST_SIGNING_KEY=
ANTHROPIC_API_KEY=
TAVILY_API_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=  TURNSTILE_SECRET=
RESEND_API_KEY=  RESEND_BASE_URL=  SALES_ALERT_EMAIL=  EMAIL_FROM=
WORKER_URL=  WORKER_SHARED_SECRET=
BLOB_READ_WRITE_TOKEN=
APP_URL=                     # canonical origin, used in emails + PDF URLs
CRAWL_DELAY_MS=750
METRICS_TOKEN=              # guards /api/metrics (M8)
LLM_BASE_URL=  SEARCH_BASE_URL=   # unset in prod; set to stubs in test
```

## 6. Definition of done for M1 scope

- All 45 E2E cases green in CI on the main branch.
- Preview p50 ≤60s / p95 ≤90s measured on fixtures and one real test hotel.
- One end-to-end manual run against a real hotel site (e.g. the Dolli) producing a sane report, PDF received, labels present.
- Deployed to production domain; Turnstile live keys; Resend domain authenticated (SPF/DKIM).
- Brief §15 constants isolated in `web/src/lib/constants.ts` for the CEO's flips (gate, build price, tool name).
