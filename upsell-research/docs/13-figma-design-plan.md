# Figma Design Plan — Home + Report pages (executed by the next session)

Goal: design two 1440px frames in the Figma file **Booking-Upsell**
(fileKey `ekhesuaA5EFFm68dpucQEu`) matching the implemented app exactly.
The implemented layouts are the source of truth; tokens from
[`10-DESIGN.md`](10-DESIGN.md).

## Tokens (all values measured, use as paints/typography — no DS variables exist in the file yet)

| Token | Value |
|---|---|
| Ink (headings/body strong) | `#0F172A` |
| Body | `#334155` |
| Muted | `#64748B` |
| Dark band / ink surface | `#020617` |
| Card surface | `#F0F4FF` |
| White canvas | `#FFFFFF` |
| Amber (CTA/money) | `#FF9E00` |
| On-amber text | `#222222` |
| Hairline blue (links/focus) | `#0F65F4` |
| Success (pills/dots) | `#00B894` |
| Neutral divider | `#D1D3D7` |
| Dark-band muted text | `#A6A29B` / `white` at 50–70% |
| Fonts | Stack Sans Notch (display), Stack Sans Headline (headings), Stack Sans Text (body) — Google Fonts, available in Figma |
| Radius | 0px everywhere |
| Shadows | micro oklab layers — approximate with soft drop shadows (0 10px 15px -3px @ 25%) |

## Frame 1 — "Home" (1440 × ~3200)

1. **Nav** (white, 72px): "UpLayer" (Notch 24 semibold) + "/ Booking Upsell Report" (14 body) · right: "How it works", "What you get" (15px), amber button "Get my report" (h-40, px-20)
2. **Hero** (white, dotted grid 22px, py-80): eyebrow "FREE · NO EMAIL TO PREVIEW" (12px, tracked) · H1 "Find the revenue you're missing." (Notch 96/0.95, amber period) · sub 18/1.63 max-w-640 · form: URL input (h-56, 1px `#D1D3D7` border) + amber button "Get my report" (h-56, px-32, 14px) · trust line 12px muted with hairline "removal requests" link
3. **How it works** (ink band, py-64/96): H2 "How it works." (Notch 48, amber period) · 4 columns: amber numeral 01–04 (Notch 36) + title 18 semibold + body 14/1.6 muted `#A6A29B` — steps: read your public pages / find your packages / run your numbers / get your report
4. **What you get** (white, py-64/96): H2 48 · 3 cards (`#F0F4FF`, 1px hairline border @20%, shadow-sm): Upsell score (success-green "B" square) / Guest pages (mini panel mock) / ROI $38–71k (Notch 36)
5. **Closing CTA** (ink band, centered py-64/96): H2 "See what your hotel is not selling yet." (amber accent) · amber button "Get my free report" (h-70, px-40) + outline "How it works" (1px white/10)
6. **Footer** (ink, py-64): logo, tagline, link column (removal requests), legal 12px

## Frame 2 — "Report" (1440 × ~3600), fictional "Hotel Aurora" data

1. **Sample banner** (ink, 40px): "Sample made by UpLayer from your public website. Not live." 12px
2. **Hero band** (ink + dot grid, py-80): eyebrow "UPSELL REPORT · THURSDAY · 8 OCTOBER 2026" · H1 "Hotel Aurora" (Notch 48) · context line · **3 stats with 1px white/15 dividers**: MISSING PER YEAR "$28k–$53k" (amber Notch 48) + "estimate · pre-arrival revenue" · UPSELL SCORE "45" gauge (amber arc, 56px) + "D grade" chip `#9A5B00` + "of 90 pts" · EXTRAS SPOTTED "6" + "5 with prices · keyword scan" · amber CTA "Book a 15-minute walkthrough" (h-56, px-32) + "Estimate · 15 minutes · no commitment"
3. **Start with these.** (py-48): 3 tinted cards `primary/6%`, `hairline/5%`, `success/6%` — worst amber-tinted with "START HERE" — each: ink icon chip 32px (Wrench/Monitor/User icons), label 14 semibold, score "0/20" (red <40%), finding 12px, "Fix ·" amber line
4. **Where the estimate comes from.** (amber `primary/4%` panel): left kv rail (4 rows, hairline dividers): Bookings a year 6,823 · Guests who buy 8–15% · Spend $95 · Already captured ≈36% · right funnel bars: Potential $44k–83k (ink), Capturing ≈$16k (ink/35), **Missing $28k–53k (amber)** · footnote 11px
5. **What we found.** (white card): 6 bar rows — label + score right, ink bar on `#D1D3D7`/30 track, finding + "Fix ·" line: Pre-arrival reach 0/20 · Sellable 12/25 · Personalization 5/10 · Presentation 8/15 · Packages exist 20/20 · Mobile "not scored"
6. **Your stack.** 4 tinted rows with 32px ink icon chips: Booking engine "Mews Booking Engine" (DETECTED green chip) · Upsell tools "Oaky" (DETECTED) · Likely PMS "Mews" (DETECTED) · Manual payment link "Not detected" (NONE gray chip)
7. **Packages we spotted.** table: 6 rows (name / group / from € / presentation pill Complete-Partial-Minimal)
8. **Closing CTA** (ink full-width h-70): "Book a 15-minute walkthrough of your report" + share line · next-steps prose · legal 11px

## Build order (fresh session)

1. `get_metadata` on file `ekhesuaA5EFFm68dpucQEu` — inspect the empty page
2. Create page section "Design" → Frame "Home" 1440w → build sections 1–6 top-down, one `use_figma` call per section, `get_screenshot` after each
3. Frame "Report" 1440w → same for sections 1–8
4. Compare both frames side-by-side with the implemented app screenshots; fix spacing drift
5. Reference screenshots of the implemented app: re-capture via Playwright at 1440px if needed (`localhost:3000` for home; a seeded report for the report page — seed recipe in git history, `__seed.test.ts` pattern)
