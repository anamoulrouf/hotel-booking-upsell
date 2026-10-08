// M7 delivery builders: email subjects/html and CRM payload — pure, no IO.
import { describe, expect, it } from "vitest";
import { reportEmailHtml, reportEmailSubject, salesAlertHtml } from "./resend";
import { crmPayload } from "@/server/crm";

const input = {
  to: "gm@aurora.test",
  name: "Aurora Manager",
  hotelName: "Hotel Aurora",
  reportUrl: "https://app.example.com/report/tok123",
  pdfUrl: "https://blob.example.com/reports/tok123.pdf",
};

describe("report email builder", () => {
  it("subject names the hotel", () => {
    expect(reportEmailSubject(input)).toContain("Hotel Aurora");
  });

  it("html links the report and the PDF when present", () => {
    const html = reportEmailHtml(input);
    expect(html).toContain(input.reportUrl);
    expect(html).toContain(input.pdfUrl!);
    expect(html).toContain("Download the PDF copy");
    expect(html).toContain("Aurora Manager");
  });

  it("omits the PDF link when storage was unavailable", () => {
    const html = reportEmailHtml({ ...input, pdfUrl: null });
    expect(html).toContain(input.reportUrl);
    expect(html).not.toContain("Download the PDF copy");
  });

  it("labels every figure as an estimate (claims discipline)", () => {
    const html = reportEmailHtml(input);
    expect(html.toLowerCase()).toContain("estimate");
  });
});

describe("sales alert builder", () => {
  it("carries grade, missed range, email and report link", () => {
    const html = salesAlertHtml({
      ...input,
      grade: "D",
      missedLow: 28_000,
      missedHigh: 53_000,
    });
    expect(html).toContain("D");
    expect(html).toContain("$28k–$53k/yr (est.)");
    expect(html).toContain("gm@aurora.test");
    expect(html).toContain(input.reportUrl);
  });

  it("shows unknown (not a fake number) when rooms are missing", () => {
    const html = salesAlertHtml({ ...input, grade: null, missedLow: null, missedHigh: null });
    expect(html).toContain("unknown (no room count)");
  });
});

describe("crm payload", () => {
  it("wraps the lead with type and timestamp", () => {
    const json = crmPayload({
      email: "gm@aurora.test",
      name: "Aurora Manager",
      role: "General Manager",
      roomCount: 54,
      hotel: "Hotel Aurora",
      grade: "D",
      score: 45,
      reportUrl: "https://app.example.com/report/tok123",
    });
    const parsed = JSON.parse(json) as { type: string; lead: Record<string, unknown>; ts: string };
    expect(parsed.type).toBe("lead_unlocked");
    expect(parsed.lead.roomCount).toBe(54);
    expect(parsed.ts).toBeTruthy();
  });
});
