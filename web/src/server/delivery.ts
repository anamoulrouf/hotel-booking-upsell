// Post-unlock delivery (docs/09 M7): PDF → Blob → email to the lead, sales
// alert, CRM sync. Every step is env-gated and best-effort — a failure never
// breaks the unlock itself (docs/01 §5). Scheduled via after() in the unlock
// action.
import { eq } from "drizzle-orm";
import { hotels, leads, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";
import { APP_URL } from "@/lib/env";
import { putReportPdf } from "@/server/blob";
import { reportEmailHtml, reportEmailSubject, salesAlertHtml, sendEmail } from "@/server/email/resend";
import { SALES_ALERT_EMAIL } from "@/lib/env";
import { syncLeadToCrm } from "@/server/crm";
import { signWorkerRequest } from "@/server/worker-client";

export async function deliverUnlockedReport(reportId: string): Promise<void> {
  const [row] = await db
    .select({
      token: reports.token,
      scoreGrade: reports.scoreGrade,
      scoreTotal: reports.scoreTotal,
      missedLow: reports.missedLow,
      missedHigh: reports.missedHigh,
      hotelName: hotels.name,
    })
    .from(reports)
    .innerJoin(hotels, eq(reports.hotelId, hotels.id))
    .where(eq(reports.id, reportId))
    .limit(1);
  const [lead] = await db.select().from(leads).where(eq(leads.reportId, reportId)).limit(1);
  if (!row || !lead) return;

  const reportUrl = `${APP_URL()}/report/${row.token}`;

  // PDF: render the print view headlessly via the worker, store on Blob.
  // Best-effort — the live report link always exists.
  let pdfUrl: string | null = null;
  const workerUrl = process.env.WORKER_URL;
  if (workerUrl) {
    const printUrl = `${APP_URL()}/report/${row.token}?print=1`;
    const payload = JSON.stringify({ url: printUrl });
    const secret = process.env.WORKER_SHARED_SECRET;
    const ts = String(Date.now());
    try {
      const res = await fetch(`${workerUrl.replace(/\/$/, "")}/pdf`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(secret
            ? {
                "x-uplayer-timestamp": ts,
                "x-uplayer-signature": signWorkerRequest(secret, ts, payload),
              }
            : {}),
        },
        body: payload,
        signal: AbortSignal.timeout(90_000),
      });
      if (res.ok && (res.headers.get("content-type") ?? "").includes("pdf")) {
        pdfUrl = await putReportPdf(new Uint8Array(await res.arrayBuffer()), row.token);
      }
    } catch {
      /* best-effort */
    }
  }

  // email to the lead
  const emailInput = {
    to: lead.email,
    name: lead.name,
    hotelName: row.hotelName ?? "your hotel",
    reportUrl,
    pdfUrl,
  };
  await sendEmail(lead.email, reportEmailSubject(emailInput), reportEmailHtml(emailInput));

  // sales alert
  const alert = SALES_ALERT_EMAIL();
  if (alert) {
    const input = { ...emailInput, grade: row.scoreGrade, missedLow: row.missedLow, missedHigh: row.missedHigh };
    await sendEmail(alert, `New unlocked lead — ${row.hotelName ?? row.token} (${row.scoreGrade ?? "?"})`, salesAlertHtml(input));
  }

  // CRM sync — crm_synced_at set only on success so it can retry
  if (!lead.crmSyncedAt) {
    const ok = await syncLeadToCrm({
      email: lead.email,
      name: lead.name,
      role: lead.role,
      roomCount: lead.roomCount,
      hotel: row.hotelName ?? row.token,
      grade: row.scoreGrade,
      score: row.scoreTotal ?? null,
      reportUrl,
    });
    if (ok) {
      await db.update(leads).set({ crmSyncedAt: new Date() }).where(eq(leads.reportId, reportId));
    }
  }
}
