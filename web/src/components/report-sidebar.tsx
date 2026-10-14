import { CtaButton } from "@/components/cta-button";
import { CopyReportLink, ShareReportLink } from "@/components/report-actions";

// Sticky side-nav from the Figma report design (node 31:1413): brand mark,
// report title + date, share actions, section links, and the missing-revenue
// CTA card pinned to the bottom. Desktop only — below lg the hero CTA row and
// a compact action row carry the same functions (F32: no overflow at 390px).
export function ReportSidebar({
  token,
  dateLabel,
  missingRange,
}: {
  token: string;
  dateLabel: string;
  missingRange: string | null;
}) {
  return (
    <aside className="border-border/60 bg-white/90 sticky top-0 hidden h-dvh w-[270px] shrink-0 flex-col border-r backdrop-blur lg:flex print:hidden">
      <div className="flex flex-1 flex-col items-start gap-12 p-8">
        <div className="flex h-8 items-center gap-1.5">
          {/* UpLayer mark + wordmark (Figma logo frame 31:1416) — inline SVGs */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/uplayer-mark.svg" alt="UpLayer" className="h-7 w-auto" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/uplayer-wordmark.svg" alt="" className="h-7 w-auto" />
        </div>

        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center gap-2 text-center">
            <p className="font-head text-ink text-2xl font-semibold">Upsell Report</p>
            <p className="text-body text-sm font-normal">{dateLabel}</p>
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <div className="border-ink/10 bg-ink/5 flex h-10 w-full items-center justify-center border px-5">
              <ShareReportLink className="text-ink text-sm font-normal" label="Share Report" />
            </div>
            <div className="border-ink/10 bg-ink/5 flex h-10 w-full items-center justify-center border px-5">
              <CopyReportLink className="text-ink text-sm font-normal" />
            </div>
          </div>
        </div>

        <nav className="flex w-full flex-col items-center gap-4 text-[15px] leading-normal whitespace-nowrap">
          <a href="#estimate" className="text-surface-alt font-bold hover:underline">
            Overview
          </a>
          <a href="#unlock" className="text-body hover:text-hairline font-normal">
            Full Report
          </a>
        </nav>
      </div>

      <div className="from-[#1c47f1] to-surface-alt relative flex max-h-[320px] flex-1 flex-col items-center justify-center gap-6 overflow-clip border-t border-white/10 bg-gradient-to-b p-8">
        <div className="bg-dot-grid pointer-events-none absolute inset-x-0 top-0 h-60 opacity-[0.12]" aria-hidden />
        <div className="relative w-full text-center whitespace-nowrap">
          <p className="font-notch text-4xl font-semibold text-white">{missingRange ?? "—"}</p>
          <p className="mt-1 text-sm font-light text-white/60">/yr missing · est.</p>
        </div>
        <CtaButton
          token={token}
          placement="sidebar"
          size="sm"
          label="Book a walkthrough"
          testid="cta-sidebar-button"
          className="relative w-full"
        />
      </div>
    </aside>
  );
}
