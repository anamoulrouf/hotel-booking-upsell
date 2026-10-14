import { and, count, eq, gt } from "drizzle-orm";
import { MonitorSmartphone, Plug, Server, Sparkles, UserRound, Wrench, Link2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TOOL_NAME, DEFAULTS, computeMissedRevenue } from "@uplayer/shared";
import { detectedTech, hotels, packages as packagesTable, pages, reports, samplePages } from "@uplayer/shared/db";
import { db } from "@/server/db";
import { CopyReportLink, ShareReportLink } from "@/components/report-actions";
import { CtaButton } from "@/components/cta-button";
import { ReportSidebar } from "@/components/report-sidebar";
import { UnlockForm } from "@/components/unlock-form";
import { RoiEditor } from "@/components/roi-editor";
import { GUEST_PROFILES } from "@/server/guest-pages";

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

/* "SATURDAY · 25 JULY 2026" — editorial date line (sample-3 direction) */
function formatReportDate(d: Date): string {
  const s = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
  return s.toUpperCase().replace(", ", " · ");
}

function titleCaseDate(d: Date): string {
  return formatReportDate(d).toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

/* Section header: Notch title with amber period + expectation-setting sub. */
function SectionHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="font-notch text-ink text-2xl font-semibold lg:text-4xl">
          {title}
          <span className="text-brand">.</span>
        </h2>
        <p className="text-muted-foreground mt-1 text-sm font-light">{sub}</p>
      </div>
    </div>
  );
}

/* amber "FIX" chip from the design's finding cards */
function FixChip({ small }: { small?: boolean }) {
  return (
    <span
      className={`bg-brand text-on-primary inline-flex px-2.5 py-1 font-normal ${
        small ? "text-[12px] leading-[18px]" : "text-xs leading-[18px]"
      }`}
    >
      FIX
    </span>
  );
}

