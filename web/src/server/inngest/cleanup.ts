// Retention cron (docs/02, docs/09 M8): reports live 30 days (expiresAt).
// Daily sweep deletes expired reports children-first (no DB cascades), then
// the rows themselves. Hotels survive: the 30-day cache lookup filters on
// expiresAt, so expired domains re-crawl cleanly.
import { inArray, lt } from "drizzle-orm";
import { detectedTech, events, leads, packages as packagesTable, pages, reports, samplePages } from "@uplayer/shared/db";
import { db } from "@/server/db";

export async function deleteExpiredReports(): Promise<{ deleted: number }> {
  const expired = await db
    .select({ id: reports.id })
    .from(reports)
    .where(lt(reports.expiresAt, new Date()))
    .limit(500);
  if (expired.length === 0) return { deleted: 0 };

  const ids = expired.map((r) => r.id);
  await db.delete(samplePages).where(inArray(samplePages.reportId, ids));
  await db.delete(detectedTech).where(inArray(detectedTech.reportId, ids));
  await db.delete(packagesTable).where(inArray(packagesTable.reportId, ids));
  await db.delete(pages).where(inArray(pages.reportId, ids));
  await db.delete(leads).where(inArray(leads.reportId, ids));
  await db.delete(events).where(inArray(events.reportId, ids));
  await db.delete(reports).where(inArray(reports.id, ids));
  return { deleted: ids.length };
}
