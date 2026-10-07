import Link from "next/link";

// Primary navigation — 72px, ink body color, hairline hover (docs/10-DESIGN.md §4).
export function SiteNav() {
  return (
    <header className="border-border/60 bg-background/90 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-notch text-ink text-2xl font-semibold tracking-tight">
            UpLayer
          </span>
          <span className="text-body text-sm font-normal">/ Booking Upsell Report</span>
        </Link>
        <nav className="text-body flex items-center gap-8 text-[15px] font-normal">
          <Link href="/#how" className="hover:text-hairline transition-colors">
            How it works
          </Link>
          <Link href="/#report" className="hover:text-hairline transition-colors">
            What you get
          </Link>
          <a
            href="#get-report"
            className="bg-primary text-on-primary hover:brightness-95 inline-flex h-10 items-center px-5 text-sm font-normal transition-[filter]"
          >
            Get my report
          </a>
        </nav>
      </div>
    </header>
  );
}

// Footer band — surface-alt, white text, 64px block padding (docs/10-DESIGN.md §4).
export function SiteFooter() {
  return (
    <footer className="bg-surface-alt text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="font-notch text-2xl font-semibold">
              UpLayer<span className="text-primary">.</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#A6A29B]">
              The personalized booking upsell experience — built for your hotel,
              measured against your numbers.
            </p>
          </div>
          <nav className="flex flex-col gap-3 text-sm font-normal md:items-end">
            <Link href="/#how" className="hover:text-primary transition-colors">
              How it works
            </Link>
            <Link href="/#report" className="hover:text-primary transition-colors">
              What you get
            </Link>
            <Link href="/remove" className="hover:text-primary transition-colors">
              Remove my report
            </Link>
          </nav>
        </div>
        <div className="mt-14 border-t border-white/10 pt-6 text-xs leading-5 text-[#A6A29B]">
          Estimates only — every figure is labeled. Industry data is vendor
          reported; no UpLayer results are claimed. Crawling respects robots.txt,
          reads public pages only, and never books or submits forms.
        </div>
      </div>
    </footer>
  );
}
