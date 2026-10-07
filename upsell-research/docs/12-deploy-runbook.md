# Deployment Runbook (M5)

Order: Neon → Fly worker → Vercel app → Inngest → smoke. CLIs are not installed by default;
auth steps are interactive (browser) so they run on the operator's machine.

## 0. Prerequisites

- Neon project created (main branch) — copy `DATABASE_URL`
- Fly + Vercel accounts
- Inngest Cloud account (app key + signing key)
- Resend account (domain verified) — M7, optional at first deploy

## 1. Worker (Fly.io)

```bash
curl -L https://fly.io/install.sh | sh      # or brew install flyctl
fly auth login
fly apps create uplayer-worker               # or let fly deploy generate a name
fly secrets set WORKER_SHARED_SECRET="$(openssl rand -hex 32)"
fly secrets set CRAWL_DELAY_MS=750
fly deploy                                    # from the repo root — Dockerfile builds
curl https://uplayer-worker.fly.dev/healthz   # → {"ok":true}
```

Record the shared secret + URL (`https://uplayer-worker.fly.dev`) — the web app needs both as
`WORKER_SHARED_SECRET` / `WORKER_URL`.

## 2. Web app (Vercel)

```bash
npm i -g vercel
vercel login
vercel link
```

Set env vars (Production + Preview) — the full list mirrors `.env.example` / docs 09 §5:

| Var | Notes |
|---|---|
| `DATABASE_URL` | Neon main, pooled connection |
| `INNGEST_EVENT_KEY` `INNGEST_SIGNING_KEY` | Inngest Cloud |
| `ANTHROPIC_API_KEY` | extraction + generation |
| `TAVILY_API_KEY` | OTA listing search |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` `TURNSTILE_SECRET` | Cloudflare Turnstile |
| `WORKER_URL` `WORKER_SHARED_SECRET` | from step 1 |
| `APP_URL` | canonical origin (used in emails + share links) |
| `CRAWL_DELAY_MS` | 750 |

```bash
vercel deploy --prod
```

## 3. Inngest Cloud

1. Create the app in Inngest Cloud; enable the app's key + signing key (set above).
2. Register the function URL: `https://<app>.vercel.app/api/inngest` (Inngest UI → Apps → Add).
3. Verify "report-generate" appears with no build errors.

## 4. Post-deploy smoke

1. Submit a real hotel site (the Dolli field test: thedolli.com).
2. Progress completes ≤60s (docs/09 DoD) and the report renders with score + funnel.
3. `reports.steps` shows no `failed` steps; `events` has `preview_seen`.
4. CTA click writes `cta_clicked`.
5. Mobile-check area scored (`scoreOutOf` = 100) once the worker is reachable.

## 5. Known gaps at first deploy

- PDF / email / unlock (M6–M7) — CTA is a mailto, ROI editor pending.
- Brand extraction + guest pages (M6).
- Rate limiting via Turnstile only; per-IP limit is DB-backed (already in submit action).
