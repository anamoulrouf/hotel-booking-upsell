// Retention cron (docs/02, docs/09 M8): reports live 30 days (expiresAt).
// Daily sweep purges expired reports — children, rows, and the stored Blob
// PDFs. Hotels survive: the 30-day cache lookup filters on expiresAt, so
// expired domains re-crawl cleanly.
import { lt } from "drizzle-orm";
import { reports } from "@uplayer/shared/db";
import { db } from "@/server/db";
import { purgeReportRows } from "@/server/purge";

export async function deleteExpiredReports(): Promise<{ deleted: number }> {
  const expired = await db
    .select({ id: reports.id })
    .from(reports)
    .where(lt(reports.expiresAt, new Date()))
    .limit(500);
  return { deleted: await purgeReportRows(expired.map((r) => r.id)) };
}
