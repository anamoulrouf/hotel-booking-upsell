import { count, eq } from "drizzle-orm";
import { MonitorSmartphone, Plug, Server, Sparkles, UserRound, Wrench, Link2 } from "lucide-react";
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

/* Section header for the elaboration half: title + expectation-setting subtitle. */
function SectionHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-5">
      <h2 className="font-notch text-ink text-xl font-semibold md:text-2xl">
        {title}
        <span className="text-brand">.</span>
      </h2>
      <p className="text-muted-foreground mt-1 text-sm font-light">{sub}</p>
    </div>
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
      <div className="bg-surface-alt text-white border-b border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-2 text-xs font-normal tracking-wide text-white/70">
          Sample made by UpLayer from your public website. Not live. · {TOOL_NAME}
        </p>
      </div>

      {/* ——— HERO: the whole first viewport — prominent numbers + the CTA ——— */}
      <section className="bg-surface-alt text-white relative overflow-hidden" data-testid="score-panel">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="text-[11px] font-normal uppercase tracking-[0.22em] text-white/60">
              Upsell report · {formatReportDate(row.createdAt)}
            </p>
            <div className="flex items-center gap-3">
              <CopyReportLink />
              <ShareReportLink />
            </div>
          </div>

          <h1 className="font-notch mt-5 text-4xl font-semibold md:text-5xl">
            {row.hotel.name ?? (
              <>
                Your report — <span className="text-white/60">{row.hotel.domain}</span>
              </>
            )}
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-light leading-[1.6] text-white/70 md:text-base">
            We read {pagesFound} {pagesFound === 1 ? "page" : "pages"} of your website and spotted{" "}
            {packagesFound === 0 ? "no" : packagesFound} sellable {packagesFound === 1 ? "extra" : "extras"}
            {[row.hotel.city, row.hotel.country].filter(Boolean).length ? " in " : ""}
            {[row.hotel.city, row.hotel.country].filter(Boolean).join(", ")} — here&apos;s what they could be worth.
          </p>

          {/* the three prominent numbers (sample-5 KPI row) */}
          <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-0">
            <div data-testid="missed-revenue">
              <p className="text-[10px] font-normal uppercase tracking-[0.18em] text-white/50">
                Missing per year
              </p>
              {row.missedLow != null && row.missedHigh != null ? (
                <>
                  <p className="font-notch text-brand mt-2 text-4xl font-semibold md:text-5xl" data-testid="missed-range">
                    {money(row.missedLow)}–{money(row.missedHigh)}
                  </p>
                  <p className="mt-2 text-xs text-white/50">estimate · pre-arrival revenue</p>
                </>
              ) : (
                <p className="mt-2 text-sm font-light text-white/80">
                  Add your room count at unlock to see the estimate.
                </p>
              )}
            </div>

            <div className="sm:border-l sm:border-white/15 sm:pl-8">
              <p className="text-[10px] font-normal uppercase tracking-[0.18em] text-white/50">Upsell score</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0">
                  <svg viewBox="0 0 64 64" className="h-14 w-14 -rotate-90" aria-hidden="true">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="7" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#FF9E00"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={`${row.scoreOutOf ? ((row.scoreTotal ?? 0) / row.scoreOutOf) * 175.93 : 0} 175.93`}
                    />
                  </svg>
                  <span
                    data-testid="score-total"
                    className="font-notch absolute inset-0 flex items-center justify-center text-base font-semibold"
                  >
                    {row.scoreTotal ?? 0}
                  </span>
                  <span className="sr-only">
                    Upsell score: {row.scoreTotal ?? 0} of {row.scoreOutOf ?? 100}
                  </span>
                </div>
                <div>
                  <span
                    data-testid="grade-badge"
                    className={`inline-flex h-6 items-center justify-center px-2 text-xs font-semibold ${
                      GRADE_STYLES[row.scoreGrade ?? "F"] ?? GRADE_STYLES.F
                    }`}
                  >
                    {row.scoreGrade ?? "–"} grade
                  </span>
                  <p className="mt-1 text-xs text-white/50">of {row.scoreOutOf ?? 100} pts</p>
                </div>
              </div>
            </div>

            <div className="sm:border-l sm:border-white/15 sm:pl-8">
              <p className="text-[10px] font-normal uppercase tracking-[0.18em] text-white/50">Extras spotted</p>
              <p className="font-notch mt-2 text-4xl font-semibold tabular-nums md:text-5xl">{packagesFound}</p>
              <p className="mt-2 text-xs text-white/50">{pricedCount} with prices · keyword scan</p>
            </div>
          </div>

          {/* the CTA — inside the hero, unmissable */}
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <CtaButton
              token={token}
              placement="band"
              variant="amber"
              testid="cta-band-button"
              className="w-full sm:w-auto"
            />
            <span className="text-xs font-light text-white/50">Estimate · 15 minutes · no commitment</span>
          </div>
        </div>
      </section>

      {/* ——— The elaboration — each section sets expectations before its data ——— */}
      <div className="mx-auto max-w-6xl px-6 pb-24">
        {/* 1. Start with these — tinted pill-cards (sample-7 schedule rows) */}
        {topFixes.length > 0 && (
          <section className="pt-12" data-testid="action-panel">
            <SectionHead title="Start with these" sub="The three lowest-scored areas, highest impact first." />
            <div className="grid gap-4 md:grid-cols-3">
              {topFixes.map((a, i) => {
                const tint = i === 0 ? "bg-primary/[0.06]" : i === 1 ? "bg-hairline/[0.05]" : "bg-success/[0.06]";
                const Icon = i === 0 ? Wrench : i === 1 ? MonitorSmartphone : UserRound;
                return (
                  <div key={a.area} className={`${tint} p-5`}>
                    <div className="flex items-start justify-between gap-3">
                      <span className="bg-ink text-white flex h-8 w-8 shrink-0 items-center justify-center">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span
                        className={`text-xs font-semibold tabular-nums ${
                          a.points / (a.max || 1) < 0.4 ? "text-destructive" : "text-ink"
                        }`}
                      >
                        {a.points}/{a.max}
                      </span>
                    </div>
                    <div className="mt-3">
                      <span className="text-sm font-semibold">
                        {a.label ?? a.area}
                        {i === 0 ? (
                          <span className="text-brand ml-3 text-[10px] font-normal uppercase tracking-[0.14em]">
                            Start here
                          </span>
                        ) : null}
                      </span>
                      <p className="text-body mt-1.5 text-xs font-light leading-[1.6]">{a.finding}</p>
                      <p className="text-body mt-1.5 text-xs font-normal leading-[1.6]">
                        <span className="text-brand">Fix · </span>
                        {a.fix}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 2. Where the estimate comes from */}
        <section className="pt-12">
          <SectionHead title="Where the estimate comes from" sub="The math behind the numbers above — every factor labeled." />
          {est ? (
            <div className="border-primary/15 bg-primary/[0.04] border p-5 md:p-6">
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
              <p className="text-muted-foreground mt-6 border-t border-hairline/15 pt-4 text-xs leading-5">
                Estimate. Defaults editable at unlock: {Math.round(DEFAULTS.occupancy * 100)}% occupancy,{" "}
                {DEFAULTS.avgStayNights}-night stay. Hotel-specific prices not yet detected — OTA lookup lands in a
                later build.
              </p>
            </div>
          ) : (
            <div className="bg-card border-hairline/20 border p-5">
              <p className="text-body text-sm font-light">
                Room count wasn&apos;t found on your public pages. Add it at unlock and this section computes your
                potential, what you already capture, and what&apos;s missing.
              </p>
            </div>
          )}
        </section>

        {/* 3. What we found */}
        <section className="pt-12">
          <SectionHead title="What we found" sub="Score by area, one fix each — lowest first." />
          <div className="bg-card border-hairline/20 shadow-upl-sm border p-5 md:p-6">
            <ul data-testid="findings">
              {areas.map((a) => {
                const pct = a.skipped || !a.max ? 0 : Math.round((a.points / a.max) * 100);
                const isWorst = worstArea != null && a.area === worstArea.area;
                return (
                  <li key={a.area} className="border-hairline/15 border-b py-4 first:border-t-0 last:border-b-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-sm font-semibold">
                        {a.label ?? a.area}
                        {isWorst ? (
                          <span className="text-brand ml-3 text-[10px] font-normal uppercase tracking-[0.14em]">
                            Start here
                          </span>
                        ) : null}
                      </span>
                      <span
                        className={`text-sm font-normal tabular-nums ${
                          a.skipped ? "text-muted-foreground" : a.points / (a.max || 1) < 0.4 ? "text-destructive" : "text-ink"
                        }`}
                      >
                        {a.skipped ? "not scored" : `${a.points}/${a.max}`}
                      </span>
                    </div>
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
        </section>

        {/* 4. Your stack */}
        <section className="pt-12">
          <SectionHead title="Your stack" sub="What your public pages fingerprint as." />
          <ul className="space-y-2">
            {[
              { icon: Plug, label: "Booking engine", value: engine?.name ?? null, sub: engine ? engine.evidence : "no fingerprint found", testid: "detected-engine" },
              {
                icon: Sparkles,
                label: "Upsell / guest tools",
                value: upsellTools.length ? upsellTools.map((t) => t.name).join(", ") : null,
                sub: upsellTools.length ? "scripts or subdomains" : "reach today is your own site only",
                testid: "detected-upsell",
              },
              { icon: Server, label: "Likely PMS", value: pms?.name ?? null, sub: pms ? pms.evidence : "not inferable from the engine", testid: "stack-pms" },
              { icon: Link2, label: "Manual payment link", value: manualPay?.name ?? null, sub: manualPay ? manualPay.evidence : "not found on public pages", testid: "stack-payment" },
            ].map((s) => (
              <li key={s.label} className={`flex items-start gap-3 border p-4 ${s.value ? "border-transparent bg-hairline/[0.04]" : "border-transparent bg-border/20"}`}>
                <span className="bg-ink text-white flex h-8 w-8 shrink-0 items-center justify-center">
                  <s.icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
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
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Packages */}
        <section className="pt-12">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h2 className="font-notch text-ink text-xl font-semibold md:text-2xl">
                Packages we spotted<span className="text-brand">.</span>
              </h2>
              <p className="text-muted-foreground mt-1 text-sm font-light">
                Sellable items found on your public pages — {pricedCount} show a price.
              </p>
            </div>
            <span className="text-muted-foreground text-xs tabular-nums" data-testid="pages-found">
              {pagesFound} · {packagesFound}
            </span>
          </div>
          {foundPackages.length ? (
            <div className="bg-card border-hairline/20 shadow-upl-sm overflow-x-auto border">
              <table className="w-full min-w-[560px] text-left text-sm">
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
                  {foundPackages.map((p) => {
                    const checks = [p.hasPhoto, p.hasPrice, p.hasDescription];
                    const score = checks.filter(Boolean).length;
                    const detail = ["photo", "price", "description"]
                      .map((label, i) => (checks[i] ? `✓ ${label}` : `– ${label}`))
                      .join(" · ");
                    const pill =
                      score === 3
                        ? "bg-success/15 text-[#00695C]"
                        : score === 2
                          ? "bg-primary/10 text-[#8A5600]"
                          : "bg-border/25 text-muted-foreground";
                    return (
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
                          <span title={detail} className={`inline-block px-2 py-0.5 text-[11px] font-normal ${pill}`}>
                            {score === 3 ? "Complete" : score === 2 ? "Partial" : "Minimal"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-card border-hairline/20 mt-4 border p-5">
              <p className="text-body text-sm font-light">
                No sellable items spotted yet — the next build reads deeper (booking engine extras, OTA listings) and
                drafts package ideas for your hotel type.
              </p>
            </div>
          )}
        </section>

        {/* Closing CTA */}
        <section className="pt-12" data-testid="cta">
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
        <section className="mt-12 border-t border-hairline/15 pt-10" id="next-steps" data-testid="next-steps">
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
