import { count, eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TOOL_NAME, DEFAULTS, computeMissedRevenue } from "@uplayer/shared";
import { detectedTech, hotels, packages as packagesTable, pages, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";
import { CopyReportLink, ShareReportLink } from "@/components/report-actions";
import { CtaButton } from "@/components/cta-button";
import { StickyCta } from "@/components/sticky-cta";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/* Grade colors — shades within the measured palette:
   success #00B894 for A/B, light-theme accent #C27800 for C,
   darker amber shade for D, deep shade for F. */
const GRADE_STYLES: Record<string, string> = {
  A: "bg-[#00B894] text-[#023330]",
  B: "bg-[#00B894] text-[#023330]",
  C: "bg-[#C27800] text-[#241A00]",
  D: "bg-[#9A5B00] text-[#FFFBF5]",
  F: "bg-[#0F172A] text-[#FFFBF5]",
};

const CATEGORY_LABELS: Record<string, string> = {
  room_stay: "Room & stay",
  food_drink: "Food & drink",
  wellness: "Wellness",
  family: "Family",
  romance: "Romance",
  business: "Business",
  local: "Local",
  arrival: "Arrival",
};

function money(n: number): string {
  return n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${Math.round(n)}`;
}

/* "SATURDAY · 25 JULY 2026" — editorial eyebrow (sample-3 direction) */
function formatReportDate(d: Date): string {
  const s = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
  return s.toUpperCase().replace(", ", " · ");
}

/* Claims-discipline chip (docs/08 §4). On dark tiles use <Tag dark>. */
function Tag({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-block border px-2 py-0.5 text-[10px] font-normal uppercase tracking-[0.14em] ${
        dark ? "border-white/25 text-white/60" : "border-hairline/30 text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}

export default async function ReportPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const [row] = await db
    .select({
      id: reports.id,
      removedAt: reports.removedAt,
      createdAt: reports.createdAt,
      scoreTotal: reports.scoreTotal,
      scoreOutOf: reports.scoreOutOf,
      scoreGrade: reports.scoreGrade,
      scoreBreakdown: reports.scoreBreakdown,
      missedLow: reports.missedLow,
      missedHigh: reports.missedHigh,
      priceBand: reports.priceBand,
      hotel: {
        name: hotels.name,
        city: hotels.city,
        country: hotels.country,
        starRating: hotels.starRating,
        roomCount: hotels.roomCount,
        domain: hotels.domain,
      },
    })
    .from(reports)
    .innerJoin(hotels, eq(reports.hotelId, hotels.id))
    .where(eq(reports.token, token))
    .limit(1);

  if (!row || row.removedAt) notFound();

  const [{ value: pagesFound }] = await db
    .select({ value: count() })
    .from(pages)
    .innerJoin(reports, eq(pages.reportId, reports.id))
    .where(eq(reports.token, token));
  const [{ value: packagesFound }] = await db
    .select({ value: count() })
    .from(packagesTable)
    .innerJoin(reports, eq(packagesTable.reportId, reports.id))
    .where(eq(reports.token, token));
  const tech = await db
    .select({ category: detectedTech.category, name: detectedTech.name, evidence: detectedTech.evidence })
    .from(detectedTech)
    .innerJoin(reports, eq(detectedTech.reportId, reports.id))
    .where(eq(reports.token, token));
  const foundPackages = await db
    .select({
      name: packagesTable.name,
      priceMin: packagesTable.priceMin,
      currency: packagesTable.currency,
      category: packagesTable.category,
      hasPhoto: packagesTable.hasPhoto,
      hasPrice: packagesTable.hasPrice,
      hasDescription: packagesTable.hasDescription,
    })
    .from(packagesTable)
    .where(eq(packagesTable.reportId, row.id));

  const engine = tech.find((t) => t.category === "engine");
  const upsellTools = tech.filter((t) => t.category === "upsell_tool");
  const pms = tech.find((t) => t.category === "pms");
  const manualPay = tech.find((t) => t.category === "payment_link_manual");
  const pricedCount = foundPackages.filter((p) => p.hasPrice).length;

  // Findings worst-first: lowest score ratio leads, skipped areas trail.
  const areas = [...(row.scoreBreakdown ?? [])].sort(
    (a, b) =>
      Number(a.skipped ?? false) - Number(b.skipped ?? false) ||
      a.points / (a.max || 1) - b.points / (b.max || 1),
  );
  const worstArea = areas.find((a) => !a.skipped);
  const topFixes = areas.filter((a) => !a.skipped).slice(0, 3);

  // Revenue funnel — recomputed by the deterministic engine from stored inputs.
  // The LLM never computes money (CLAUDE.md rule 2); this is the same pure
  // function the pipeline used, run again at render time.
  const est =
    row.hotel.roomCount && row.scoreTotal != null && row.scoreOutOf
      ? computeMissedRevenue({
          rooms: row.hotel.roomCount,
          occupancy: DEFAULTS.occupancy,
          avgStayNights: DEFAULTS.avgStayNights,
          nightlyRate: null, // OTA price lookup lands in M3; $95 baseline band applies
          starRating: row.hotel.starRating,
          takeRateLow: DEFAULTS.takeRateLow,
          takeRateHigh: DEFAULTS.takeRateHigh,
          scorePct: (row.scoreTotal / row.scoreOutOf) * 100,
        })
      : null;
  const captured = est ? est.potentialLow * est.capture : 0;
  const capturedPct = est ? Math.min(100, est.capture * 100) : 0;
  const missedPct = est ? Math.max(0, 100 - capturedPct) : 0;

  return (
    <main className="min-h-dvh">
      {/* Sample banner — required label (docs/08 §1) */}
      <div className="bg-surface-alt text-white">
        <p className="mx-auto max-w-[1280px] px-6 py-2.5 text-xs font-normal tracking-wide">
          Sample made by UpLayer from your public website. Not live. · {TOOL_NAME}
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24">
        {/* ——— Editorial header + actions (sample-3 greeting row) ——— */}
        <header className="pt-16 pb-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-muted-foreground text-xs font-normal uppercase tracking-[0.22em]">
                Upsell report · {formatReportDate(row.createdAt)}
              </p>
              <h1 className="font-notch text-ink mt-5 text-5xl font-semibold leading-[1.05]">
                {row.hotel.name ?? (
                  <>
                    Your report — <span className="text-muted-foreground">{row.hotel.domain}</span>
                  </>
                )}
              </h1>
              <p className="text-body mt-4 text-base font-light leading-[1.6]">
                We read {pagesFound} {pagesFound === 1 ? "page" : "pages"} of your website and spotted{" "}
                {packagesFound === 0 ? "no" : packagesFound} sellable {packagesFound === 1 ? "extra" : "extras"}
                {[row.hotel.city, row.hotel.country].filter(Boolean).length ? " in " : ""}
                {[row.hotel.city, row.hotel.country].filter(Boolean).join(", ")}. Here&apos;s what they could be
                worth.
              </p>
              <p className="text-muted-foreground mt-3 text-sm font-normal">
                {row.hotel.starRating ? `${row.hotel.starRating}★ · ` : ""}
                {row.hotel.roomCount ? `${row.hotel.roomCount} rooms · ` : ""}
                {engine ? `books via ${engine.name}` : "booking engine not detected"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CopyReportLink />
              <ShareReportLink />
            </div>
          </div>
        </header>

        {/* ——— KPI band: one ink anchor + white tiles (sample-2 × sample-3) ——— */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* anchor: upsell readiness */}
          <div className="bg-surface-alt relative overflow-hidden p-6 text-white" data-testid="score-panel">
            <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
            <div className="relative flex h-full flex-col">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Upsell readiness</h2>
              <div className="mt-auto flex items-end gap-4 pt-6">
                <div
                  data-testid="grade-badge"
                  className={`flex h-14 w-14 items-center justify-center text-2xl font-semibold ${
                    GRADE_STYLES[row.scoreGrade ?? "F"] ?? GRADE_STYLES.F
                  }`}
                >
                  {row.scoreGrade ?? "–"}
                </div>
                <div className="pb-0.5" data-testid="score-total">
                  <span className="font-notch text-4xl font-semibold">{row.scoreTotal ?? 0}</span>
                  <span className="text-base font-light text-white/60"> / {row.scoreOutOf ?? 100} pts</span>
                </div>
              </div>
              <p className="mt-3 text-[11px] leading-4 text-white/60">
                {row.scoreOutOf != null && row.scoreOutOf < 100
                  ? "Mobile check not run in this build — graded on checked areas."
                  : "Six areas, one fix each below."}
              </p>
            </div>
          </div>

          {/* missing revenue — white tile, amber mark under an ink figure */}
          <div className="bg-card border-hairline/20 shadow-upl-sm flex flex-col border p-6" data-testid="missed-revenue">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
                Missing revenue
              </h2>
              <Tag>Estimate</Tag>
            </div>
            {row.missedLow != null && row.missedHigh != null ? (
              <>
                <p className="font-notch text-ink mt-auto pt-6 text-4xl font-semibold" data-testid="missed-range">
                  {money(row.missedLow)}–{money(row.missedHigh)}
                </p>
                <div className="bg-primary mt-3 h-1 w-16" aria-hidden />
                <p className="text-muted-foreground mt-3 text-[11px] leading-4">
                  Estimated pre-arrival revenue per year
                </p>
              </>
            ) : (
              <p className="text-body mt-auto pt-6 text-sm font-light">
                Add your room count at unlock — it&apos;s required for the revenue math.
              </p>
            )}
          </div>

          {/* packages spotted */}
          <div className="bg-card border-hairline/20 shadow-upl-sm flex flex-col border p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
                Packages spotted
              </h2>
              <Tag>Keyword scan</Tag>
            </div>
            <p className="font-notch text-ink mt-auto pt-6 text-4xl font-semibold tabular-nums">{packagesFound}</p>
            <p className="text-muted-foreground mt-3 text-[11px] leading-4">
              {pricedCount} with a visible price · list below
            </p>
          </div>

          {/* booking engine */}
          <div className="bg-card border-hairline/20 shadow-upl-sm flex flex-col border p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
                Booking engine
              </h2>
              <Tag>Fingerprint</Tag>
            </div>
            <p className="font-notch text-ink mt-auto truncate pt-6 text-2xl font-semibold" data-testid="kpi-engine">
              {engine?.name ?? "Not detected"}
            </p>
            <p className="text-muted-foreground mt-3 text-[11px] leading-4">
              {engine ? "detected in scripts and links" : "no fingerprint on public pages"}
            </p>
          </div>
        </section>

        {/* ——— Verdict band: the conversion moment, right after the numbers ——— */}
        <section className="bg-surface-alt text-white relative mt-6 overflow-hidden" id="cta-band" data-testid="cta-band">
          <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
          <div className="relative flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-xl">
              <h2 className="font-notch text-2xl font-semibold leading-tight md:text-3xl">
                {est ? (
                  <>
                    See how to recover{" "}
                    <span className="text-brand">
                      {money(est.missedLow)}–{money(est.missedHigh)}
                    </span>{" "}
                    a year
                  </>
                ) : (
                  "See what your hotel is not selling yet."
                )}
              </h2>
              <p className="mt-2 text-sm font-light text-[#A6A29B]">
                Estimate · 15 minutes, your report on screen, no commitment.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <CtaButton
                token={token}
                placement="band"
                variant="amber"
                testid="cta-band-button"
                className="w-full md:w-auto"
              />
              <ShareReportLink />
            </div>
          </div>
        </section>

        {/* ——— Hero row: numbers (⅔) + action panel (⅓) — sample-3 hero ——— */}
        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          {est ? (
            <div className="bg-card border-hairline/20 shadow-upl-sm border p-6 md:p-8 lg:col-span-2">
              {/* kv rail + funnel: sample-3's revenue-vs-forecast card */}
              <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
                <dl className="divide-hairline/15 self-start divide-y border-hairline/15 border-y text-sm">
                  <div className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="text-body font-normal">Bookings a year</dt>
                    <dd className="text-muted-foreground text-right text-xs">
                      {row.hotel.roomCount} rooms × {Math.round(DEFAULTS.occupancy * 100)}% ÷{" "}
                      {DEFAULTS.avgStayNights} nights ·{" "}
                      <span className="text-ink font-semibold tabular-nums">{est.bookings.toLocaleString()}</span>
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="text-body font-normal">Guests who buy</dt>
                    <dd className="text-muted-foreground text-right text-xs">
                      industry, vendor reported ·{" "}
                      <span className="text-ink font-semibold tabular-nums">
                        {Math.round(DEFAULTS.takeRateLow * 100)}–{Math.round(DEFAULTS.takeRateHigh * 100)}%
                      </span>
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="text-body font-normal">Spend per booking</dt>
                    <dd className="text-muted-foreground text-right text-xs">
                      Revinate baseline · <span className="text-ink font-semibold tabular-nums">${est.spend}</span>
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="text-body font-normal">Already captured</dt>
                    <dd className="text-muted-foreground text-right text-xs">
                      internal assumption ·{" "}
                      <span className="text-ink font-semibold tabular-nums">≈{Math.round(capturedPct)}%</span>
                    </dd>
                  </div>
                </dl>

                {/* stages — ink monochrome; amber marks missing only */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-body font-normal">Potential</span>
                      <span className="text-ink font-semibold tabular-nums">
                        {money(est.potentialLow)}–{money(est.potentialHigh)}
                        <span className="text-muted-foreground font-normal"> /yr</span>
                      </span>
                    </div>
                    <div className="bg-ink/85 mt-2 h-5 w-full" />
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-body font-normal">Capturing now</span>
                      <span className="text-ink font-semibold tabular-nums">
                        ≈{money(captured)}
                        <span className="text-muted-foreground font-normal"> /yr</span>
                      </span>
                    </div>
                    <div className="bg-border/30 mt-2 h-5 w-full">
                      <div className="bg-ink/35 h-full" style={{ width: `${capturedPct}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-ink font-semibold">Missing</span>
                      <span className="text-ink font-semibold tabular-nums">
                        {money(est.missedLow)}–{money(est.missedHigh)}
                        <span className="text-muted-foreground font-normal"> /yr</span>
                      </span>
                    </div>
                    <div className="bg-border/30 mt-2 h-5 w-full">
                      <div className="bg-primary h-full" style={{ width: `${missedPct}%` }} />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mt-8 border-t border-hairline/15 pt-4 text-xs leading-5">
                Estimate. Defaults editable at unlock: {Math.round(DEFAULTS.occupancy * 100)}% occupancy,{" "}
                {DEFAULTS.avgStayNights}-night stay. Hotel-specific prices not yet detected — OTA lookup lands in a
                later build.
              </p>
            </div>
          ) : (
            <div className="bg-card border-hairline/20 border p-6 lg:col-span-2">
              <p className="text-body text-sm font-light">
                Room count wasn&apos;t found on your public pages. Add it at unlock and this section computes your
                potential, what you already capture, and what&apos;s missing.
              </p>
            </div>
          )}

          {/* Action panel — sample-3's schedule panel: the fixes, worst first */}
          {topFixes.length > 0 && (
            <div className="bg-card border-hairline/20 shadow-upl-sm flex flex-col border p-5" data-testid="action-panel">
              <h2 className="text-ink text-sm font-semibold">Start with these</h2>
              <p className="text-muted-foreground mt-1 text-xs">Lowest-scored areas first.</p>
              <ul className="mt-4 space-y-2">
                {topFixes.map((a, i) => (
                  <li
                    key={a.area}
                    className={`border p-4 ${i === 0 ? "border-hairline/40 bg-primary/[0.05]" : "border-hairline/15"}`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-semibold">{a.label ?? a.area}</span>
                      <span className={`text-xs tabular-nums ${a.points / (a.max || 1) < 0.4 ? "text-destructive" : "text-muted-foreground"}`}>
                        {a.points}/{a.max}
                      </span>
                    </div>
                    <p className="text-body mt-1.5 text-xs font-light leading-[1.5]">{a.fix}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <CtaButton
                  token={token}
                  placement="panel"
                  variant="ink"
                  size="sm"
                  label="Book a walkthrough"
                  testid="cta-panel-button"
                  className="w-full"
                />
              </div>
            </div>
          )}
        </section>

        {/* ——— Findings row: bar rows (⅔) + stack card (⅓) ——— */}
        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="bg-card border-hairline/20 shadow-upl-sm border p-6 lg:col-span-2">
            <div className="flex items-baseline justify-between">
              <h2 className="font-notch text-ink text-xl font-semibold">
                What we found<span className="text-brand">.</span>
              </h2>
              <span className="text-muted-foreground text-xs">score by area, one fix each</span>
            </div>
            <ul className="mt-2" data-testid="findings">
              {areas.map((a) => {
                const pct = a.skipped || !a.max ? 0 : Math.round((a.points / a.max) * 100);
                const isWorst = worstArea != null && a.area === worstArea.area;
                return (
                  <li key={a.area} className="border-hairline/15 border-b py-4 last:border-b-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-sm font-semibold">
                        {a.label ?? a.area}
                        {isWorst ? (
                          <span className="text-brand ml-3 text-[10px] font-normal uppercase tracking-[0.14em]">
                            Start here
                          </span>
                        ) : null}
                      </span>
                      <span className={`text-sm font-normal tabular-nums ${a.skipped ? "text-muted-foreground" : "text-ink"}`}>
                        {a.skipped ? "not scored" : `${a.points}/${a.max}`}
                      </span>
                    </div>
                    {/* score bar — ink monochrome, neutral track, sharp ends */}
                    <div className="bg-border/30 mt-2.5 h-1 w-full">
                      <div
                        className={`h-full ${a.skipped ? "bg-transparent" : "bg-ink/85"}`}
                        style={{ width: `${pct}%` }}
                        role="img"
                        aria-label={
                          a.skipped
                            ? `${a.label ?? a.area}: not scored`
                            : `${a.label ?? a.area}: ${a.points} of ${a.max} points`
                        }
                      />
                    </div>
                    <p className="text-body mt-2.5 text-sm font-light leading-[1.6]">{a.finding}</p>
                    <p className="text-body mt-1 text-sm font-normal leading-[1.6]">
                      <span className="text-brand">Fix · </span>
                      {a.fix}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Stack — detected / not-detected list with chips (sample-1 rows) */}
          <div className="bg-card border-hairline/20 shadow-upl-sm flex flex-col border p-6">
            <h2 className="font-notch text-ink text-xl font-semibold">
              Your stack<span className="text-brand">.</span>
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">what your public pages fingerprint as</p>
            <ul className="divide-hairline/15 mt-4 divide-y border-hairline/15 border-y">
              {[
                { label: "Booking engine", value: engine?.name ?? null, sub: engine ? engine.evidence : "no fingerprint found", testid: "detected-engine" },
                {
                  label: "Upsell / guest tools",
                  value: upsellTools.length ? upsellTools.map((t) => t.name).join(", ") : null,
                  sub: upsellTools.length ? "scripts or subdomains" : "reach today is your own site only",
                  testid: "detected-upsell",
                },
                { label: "Likely PMS", value: pms?.name ?? null, sub: pms ? pms.evidence : "not inferable from the engine", testid: "stack-pms" },
                { label: "Manual payment link", value: manualPay?.name ?? null, sub: manualPay ? manualPay.evidence : "not found on public pages", testid: "stack-payment" },
              ].map((s) => (
                <li key={s.label} className="py-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-body text-sm font-normal">{s.label}</span>
                    <span className={`text-sm font-normal ${s.value ? "text-ink" : "text-muted-foreground"}`} data-testid={s.testid}>
                      {s.value ?? "Not detected"}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <span className="text-muted-foreground truncate text-xs">{s.sub}</span>
                    <span
                      className={`shrink-0 px-2 py-0.5 text-[10px] font-normal uppercase tracking-[0.12em] ${
                        s.value ? "bg-success/15 text-[#00695C]" : "bg-border/25 text-muted-foreground"
                      }`}
                    >
                      {s.value ? "Detected" : "None"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ——— Packages: inventory table (sample-1/2 tables) ——— */}
        <section className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-notch text-ink text-xl font-semibold">
              Packages we spotted<span className="text-brand">.</span>
            </h2>
            <span className="text-muted-foreground text-xs tabular-nums" data-testid="pages-found">
              {pagesFound} · {packagesFound}
            </span>
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            pages read · sellable items spotted on your public pages
          </p>
          {foundPackages.length ? (
            <div className="bg-card border-hairline/20 mt-4 overflow-x-auto border">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-hairline/15 border-b">
                    {["Package", "Group", "From", "Presentation"].map((h) => (
                      <th key={h} className="text-muted-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-hairline/15 divide-y">
                  {foundPackages.map((p) => (
                    <tr key={p.name}>
                      <td className="text-ink px-5 py-3.5 font-normal">{p.name}</td>
                      <td className="text-body px-5 py-3.5">{CATEGORY_LABELS[p.category ?? ""] ?? p.category ?? "—"}</td>
                      <td className="px-5 py-3.5 tabular-nums">
                        {p.priceMin != null ? (
                          <span className="text-ink font-normal">
                            {p.currency === "EUR" ? "€" : "$"}
                            {p.priceMin}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-muted-foreground text-xs">
                          {[
                            { ok: p.hasPhoto, label: "photo" },
                            { ok: p.hasPrice, label: "price" },
                            { ok: p.hasDescription, label: "description" },
                          ]
                            .map((x) => (x.ok ? `✓ ${x.label}` : `– ${x.label}`))
                            .join(" · ")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-card border-hairline/20 mt-4 border p-6">
              <p className="text-body text-sm font-light">
                No sellable items spotted yet — the next build reads deeper (booking engine extras, OTA listings) and
                drafts package ideas for your hotel type.
              </p>
            </div>
          )}
        </section>

        {/* CTA — brief §3 step 6 / §9.7; mailto until the scheduler lands */}
        <section className="mt-6" data-testid="cta">
          <CtaButton
            token={token}
            placement="footer"
            variant="ink"
            testid="cta-walkthrough"
            label="Book a 15-minute walkthrough of your report"
            className="w-full"
          />
          <div className="mt-4 flex justify-center">
            <ShareReportLink />
          </div>
        </section>

        {/* Next steps */}
        <section className="mt-6 border-t border-hairline/15 pt-10" id="next-steps" data-testid="next-steps">
          <p className="text-body max-w-xl text-sm font-light leading-[1.6]">
            Next, UpLayer drafts three sample guest pages in your brand, a live ROI editor and a PDF — arriving in
            milestones M2–M8. Package spotting above is a keyword scan (approximate); the Claude-powered extractor and
            OTA price lookup refine it.
          </p>
        </section>

        <p className="text-muted-foreground mt-10 text-xs leading-5">
          Every number is an estimate or industry data, vendor reported — no UpLayer results are claimed. Public pages
          only; robots.txt respected; never books or submits forms. Removal:{" "}
          <Link href="/remove" className="text-hairline hover:underline">
            /remove
          </Link>
        </p>
      </div>

      {/* Sticky walkthrough bar — middle zone of the page only */}
      <StickyCta
        token={token}
        range={row.missedLow != null && row.missedHigh != null ? `${money(row.missedLow)}–${money(row.missedHigh)}` : null}
      />
    </main>
  );
}
