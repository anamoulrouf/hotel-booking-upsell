# Frontend

Next.js 16 App Router · shadcn/ui (new-york) · Tailwind v4 (CSS-first config, `@theme` tokens) · lucide-react. WCAG AA.

> **Visual system:** [10-DESIGN.md](./10-DESIGN.md) is the design source of truth (measured from uplayer.agency). Tokens live in `web/src/app/globals.css` — sharp 0px radius on all interactive components, amber `#FF9E00` CTA discipline, `#020617` color-blocked bands, Stack Sans Notch/Headline/Text, layered oklab micro-shadows, dotted-grid + blurred-blue atmosphere. Never round corners; negative tracking only at display scale.

## 1. Routes

| Route | Type | Purpose |
|---|---|---|
| `/` | static + client form | Landing: hero, URL input, invisible Turnstile, how-it-works (4 steps), sample-report teaser, FAQ accordion |
| `/report/[token]/progress` | dynamic | Live 5-item checklist; polls `/api/reports/[token]/status` every 2s; auto-redirect on `preview_ready`; error + Retry on `failed` |
| `/report/[token]` | dynamic, noindex | Preview (score + missed range + couple page embed) **or** full report when unlocked. Layout per brief §9: ① header (name, photo, grade badge, missed range) ② "What we found" (6 areas: finding + fix) ③ "Your guests, three ways" ④ "Your numbers" (live ROI) ⑤ "Packages you could sell" (grouped) ⑥ "How UpLayer would build this" (4 steps, guarantee, 21-day timeline) ⑦ CTA walkthrough ⑧ footer (methods & sources, labels, removal link) |
| `/report/[token]/guest/[profile]` | dynamic, noindex | Standalone sample page, phone frame on desktop, full-bleed mobile; banner; disabled buttons. 404 pre-unlock for family/business |
| `/report/[token]?print=1` | print CSS variant | 5–7 pages: hide nav/CTA, keep banner + labels; worker renders this |
| `/remove` | static + action | Token entry → flag + cache eviction + confirmation |
| `/api/reports/[token]/status` | route handler | polling JSON (01 §4) |
| `/api/inngest` | route handler | Inngest handler |

Server Actions: `submitUrl` (Turnstile verify + rate limit + create/clone), `unlockReport` (validate + lead + trigger PDF), `persistRoiInputs` (debounced), `requestRemoval`.

## 2. Component inventory (shadcn)

button · input · form (react-hook-form + zod) · card · badge (grade A–F colors) · dialog (unlock) · accordion (FAQ, findings) · tabs (scenarios low/mid/high) · progress · table (ROI comparison) · select (role) · slider (occupancy) · switch (care plan) · label · separator · skeleton (Phase-B loading) · sonner (toasts) · tooltip (label explanations).

Custom: `GradeBadge` (A green → F red, AA contrast) · `StepChecklist` · `ScoreDonut` (SVG, aria-labeled) · `GuestPageFrame` (phone chrome) · `HotelThemeProvider` (injects `--hotel-primary` etc., validated colors only) · `EstimateLabel` (standard "Estimate — …" / "Industry data, vendor reported" chip, used ≥ every figure).

## 3. States

| State | Where | UI |
|---|---|---|
| loading | progress, Phase B pending at unlock | checklist ticks / skeletons + "Finishing your report…" |
| empty | zero packages | generic-list notice (labeled) |
| degraded | any fallback fired | section-level note: "We couldn't fully check X" (cases 41–43) |
| error | crawl failed | friendly screen + Retry (case 6) |
| preview vs full | `unlocked` | RSC branches — locked sections never serialized to the client (case 13) |

## 4. Theming the sample pages

`HotelThemeProvider` maps `brandAssets` → CSS vars `--hotel-primary/--hotel-secondary/--hotel-font/--hotel-hero`. Colors validated (parseable, ≥3:1 against white for text usage) else UpLayer fallback tokens. Fonts via extracted family with system fallback; hero images proxied through `/api/brand-image?report=token&key=…` (never hotlink, private report only).

## 5. Responsive & a11y

- Mobile-first; guest pages full-bleed at 390px (no horizontal scroll — case 32).
- Focus-visible rings everywhere (shadcn default); `prefers-reduced-motion` disables the progress animations.
- `ScoreDonut` and grade conveyed as text (`aria-label="Score 62 of 100, grade C"`).
- All inputs labeled; error copy human ("That email doesn't look right — use your work email").
- Language: English only in M1.

## 6. SEO / metadata

- All `/report/*`: `metadata: { robots: { index:false, follow:false } }` **and** middleware header `X-Robots-Tag: noindex, nofollow` (belt and braces — case 36).
- App `robots.txt`: allow `/`, disallow `/report/`, `/api/`.
- OG image for `/` only.