/* score pill on the packages table — Complete / Partial / Minimal */
function PresentationPill({ score }: { score: number }) {
  const pill =
    score === 3
      ? "bg-success/[0.12] text-[#00805F]"
      : score === 2
        ? "bg-brand/15 text-[#9A5B00]"
        : "bg-border/50 text-muted-foreground";
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-normal ${pill}`}>
      {score === 3 ? "Complete" : score === 2 ? "Partial" : "Minimal"}
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
      unlocked: reports.unlocked,
      inputs: reports.inputs,
      brandAssets: hotels.brandAssets,
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
    // 30-day retention (docs/02): expired reports 404 like removed ones
    .where(and(eq(reports.token, token), gt(reports.expiresAt, new Date())))
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
    .where(and(eq(reports.token, token), eq(packagesTable.kind, "found")));
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
    .where(and(eq(packagesTable.reportId, row.id), eq(packagesTable.kind, "found")));
  const suggestedPackages = await db
    .select({
      name: packagesTable.name,
      description: packagesTable.description,
      priceMin: packagesTable.priceMin,
      priceMax: packagesTable.priceMax,
      guestFit: packagesTable.guestFit,
      timing: packagesTable.timing,
      source: packagesTable.source,
    })
    .from(packagesTable)
    .where(and(eq(packagesTable.reportId, row.id), eq(packagesTable.kind, "suggested")));

  const guestPages = row.unlocked
    ? await db.select().from(samplePages).where(eq(samplePages.reportId, row.id))
    : [];
  const packageById = new Map(
    (
      await db
        .select({
          id: packagesTable.id,
          name: packagesTable.name,
          priceMin: packagesTable.priceMin,
          currency: packagesTable.currency,
          kind: packagesTable.kind,
        })
        .from(packagesTable)
        .where(eq(packagesTable.reportId, row.id))
    ).map((p) => [p.id, p]),
  );

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
  const heroAreas = areas.filter((a) => !a.skipped);

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
  const missingRange =
    row.missedLow != null && row.missedHigh != null ? `${money(row.missedLow)}–${money(row.missedHigh)}` : null;
  // funnel-bar fill fractions, normalized against the potential ceiling
  const barPct = (v: number) => Math.max(4, Math.min(100, Math.round((v / (est?.potentialHigh || 1)) * 100)));

  return (
    <>
      {/* Sample banner — required label (docs/08 §1); the design omits it, the
          claims rules don't — kept as its own band above the layout. */}
      <div className="bg-surface-alt text-white border-b border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-2 text-xs font-normal tracking-wide text-white/70">
          Sample made by UpLayer from your public website. Not live. · {TOOL_NAME}
        </p>
      </div>

      {/* the design is a fixed 1440 canvas (sidebar 270 + body 1170) — centered,
          white-guttered on wider screens */}
      <main className="mx-auto flex min-h-dvh w-full max-w-[1440px] items-start bg-white">
        <ReportSidebar token={token} dateLabel={titleCaseDate(row.createdAt)} missingRange={missingRange} />

        <div className="flex min-w-0 flex-1 flex-col items-start">
          {/* ——— HERO: ink band, dot grid, stat wrap-grid ——— */}
          <section className="bg-surface-alt relative w-full overflow-clip p-8 lg:p-16" data-testid="score-panel">
            <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
            <div className="relative flex w-full flex-col items-start">
              <div className="flex w-full flex-wrap items-center justify-between gap-3 lg:hidden">
                <CopyReportLink />
                <ShareReportLink />
              </div>

              <h1 className="font-notch mt-5 text-4xl font-semibold text-white lg:mt-0 lg:text-5xl">
                {row.hotel.name ?? (
                  <>
                    Your report — <span className="text-white/60">{row.hotel.domain}</span>
                  </>
                )}
              </h1>
              <p className="mt-3 max-w-[672px] text-base font-light leading-[1.6] text-white/70">
                We read {pagesFound} {pagesFound === 1 ? "page" : "pages"} of your website and spotted{" "}
                {packagesFound === 0 ? "no" : packagesFound} sellable {packagesFound === 1 ? "extra" : "extras"}
                {[row.hotel.city, row.hotel.country].filter(Boolean).length ? " in " : ""}
                {[row.hotel.city, row.hotel.country].filter(Boolean).join(", ")} — here&apos;s what they could be
                worth.
              </p>

              {/* stat grid — 331px blocks, 3-up only on the full 1440 canvas
                  (design 31:4353); narrower views hold 2-up so money stays one line */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 pt-10 sm:grid-cols-2 min-[1440px]:grid-cols-3">
                <div className="border-l-2 border-white/15 px-6" data-testid="missed-revenue">
                  <p className="text-[12px] font-normal uppercase tracking-[1.8px] text-white/50">
                    Missing per year
                  </p>
                  {missingRange ? (
                    <>
                      <p className="font-notch mt-2 text-5xl font-semibold text-brand lg:text-[52px]" data-testid="missed-range">
                        {missingRange}
                      </p>
                      <p className="mt-2 text-xs font-light text-white/50">estimate · pre-arrival revenue</p>
                    </>
                  ) : (
                    <p className="mt-2 text-sm font-light text-white/80">
                      Add your room count at unlock to see the estimate.
                    </p>
                  )}
                </div>

                <div className="border-l-2 border-white/15 px-6">
                  <p className="text-[12px] font-normal uppercase tracking-[1.8px] text-white/50">
                    Potential per year
                  </p>
                  {est ? (
                    <>
                      <p className="font-notch mt-2 text-5xl font-semibold text-[#4F8CFC] lg:text-[52px]">
                        {money(est.potentialLow)}–{money(est.potentialHigh)}
                      </p>
                      <p className="mt-2 text-xs font-light text-white/50">estimate · pre-arrival revenue</p>
                    </>
                  ) : (
                    <p className="mt-2 text-sm font-light text-white/80">Computed once a room count is set.</p>
                  )}
                </div>

                <div className="border-l-2 border-white/15 px-6">
                  <p className="text-[12px] font-normal uppercase tracking-[1.8px] text-white/50">Upsell score</p>
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
                        className="font-notch absolute inset-0 flex items-center justify-center text-base font-semibold text-white"
                      >
                        {row.scoreTotal ?? 0}
                      </span>
                      <span className="sr-only">
                        Upsell score: {row.scoreTotal ?? 0} of {row.scoreOutOf ?? 100}
                      </span>
                    </div>
                    <p className="font-notch text-5xl font-semibold text-white lg:text-[52px]">{row.scoreTotal ?? 0}</p>
                    <div>
                      <span
                        data-testid="grade-badge"
                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold ${
                          GRADE_STYLES[row.scoreGrade ?? "F"] ?? GRADE_STYLES.F
                        }`}
                      >
                        {row.scoreGrade ?? "–"} grade
                      </span>
                      <p className="mt-1 text-xs font-light text-white/50">of {row.scoreOutOf ?? 100} pts</p>
                    </div>
                  </div>
                </div>

                {heroAreas.map((a) => {
                  const pct = a.points / (a.max || 1);
                  return (
                    <div key={a.area} className="border-l-2 border-white/15 px-6">
                      <p className="text-[12px] font-normal uppercase tracking-[1.8px] text-white/50">
                        {a.label ?? a.area}
                      </p>
                      <p className="font-notch mt-2 text-5xl font-semibold text-white lg:text-[52px]">
                        {a.points}/{a.max}
                      </p>
                      <p className="mt-2 text-xs font-light text-white/50">
                        {pct >= 0.75 ? "On track" : pct >= 0.4 ? "Needs improvements" : "Starting point"}
                      </p>
                    </div>
                  );
                })}

                <div className="border-l-2 border-white/15 px-6">
                  <p className="text-[12px] font-normal uppercase tracking-[1.8px] text-white/50">Extras spotted</p>
                  <p className="font-notch mt-2 text-5xl font-semibold tabular-nums text-white lg:text-[52px]">
                    {packagesFound}
                  </p>
                  <p className="mt-2 text-xs font-light text-white/50">{pricedCount} with prices · keyword scan</p>
                </div>
              </div>

              {/* the CTA row — inside the hero, unmissable */}
              <div className="flex flex-col items-start gap-4 pt-10 print:hidden sm:flex-row sm:items-center">
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

          {/* ——— The elaboration ——— */}
          <div className="w-full px-8 pb-16 lg:px-16">
            {/* 1. Where the estimate comes from — big stats + funnel bars */}
            <section className="pt-16" id="estimate" data-testid="estimate-panel">
              <SectionHead
                title="Where the estimate comes from"
                sub="The math behind the numbers above — every factor labeled."
              />
              {est ? (
                <div className="flex flex-col items-start gap-5 pt-5 lg:flex-row">
                  <div className="flex w-full flex-col justify-center gap-8 whitespace-nowrap lg:w-[349px] lg:shrink-0">
                    <div className="border-l-2 border-body/15 px-6">
                      <p className="text-body text-[12px] font-normal uppercase tracking-[1.8px]">Bookings a year</p>
                      <p className="font-notch mt-2 text-5xl font-semibold text-ink lg:text-[52px]">
                        {est.bookings.toLocaleString()}
                      </p>
                      <p className="text-body mt-2 text-xs font-light">
                        {row.hotel.roomCount} rooms × {Math.round(DEFAULTS.occupancy * 100)}% ÷{" "}
                        {DEFAULTS.avgStayNights} nights
                      </p>
                    </div>
                    <div className="border-l-2 border-body/15 px-6">
                      <p className="text-body text-[12px] font-normal uppercase tracking-[1.8px]">Guests who buy</p>
                      <p className="font-notch mt-2 text-5xl font-semibold text-ink lg:text-[52px]">
                        {Math.round(DEFAULTS.takeRateLow * 100)}–{Math.round(DEFAULTS.takeRateHigh * 100)}%
                      </p>
                      <p className="text-body mt-2 text-xs font-light">industry, vendor reported</p>
                    </div>
                    <div className="border-l-2 border-body/15 px-6">
                      <p className="text-body text-[12px] font-normal uppercase tracking-[1.8px]">
                        Spend per booking
                      </p>
                      <p className="font-notch mt-2 text-5xl font-semibold text-ink lg:text-[52px]">${est.spend}</p>
                      <p className="text-body mt-2 text-xs font-light">Revinate baseline</p>
                    </div>
                    <div className="border-l-2 border-body/15 px-6">
                      <p className="text-body text-[10px] font-normal uppercase tracking-[1.8px]">
                        Already captured
                      </p>
                      <p className="font-notch mt-2 text-5xl font-semibold text-ink lg:text-[52px]">
                        ≈{Math.round(capturedPct)}%
                      </p>
                      <p className="text-body mt-2 text-xs font-light">internal assumption</p>
                    </div>
                  </div>

                  <div className="border-brand/15 bg-brand/[0.04] relative min-w-0 flex-1 self-stretch overflow-clip border p-6">
                    <div className="flex h-full flex-col gap-6">
                      <div className="flex min-h-[360px] flex-1 items-stretch gap-6">
                        {/* Missing — amber */}
                        <div className="flex h-full min-w-0 flex-1 flex-col gap-2 overflow-clip">
                          <div className="bg-border/30 relative min-h-0 flex-1 overflow-clip">
                            <div className="bg-brand absolute bottom-0 w-full" style={{ height: `${barPct(est.missedHigh)}%` }} />
                          </div>
                          <p className="text-body text-[12px] font-normal uppercase tracking-[1.8px]">Missing</p>
                          <p className="font-notch text-brand text-4xl font-semibold">
                            {money(est.missedLow)}–{money(est.missedHigh)}
                          </p>
                          <p className="text-body text-xs font-light">per year</p>
                        </div>
                        {/* Capturing now — neutral */}
                        <div className="flex h-full min-w-0 flex-1 flex-col gap-2 overflow-clip">
                          <div className="bg-border/30 relative min-h-0 flex-1 overflow-clip">
                            <div
                              className="absolute bottom-0 w-full bg-[#A2A3A8]"
                              style={{ height: `${barPct(captured)}%` }}
                            />
                          </div>
                          <p className="text-body text-[12px] font-normal uppercase tracking-[1.8px]">
                            Capturing now
                          </p>
                          <p className="font-notch text-ink text-4xl font-semibold">≈{money(captured)}</p>
                          <p className="text-body text-xs font-light">per year</p>
                        </div>
                        {/* Potential — hairline blue */}
                        <div className="flex h-full min-w-0 flex-1 flex-col gap-2 overflow-clip">
                          <div className="bg-border/30 relative min-h-0 flex-1 overflow-clip">
                            <div
                              className="absolute bottom-0 w-full bg-[#4F8CFC]"
                              style={{ height: `${barPct(est.potentialHigh)}%` }}
                            />
                          </div>
                          <p className="text-body text-[12px] font-normal uppercase tracking-[1.8px]">Potential</p>
                          <p className="font-notch text-ink text-4xl font-semibold">
                            {money(est.potentialLow)}–{money(est.potentialHigh)}
                          </p>
                          <p className="text-body text-xs font-light">per year</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground w-full text-xs font-light leading-[1.6]">
                        Estimate. Defaults editable at unlock: {Math.round(DEFAULTS.occupancy * 100)}% occupancy,{" "}
                        {DEFAULTS.avgStayNights}-night stay. Spend per booking is OTA-derived when we could match your
                        listing, otherwise the $95 industry baseline applies.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-card border-hairline/20 mt-5 border p-5">
                  <p className="text-body text-sm font-light">
                    Room count wasn&apos;t found on your public pages. Add it at unlock and this section computes your
                    potential, what you already capture, and what&apos;s missing.
                  </p>
                </div>
              )}
            </section>

            {/* 2. Start with these — tinted cards, worst first */}
            {topFixes.length > 0 && (
              <section className="pt-16" data-testid="action-panel">
                <SectionHead title="Start with these" sub="The three lowest-scored areas, highest impact first." />
                <div className="grid gap-4 pt-5 md:grid-cols-3">
                  {topFixes.map((a, i) => {
                    const Icon = i === 0 ? Wrench : i === 1 ? MonitorSmartphone : UserRound;
                    return (
                      <div
                        key={a.area}
                        className="bg-card border-hairline/20 shadow-upl-sm flex flex-col items-start gap-4 self-stretch border p-6"
                      >
                        <div className="flex w-full items-start gap-4">
                          <div className="min-w-0 flex-1">
                            <p
                              className={`font-notch text-5xl font-semibold ${
                                a.points / (a.max || 1) < 0.4 ? "text-destructive" : "text-ink"
                              }`}
                            >
                              {a.points}/{a.max}
                            </p>
                            <p className="font-head mt-1 text-lg font-semibold text-ink">{a.label ?? a.area}</p>
                          </div>
                          <span className="bg-ink flex size-8 shrink-0 items-center justify-center">
                            <Icon className="h-4 w-4 text-white" aria-hidden />
                          </span>
                        </div>
                        <p className="text-body w-full text-sm font-light leading-[1.6]">{a.finding}</p>
                        <div className="flex w-full flex-col items-start gap-2">
                          <FixChip small />
                          <p className="text-body w-full text-xs font-normal leading-[1.6]">{a.fix}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 3. Your numbers, live — unlock-gated ROI editor (brief §7) */}
            <section className="pt-16" data-testid="roi-section" id="unlock">
              <SectionHead
                title="Your numbers, live"
                sub="Edit rooms, occupancy and stay length — payback and the 3-year math recompute instantly."
              />
              <div className="pt-5">
                {row.unlocked ? (
                  <div className="bg-card border-hairline/20 shadow-upl-sm border p-5 md:p-6">
                    <RoiEditor
                      token={token}
                      rooms={row.hotel.roomCount ?? 40}
                      starRating={row.hotel.starRating}
                      initial={{
                        occupancy: row.inputs.occupancy,
                        avgStayNights: row.inputs.avgStayNights,
                        currentUpsellRevenue: row.inputs.currentUpsellRevenue,
                        buildPrice: row.inputs.buildPrice,
                        carePlan: row.inputs.carePlan,
                      }}
                    />
                  </div>
                ) : (
                  /* Unlock pitch — full-width illustrated panel (design 31:4497) */
                  <div className="border-brand/15 bg-brand/[0.04] relative flex flex-col items-start gap-16 overflow-clip px-8 py-12 lg:h-[480px] lg:flex-row lg:items-center lg:px-24">
                    <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
                    {/* decorative glow — oversized positioned SVG, no optimization wanted */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/report/glow-amber.svg"
                      alt=""
                      aria-hidden
                      className="pointer-events-none absolute -top-52 right-0 h-[700px] w-auto max-w-none"
                    />
                    <div className="relative flex min-w-0 flex-1 flex-col items-start gap-8">
                      <div className="w-full">
                        <h3 className="font-notch text-ink text-2xl font-semibold leading-7">
                          Unlock the live ROI editor, free
                        </h3>
                        <p className="text-body mt-3 w-full text-sm font-light leading-[1.6]">
                          Your rooms, occupancy and stay length recompute payback month and the 3-year
                          UpLayer-vs-SaaS comparison on the spot. No credit card, no obligation.
                        </p>
                        <ul className="text-muted-foreground mt-4 list-disc space-y-2 ps-5 text-sm font-light leading-5">
                          <li>Payback month on the build</li>
                          <li>3-year revenue kept vs an upsell SaaS</li>
                          <li>Low / mid / high take-rate scenarios</li>
                        </ul>
                      </div>
                      <div className="flex w-full flex-col items-start gap-2">
                        <UnlockForm token={token} suggestedRooms={row.hotel.roomCount} collapsed />
                        <CtaButton
                          token={token}
                          placement="panel"
                          variant="ink"
                          size="md"
                          label="Book a 15-minute walkthrough of your report"
                          testid="cta-panel-walkthrough"
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="relative hidden h-[400px] w-[323px] shrink-0 xl:block">
                      <Image
                        src="/report/unlock-swirl.png"
                        alt=""
                        aria-hidden
                        width={442}
                        height={547}
                        className="pointer-events-none size-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 4. What we found — six horizontal score cards */}
            <section className="pt-16">
              <SectionHead title="What we found" sub="Score by area, one fix each — lowest first." />
              <ul data-testid="findings" className="flex flex-col gap-4 pt-5">
                {areas.map((a) => {
                  const isWorst = worstArea != null && a.area === worstArea.area;
                  return (
                    <li
                      key={a.area}
                      className="bg-card border-hairline/20 shadow-upl-sm flex flex-col items-start gap-8 border p-6 lg:flex-row lg:items-center"
                    >
                      <div className="w-full shrink-0 lg:w-60">
                        <p
                          className={`font-notch text-5xl font-semibold leading-[48px] ${
                            a.skipped ? "text-muted-foreground" : isWorst ? "text-destructive" : "text-ink"
                          }`}
                        >
                          {a.skipped ? "–" : `${a.points}/${a.max}`}
                        </p>
                        <p className="font-head mt-1 text-lg font-semibold text-ink">{a.label ?? a.area}</p>
                      </div>
                      <p className="text-body min-w-0 flex-1 text-sm font-light leading-[1.6]">{a.finding}</p>
                      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                        <FixChip small />
                        <p className="text-body text-sm font-normal leading-[1.6]">{a.fix}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 5. Your stack — fingerprint rows */}
            <section className="pt-16">
              <SectionHead title="Your stack" sub="What your public pages fingerprint as." />
              <div className="grid gap-4 pt-5 sm:grid-cols-2">
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
                  <div key={s.label} className="bg-border/20 flex items-start gap-3 border border-transparent p-4">
                    <span className="bg-ink flex size-8 shrink-0 items-center justify-center">
                      <s.icon className="h-4 w-4 text-white" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-body min-w-0 flex-1 text-sm font-normal leading-5">{s.label}</p>
                        <span
                          className={`px-1.5 py-0.5 text-[10px] font-normal uppercase tracking-[1.2px] ${
                            s.value ? "bg-success/[0.12] text-[#00805F]" : "bg-border/50 text-muted-foreground"
                          }`}
                        >
                          {s.value ? "Detected" : "None"}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs font-light">{s.sub}</p>
                      <p
                        className={`font-notch mt-3 text-2xl font-normal leading-6 ${s.value ? "text-ink" : "text-muted-foreground"}`}
                        data-testid={s.testid}
                      >
                        {s.value ?? "Not detected"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Packages we spotted — table */}
            <section className="pt-16">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-notch text-ink text-2xl font-semibold lg:text-4xl">
                    Packages we spotted<span className="text-brand">.</span>
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm font-light">
                    Sellable items found on your public pages — {pricedCount} show a price.
                  </p>
                </div>
                <span className="text-muted-foreground text-xs font-light tabular-nums" data-testid="pages-found">
                  {pagesFound} · {packagesFound}
                </span>
              </div>
              {foundPackages.length ? (
                <div className="bg-card border-hairline/20 shadow-upl-sm mt-5 overflow-x-auto border px-5 py-2">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead>
                      <tr>
                        {["Package", "Group", "From", "Presentation"].map((h) => (
                          <th
                            key={h}
                            className="text-muted-foreground py-3 text-[10px] font-normal uppercase tracking-[1.8px]"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {foundPackages.map((p) => {
                        const checks = [p.hasPhoto, p.hasPrice, p.hasDescription];
                        const score = checks.filter(Boolean).length;
                        return (
                          <tr key={p.name} className="border-hairline/15 border-t">
                            <td className="text-ink py-3 pr-4 font-normal">{p.name}</td>
                            <td className="text-body py-3 pr-4 font-light">
                              {CATEGORY_LABELS[p.category ?? ""] ?? p.category ?? "—"}
                            </td>
                            <td className="text-body py-3 pr-4 font-light tabular-nums">
                              {p.priceMin != null ? (
                                `${p.currency === "EUR" ? "€" : "$"}${p.priceMin}`
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </td>
                            <td className="py-3">
                              <PresentationPill score={score} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-card border-hairline/20 shadow-upl-sm mt-5 border p-5">
                  <p className="text-body text-sm font-light">
                    No sellable items spotted yet — the next build reads deeper (booking engine extras, OTA listings)
                    and drafts package ideas for your hotel type.
                  </p>
                </div>
              )}
            </section>

            {/* 7. Packages you could sell — unlock-gated ideas (brief §8) */}
            <section className="pt-16" data-testid="ideas-section">
              <div className="pt-5">
                {row.unlocked ? (
                  <>
                    <SectionHead
                      title="Packages you could sell"
                      sub="Drafted for your hotel type and location — never contradicting what we found. Prices are suggested, set your own."
                    />
                    <div className="grid gap-4 pt-5 md:grid-cols-2 lg:grid-cols-3">
                      {suggestedPackages.map((idea) => (
                        <div key={idea.name} className="bg-card border-hairline/20 shadow-upl-sm border p-5">
                          <div className="flex items-baseline justify-between gap-3">
                            <h3 className="text-ink text-sm font-semibold">{idea.name}</h3>
                            <span className="border-hairline/30 text-muted-foreground shrink-0 border px-2 py-0.5 text-[10px] font-normal uppercase tracking-[0.14em]">
                              Suggested
                            </span>
                          </div>
                          <p className="text-body mt-2 text-sm font-light leading-[1.6]">{idea.description}</p>
                          <dl className="text-muted-foreground mt-4 space-y-1 border-t border-hairline/15 pt-3 text-xs">
                            {idea.guestFit ? <div>fits: <span className="text-body">{idea.guestFit}</span></div> : null}
                            {idea.timing ? <div>best timing: <span className="text-body">{idea.timing}</span></div> : null}
                            {idea.priceMin != null ? (
                              <div>
                                suggested:{" "}
                                <span className="text-ink font-semibold tabular-nums">
                                  ${idea.priceMin}
                                  {idea.priceMax != null && idea.priceMax !== idea.priceMin ? `–$${idea.priceMax}` : ""}
                                </span>
                              </div>
                            ) : null}
                          </dl>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Ideas unlock pitch — ink illustrated panel (design 31:4599) */
                  <div className="bg-surface-alt border-brand/15 relative flex flex-col items-start gap-16 overflow-clip border px-8 py-12 lg:h-[480px] lg:flex-row lg:items-center lg:px-24">
                    <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/report/glow-blue.svg"
                      alt=""
                      aria-hidden
                      className="pointer-events-none absolute -bottom-36 left-1/2 h-[500px] w-auto max-w-none -translate-x-1/2"
                    />
                    {/* decorative glow — oversized positioned SVG, no optimization wanted */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/report/glow-amber.svg"
                      alt=""
                      aria-hidden
                      className="pointer-events-none absolute -top-52 right-0 h-[700px] w-auto max-w-none"
                    />
                    <div className="relative flex min-w-0 flex-1 flex-col items-start gap-8">
                      <div className="w-full">
                        <h3 className="font-notch text-2xl font-semibold leading-7 text-white">
                          {suggestedPackages.length} package ideas, drafted for your hotel
                        </h3>
                        <p className="mt-3 w-full text-sm font-light leading-[1.6] text-white/70">
                          Unlock to see every idea with the pitch, guest fit, best timing and a suggested price
                          range. Same unlock as the ROI editor — no credit card.
                        </p>
                        <ul className="mt-4 list-disc space-y-2 ps-5 text-sm font-light leading-5 text-white/60">
                          {suggestedPackages.slice(0, 3).map((i) => (
                            <li key={i.name}>{i.name}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex w-full flex-col items-start gap-2">
                        <UnlockForm token={token} suggestedRooms={row.hotel.roomCount} collapsed />
                        <CtaButton
                          token={token}
                          placement="footer"
                          variant="outline"
                          size="md"
                          label="Book a 15-minute walkthrough of your report"
                          testid="cta-walkthrough"
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="relative hidden h-[400px] w-[323px] shrink-0 xl:block">
                      <Image
                        src="/report/unlock-swirl.png"
                        alt=""
                        aria-hidden
                        width={442}
                        height={547}
                        className="pointer-events-none size-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 8. Guest pages — unlocked sample panels (brief §6) */}
            {row.unlocked && (
              <section className="pt-16" data-testid="guest-pages">
                <SectionHead
                  title="Your guests, three ways"
                  sub="Sample pages in your brand — family, couple, business. Samples only: nothing is charged, buttons are inactive."
                />
                <div className="grid gap-4 pt-5 lg:grid-cols-3">
                  {GUEST_PROFILES.map((profile) => {
                    const page = guestPages.find((g) => g.profile === profile.id);
                    const accent = row.brandAssets?.primary ?? "#FF9E00";
                    return (
                      <div key={profile.id} className="bg-card border-hairline/20 shadow-upl-sm border" data-testid={`guest-${profile.id}`}>
                        <div style={{ backgroundColor: accent }} className="h-1.5 w-full" aria-hidden />
                        <div className="p-5">
                          <h3 className="font-head text-ink text-lg font-semibold">{profile.label}</h3>
                          <p className="text-muted-foreground mt-1 text-xs">
                            {profile.party} · {profile.nights} {profile.nights === 1 ? "night" : "nights"} · {profile.channel}
                          </p>
                          {page ? (
                            <ul className="divide-hairline/15 mt-4 divide-y">
                              {(page.picks ?? []).map((pick) => {
                                const pkg = packageById.get(pick.packageId);
                                const price = pkg?.priceMin ?? null;
                                return (
                                  <li key={pick.packageId} className="py-3">
                                    <div className="flex items-baseline justify-between gap-3">
                                      <span className="text-ink text-sm font-semibold">
                                        {pkg?.name ?? "Package"}
                                        {pkg?.kind === "suggested" ? (
                                          <span className="text-muted-foreground ml-2 text-[10px] font-normal uppercase tracking-[0.12em]">
                                            idea
                                          </span>
                                        ) : null}
                                      </span>
                                      {price != null ? (
                                        <span className="text-body text-xs tabular-nums">
                                          {pkg?.currency === "EUR" ? "€" : "$"}
                                          {price}
                                        </span>
                                      ) : null}
                                    </div>
                                    <p className="text-body mt-1 text-xs font-light leading-[1.5]">{pick.perGuestLine}</p>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground mt-4 text-xs">Being drafted — refresh shortly.</p>
                          )}
                          {/* payment pair — rendered disabled by code, never the LLM (docs/03 §4.2) */}
                          <div className="mt-4 space-y-1.5">
                            <button
                              type="button" disabled
                              className="w-full cursor-not-allowed border border-transparent p-2 text-center text-xs font-normal opacity-60"
                              style={{ backgroundColor: accent, color: "#222" }}
                            >
                              Pay now — save 10%
                            </button>
                            <button
                              type="button" disabled
                              className="border-border text-body w-full cursor-not-allowed border p-2 text-center text-xs font-normal opacity-60"
                            >
                              Reserve, pay at arrival
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* ——— FOOTER — ink band, brand + links + claims discipline ——— */}
          <footer className="bg-surface-alt w-full px-8 py-16 lg:px-[104px] print:hidden">
            <div className="flex flex-wrap items-start justify-between gap-10">
              <div>
                <p className="font-notch text-2xl font-semibold text-white">
                  UpLayer<span className="text-brand">.</span>
                </p>
                <p className="mt-3 max-w-[384px] text-sm font-light leading-6 text-[#A6A29B]">
                  The personalized booking upsell experience — built for your hotel, measured against your numbers.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 text-sm font-normal text-white sm:items-end">
                <Link href="/" className="hover:text-brand">How it works</Link>
                <Link href="/#what-you-get" className="hover:text-brand">What you get</Link>
                <Link href="/remove" className="text-hairline hover:underline">Remove my report</Link>
              </div>
            </div>
            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-xs font-light leading-[18px] text-[#A6A29B]">
                Estimates only — every figure is labeled. Industry data is vendor reported; no UpLayer results are
                claimed. Crawling respects robots.txt, reads public pages only, and never books or submits forms.
                Removal: /remove.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
