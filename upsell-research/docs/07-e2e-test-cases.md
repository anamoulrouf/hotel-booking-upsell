# E2E test cases (45)

Titles map 1:1 to Playwright tests (`web/e2e/`). Fixtures/stubs per doc 06. Every case: Given → When → Then.

## A. Entry & abuse

**A1 — Happy submit.** Given the landing page and Turnstile always-pass. When a valid URL (`fixtures rich-hotel`) is submitted. Then redirect to `/report/[token]/progress`, a `reports` row exists, and a `report_started` event is recorded.

**A2 — Turnstile failure.** Given the always-fail test key. When submit is attempted. Then an inline error renders, no `reports` row is created, no Inngest event fires.

**A3 — Invalid URL.** Given the landing page. When `not a url`, `http://localhost`, or `ftp://x` is submitted. Then field-level validation errors per pattern; no submit request.

**A4 — 30-day cache hit.** Given a ready report for domain X created <30d ago. When X is submitted again. Then a cloned report (new token, `cachedFromId` set) renders ready immediately; the worker request counter for this test run is unchanged (zero crawl requests).

**A5 — IP rate limit.** Given >N submissions from one IP within the window. When submitting. Then 429 with friendly copy and the Turnstile widget remains rendered.

**A6 — Dead site.** Given a closed-port URL. When submitted. Then crawl-core fails ×3, `report_failed` event, error screen with Retry; facts/packages/score steps show `skipped` in status.

## B. Progress

**B7 — Ordered ticks.** Given a running report on fixture A. When polling. Then steps tick `crawl_core → facts → search → packages → score` in order with live states, and the page auto-redirects when `preview_ready` lands.

**B8 — Degraded mobile check.** Given fixture A with the mobile-check stub returning a hard failure. When the pipeline completes. Then the report finishes, the mobile area shows "not scored", the header shows "62/90" and grade recomputed on the 90-scale (C).

**B9 — Crawl timeout.** Given a fixture page that stalls past the 60s core-crawl budget (stub). When the step times out. Then retry uses partial pages, a "degraded" marker appears in the report header area, and the report still completes.

**B10 — Late Phase B.** Given preview shown while `crawl-ext`/ideas are still running. When the user reloads after B finishes. Then the full sections render without unlock; before finishing, they show skeletons + "Finishing your report…".

## C. Preview & gating

**C11 — Preview content.** Given a `preview_ready` report. When `/report/[token]` loads. Then grade badge, score "62/100", and missed-revenue range render, each carrying an estimate label.

**C12 — Guest pages gated server-side.** Given `unlocked=false`. When `/report/[token]/guest/family` and `/business` are requested. Then both return 404; only `/guest/couple` returns 200.

**C13 — No locked-section leakage.** Given `unlocked=false`. When the report HTML is fetched and all API responses inspected. Then ROI table, package-ideas section, family/business picks are absent from HTML and payloads (string asserts, not just CSS checks).

**C14 — No pre-unlock email field.** Given the preview. When inspected. Then no email/name input exists anywhere before the user clicks unlock (gate position per brief §3 step 3→4).

**C15 — Sample banner.** Given preview and guest pages. When rendered. Then the banner "Sample made by UpLayer from your public website. Not live." is present on each.

## D. Unlock

**D16 — Validation.** Given the unlock dialog. When submitting bad email / empty name / empty role / empty rooms. Then per-field errors; no `leads` row.

**D17 — Room-count prefill.** Given a report where room count was detected (46). When unlock opens. Then the rooms field is prefilled 46 and editable.

**D18 — Unlock success.** Given valid fields. When submitted. Then the full report renders, a `leads` row exists, `unlocked` event recorded, and the PDF job is enqueued.

**D19 — Emails.** Given unlock. When the Resend stub is inspected. Then the guest email contains a working `/report/[token]?pdf=…` link and the sales alert contains grade + report link.

**D20 — Idempotent replay.** Given a completed unlock. When the unlock action is replayed (double-click / re-POST). Then still exactly 1 lead row and 1 guest email.

## E. Full report

**E21 — Findings.** Given the full report. When the "What we found" section renders. Then exactly 6 areas, each with points, a finding line and a fix line.

**E22 — ROI golden defaults.** Given fixture A defaults. When "Your numbers" renders. Then projected yearly, payback month and 3-year columns equal the engine's golden values (doc 04 §4).

**E23 — Live recompute.** Given the ROI panel. When occupancy slider moves 65→70%. Then payback month + 3-year columns recompute instantly client-side, persist within 1s (network assert), and one `roi_edited` event fires (debounced).

