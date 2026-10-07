import Link from "next/link";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { SubmitForm } from "@/components/submit-form";

const STEPS = [
  { n: "01", title: "We read your public pages", body: "Name, rooms, facilities, packages — politely, robots.txt respected, never booking or submitting a form." },
  { n: "02", title: "We find your packages", body: "Dining, spa, transfers, early check-in, late checkout — everything a guest would buy before arrival." },
  { n: "03", title: "We run your numbers", body: "Upsell score, missed-revenue estimate, payback math — every figure labeled as an estimate or vendor-reported industry data." },
  { n: "04", title: "You get your report", body: "Three sample guest pages in your brand, a live ROI editor, and a PDF in your inbox. No email needed to look." },
];

export default function Home() {
  return (
    <div className="min-h-dvh">
      <SiteNav />

      <main>
        {/* ——— Hero: dotted atmosphere + blurred blue haze + display type ——— */}
        <section id="get-report" className="relative overflow-hidden">
          <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div className="bg-blue-haze pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2" aria-hidden />

          <div className="relative mx-auto max-w-[1280px] px-6 pb-24 pt-20 md:pt-28">
            <p className="reveal reveal-1 text-ink text-sm font-normal uppercase tracking-[0.2em]">
              Free · no email to preview
            </p>
            <h1 className="font-notch text-ink reveal reveal-2 mt-6 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-display sm:text-7xl lg:text-[96px]">
              Find the revenue<br />you&apos;re missing<span className="text-brand">.</span>
            </h1>
            <p className="text-body reveal reveal-3 mt-8 max-w-2xl text-lg font-light leading-[1.63] md:text-xl">
              Enter your hotel&apos;s website. In about a minute: your upsell score,
              the pre-arrival revenue you&apos;re likely missing, and what personalized
              offer pages would look like in your brand.
            </p>

            <div className="reveal reveal-4 mt-12">
              <SubmitForm />
              <p className="text-body mt-4 text-xs">
                Public pages only · robots.txt respected · never books or submits forms ·{" "}
                <Link href="/remove" className="text-hairline hover:underline">
                  removal requests
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ——— How it works: dark band, amber numerals ——— */}
        <section id="how" className="bg-surface-alt text-white">
          <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
            <h2 className="font-notch text-3xl font-semibold md:text-5xl">
              How it works<span className="text-brand">.</span>
            </h2>
            <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <li key={s.n} className="border-t border-white/10 pt-6">
                  <div className="font-notch text-brand text-4xl font-semibold">{s.n}</div>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm font-light leading-[1.6] text-[#A6A29B]">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ——— What you get: surface cards, hairline borders, micro-shadows ——— */}
        <section id="report" className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
          <h2 className="font-notch text-ink text-3xl font-semibold md:text-5xl">
            What you get<span className="text-brand">.</span>
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Score card */}
            <article className="border-hairline/20 bg-card p-6 shadow-upl-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">Upsell score</h3>
                <span className="bg-success text-on-primary flex h-10 w-10 items-center justify-center text-lg font-semibold">
                  B
                </span>
              </div>
              <p className="text-body mt-3 text-sm font-light leading-[1.6]">
                A–F grade across six areas — packages, sellability, reach,
                presentation, personalization, mobile — each with a one-line fix.
              </p>
              <dl className="mt-5 space-y-2 border-t border-hairline/15 pt-4 text-sm">
                {["Packages exist", "Sellable online", "Pre-arrival reach"].map((label, i) => (
                  <div key={label} className="flex items-center justify-between">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-normal tabular-nums">{[18, 12, 4][i]}/20</dd>
                  </div>
                ))}
              </dl>
            </article>

            {/* Guest page card */}
            <article className="border-hairline/20 bg-card p-6 shadow-upl-sm">
              <h3 className="text-base font-semibold">Guest pages, three ways</h3>
              <div className="bg-background mt-4 border border-hairline/20 p-4 shadow-upl-md">
                <div className="text-muted-foreground text-[10px] uppercase tracking-[0.18em]">Family of 4 · Expedia</div>
                <div className="mt-2 space-y-1.5 text-sm">
                  <div className="text-ink font-normal">Breakfast for 4</div>
                  <div className="text-ink font-normal">Early check-in · 12:00</div>
                  <div className="text-ink font-normal">Parking, 3 nights</div>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="bg-primary text-on-primary px-2.5 py-1 text-xs font-normal">Pay now −10%</span>
                  <span className="border-border text-body border px-2.5 py-1 text-xs font-normal">Pay at arrival</span>
                </div>
              </div>
              <p className="text-body mt-4 text-sm font-light leading-[1.6]">
                Family, couple, business — your real packages, matched and written
                per guest, in your branding.
              </p>
            </article>

            {/* Numbers card */}
            <article className="border-hairline/20 bg-card p-6 shadow-upl-sm">
              <h3 className="text-base font-semibold">Your numbers, live</h3>
              <div className="mt-4">
                <div className="font-notch text-ink text-4xl font-semibold tracking-display">$38–71k</div>
                <div className="text-muted-foreground mt-1 text-xs">estimated pre-arrival revenue missed per year</div>
              </div>
              <p className="text-body mt-4 text-sm font-light leading-[1.6]">
                Edit rooms, occupancy and stay length — payback and the 3-year
                UpLayer-vs-SaaS math recompute instantly.
              </p>
            </article>
          </div>
        </section>

        {/* ——— Closing CTA: dark band + outline button (70px per spec) ——— */}
        <section className="bg-surface-alt relative overflow-hidden text-white">
          <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" aria-hidden />
          <div className="relative mx-auto max-w-[1280px] px-6 py-16 text-center md:py-24">
            <h2 className="font-notch mx-auto max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
              See what your hotel is <span className="text-brand">not selling</span> yet.
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#get-report"
                className="text-on-primary inline-flex h-[70px] items-center bg-primary px-10 text-base font-normal transition-[filter] hover:brightness-95"
              >
                Get my free report
              </a>
              <a
                href="#how"
                className="text-canvas hover:border-hairline inline-flex h-[70px] items-center border border-white/10 bg-white/5 px-8 text-base font-normal transition-colors"
              >
                How it works
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
