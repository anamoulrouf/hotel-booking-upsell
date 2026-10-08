// Transactional email via Resend (brief §11): report delivery to the lead +
// sales alert. RESEND_BASE_URL overrides to a stub in tests; RESEND_API_KEY
// unset ⇒ null (email skipped, nothing breaks).
import { EMAIL_FROM, RESEND_API_KEY, RESEND_BASE_URL } from "@/lib/env";

export type ReportEmailInput = {
  to: string;
  name: string;
  hotelName: string;
  reportUrl: string;
  pdfUrl: string | null;
};

// User-controlled values (lead name) and crawl/LLM-derived values (hotel
// name) are escaped — CLAUDE.md rule 2 applies to email copy too.
function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function reportEmailSubject(input: ReportEmailInput): string {
  return `Your upsell report — ${input.hotelName.replace(/[<>]/g, "")}`;
}

export function reportEmailHtml(input: ReportEmailInput): string {
  const pdfLine = input.pdfUrl
    ? `<p style="margin:12px 0"><a href="${esc(input.pdfUrl)}" style="color:#0F65F4">Download the PDF copy</a></p>`
    : "";
  return `
<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#0F172A">
  <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#64748B">UpLayer · Booking Upsell Report</p>
  <h1 style="font-size:22px;margin:8px 0 16px">Hi ${esc(input.name)}, here's your report for ${esc(input.hotelName)}.</h1>
  <p style="line-height:1.6;color:#334155">
    It covers your upsell score, the pre-arrival revenue you're likely missing,
    the booking flow gaps we found, and the packages your guests could buy.
    Every number is an estimate or industry data, vendor reported.
  </p>
  <p style="margin:20px 0">
    <a href="${esc(input.reportUrl)}" style="background:#FF9E00;color:#222;padding:12px 24px;text-decoration:none;font-weight:500">Open your report</a>
  </p>
  ${pdfLine}
  <p style="margin:24px 0 0;color:#64748B;font-size:13px">
    Want the 15-minute walkthrough of your numbers? Reply to this email — we'll
    bring the report.
  </p>
</div>`;
}

export function salesAlertHtml(input: ReportEmailInput & { grade: string | null; missedLow: number | null; missedHigh: number | null }): string {
  const missed =
    input.missedLow != null && input.missedHigh != null
      ? `$${Math.round(input.missedLow / 1000)}k–$${Math.round(input.missedHigh / 1000)}k/yr (est.)`
      : "unknown (no room count)";
  return `
<div style="font-family:system-ui,sans-serif;color:#0F172A">
  <p><strong>New unlocked lead.</strong></p>
  <ul>
    <li>Name: ${esc(input.name)}</li>
    <li>Email: ${esc(input.to)}</li>
    <li>Hotel: ${esc(input.hotelName)}</li>
    <li>Grade: ${esc(input.grade ?? "–")}</li>
    <li>Missing revenue: ${missed}</li>
    <li>Report: <a href="${esc(input.reportUrl)}">${esc(input.reportUrl)}</a></li>
  </ul>
</div>`;
}

export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!RESEND_API_KEY()) return false;
  try {
    const res = await fetch(`${(RESEND_BASE_URL() || "https://api.resend.com").replace(/\/$/, "")}/emails`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${RESEND_API_KEY()}` },
      body: JSON.stringify({ from: EMAIL_FROM(), to, subject, html }),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