**E24 — Care toggle.** Given the ROI panel. When the care-plan switch flips. Then UpLayer 3-year cost toggles $51k⇄$15k and both SaaS columns are unchanged.

**E25 — Scenarios.** Given the low/mid/high tabs. When each is selected. Then projected revenue, payback and kept-revenue figures change coherently (low ≤ mid ≤ high on every row).

**E26 — Package ideas.** Given the full report. When "Packages you could sell" renders. Then 15–20 ideas, grouped per brief §8 categories, suggested items badged "Suggested", price ranges labeled "suggested, set your own".

**E27 — Inclusion respected.** Given fixture A's included breakfast. When ideas and all guest picks render. Then breakfast appears nowhere; it IS listed in the methods footer as "already included — excluded from ideas".

**E28 — Labels & claims.** Given every revenue figure on the page. When inspected. Then each is accompanied by an estimate/vendor-reported label; a page-wide string scan finds no "UpLayer results"/"our customers" claims phrasing.

## F. Guest pages

**F29 — Three distinct profiles.** Given unlocked fixture A. When the three guest pages load. Then each shows 3–5 packages, sets differ across profiles, and each pick carries its per-guest line.

**F30 — Theming.** When fixture A's couple page renders. Then CSS vars `--hotel-primary:#7A1E2B` and the extracted font apply; fixture B's page falls back to UpLayer theme tokens.

**F31 — Disabled commerce.** When any sample page renders. Then "Pay now, save 10%" and "Reserve, pay at arrival" buttons render disabled for every package.

**F32 — Responsive guest page.** When the couple page is viewed at 1280px and at 390px. Then phone frame appears on desktop, full-bleed on mobile, and `document.scrollWidth <= innerWidth` at 390px (no horizontal overflow).

## G. PDF & email

**G33 — PDF generated.** Given unlock. When the worker completes `/pdf`. Then a Blob key is stored, page count is 5–7, and text extraction contains the grade, the findings and both sample sections.

**G34 — pdf_opened.** Given the emailed PDF link. When first fetched. Then the Blob is served and exactly one `pdf_opened` event exists; a second fetch adds none.

**G35 — PDF failure.** Given the worker PDF endpoint erroring twice then succeeding (stub). When unlock happens. Then the report shows "PDF will arrive shortly", the email arrives after the retry succeeds, and the report stays fully usable meanwhile.

## H. Legal / trust / SEO

**H36 — Noindex.** When any `/report/*` URL (and its print variant) is fetched. Then `<meta name="robots" content="noindex, nofollow">` is present AND the response carries `X-Robots-Tag: noindex, nofollow`; the app's robots.txt disallows `/report/` and `/api/`.

**H37 — robots.txt respected.** Given fixture A disallows `/wp-admin/`. When the crawl runs. Then the worker request log contains no request to that path.

**H38 — 25-page cap.** Given fixture A's 40 internal links. When crawling. Then exactly ≤25 distinct pages are requested (log assert).

**H39 — Removal.** Given a report token. When `/remove` is completed with that token. Then `reports.removedAt` is set, the domain is evicted from the 30-day cache (next submit crawls fresh), and a confirmation renders.

## I. Resilience & data

**I40 — Sparse site fallback.** Given fixture B (no JSON-LD). When the report completes. Then name/city come from the Haiku fallback, the rooms field is empty and marked "add at unlock", and unlock still requires it (prefilled empty, validated).

**I41 — Engine 403.** Given fixture A's engine 403s after the first request. When the flow-probe step runs. Then the booking-flow item renders "Could not check", the engine is still fingerprinted from the landing page, and no score area hard-fails.

**I42 — LLM timeout.** Given the LLM stub in `timeout` mode. When extraction retries exhaust. Then the ideas section renders the generic list labeled "generic list — we couldn't read specific packages" and the report completes.

**I43 — Search failure.** Given the search stub in `timeout` mode. When scoring. Then the $95 default band applies with the estimate label, and the score is byte-identical to a no-search run.

**I44 — Funnel events.** Given the full happy path (submit → preview → unlock → ROI edit → PDF open → CTA click). When inspecting `events`. Then `report_started, preview_seen, unlocked, roi_edited, pdf_opened, cta_clicked` each appear exactly once, in that order.

**I45 — Prompt-injection canary.** Given fixture C. When the report completes. Then the score equals fixture A's deterministic expectation for its actual content (not 100), the injected instruction string never renders anywhere, and no package gains `hasPrice/buy` flags from the injected text.
