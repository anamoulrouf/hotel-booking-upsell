// Report purge shared by /remove (H39) and the retention cron (docs/02):
// children-first row deletion (schema FKs are NO ACTION) plus Blob PDF
// deletion — rule 3 "removable" includes the stored PDF copy.
import { inArray } from "drizzle-orm";
import { del } from "@vercel/blob";
import { detectedTech, events, leads, packages as packagesTable, pages, reports, samplePages } from "@uplayer/shared/db";
import { db } from "@/server/db";
import { blobConfigured } from "@/server/blob";

export async function purgeReportRows(ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;

  // stored PDFs first (best-effort — an orphaned Blob is better than a
  // failed removal); del() needs the Blob token, absent locally
  if (blobConfigured()) {
    const tokens = await db
      .select({ token: reports.token })
      .from(reports)
      .where(inArray(reports.id, ids));
    for (const { token } of tokens) {
      try {
        await del(`reports/${token}.pdf`);
      } catch {
        /* already gone or Blob unavailable */
      }
    }
  }

  await db.delete(samplePages).where(inArray(samplePages.reportId, ids));
  await db.delete(detectedTech).where(inArray(detectedTech.reportId, ids));
  await db.delete(packagesTable).where(inArray(packagesTable.reportId, ids));
  await db.delete(pages).where(inArray(pages.reportId, ids));
  await db.delete(leads).where(inArray(leads.reportId, ids));
  await db.delete(events).where(inArray(events.reportId, ids));
  await db.delete(reports).where(inArray(reports.id, ids));
  return ids.length;
}
