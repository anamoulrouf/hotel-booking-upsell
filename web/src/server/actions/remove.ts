"use server";

import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { detectedTech, events, hotels, leads, packages as packagesTable, pages, reports, samplePages } from "@uplayer/shared/db";
import { db } from "@/server/db";

export type RemoveState = { error?: string; done?: boolean };

// Case H39 (docs/07): flag the source report, delete its data + cache clones.
// FKs in the schema are NO ACTION, so children go first, explicitly.
export async function requestRemoval(_prev: RemoveState, formData: FormData): Promise<RemoveState> {
  const token = String(formData.get("token") ?? "").trim();
  if (!token) return { error: "Paste the report link or token from your email." };

  const tokenPart = token.includes("/report/") ? (token.split("/report/")[1]?.split(/[/?#]/)[0] ?? "") : token;
  const [source] = await db
    .select({ id: reports.id, hotelId: reports.hotelId })
    .from(reports)
    .where(eq(reports.token, tokenPart))
    .limit(1);
  if (!source) return { error: "We couldn't find a report for that link. Check it and try again." };

  const clones = await db
    .select({ id: reports.id })
    .from(reports)
    .where(eq(reports.cachedFromId, source.id));
  const allIds = [source.id, ...clones.map((c) => c.id)];

  for (const id of allIds) {
    await db.delete(pages).where(eq(pages.reportId, id));
    await db.delete(packagesTable).where(eq(packagesTable.reportId, id));
    await db.delete(detectedTech).where(eq(detectedTech.reportId, id));
    await db.delete(samplePages).where(eq(samplePages.reportId, id));
    await db.delete(leads).where(eq(leads.reportId, id));
    await db.delete(events).where(eq(events.reportId, id));
  }
  await db.delete(reports).where(inArray(reports.id, allIds));

  // Scrub anything the crawl learned about the property; the tombstoned domain
  // stays behind only so the 30-day cache can't resurrect it.
  const [hotel] = await db
    .select({ id: hotels.id })
    .from(hotels)
    .where(eq(hotels.id, source.hotelId));
  if (hotel) {
    await db
      .update(hotels)
      .set({ name: null, address: null, city: null, country: null, brandAssets: null, sourceFacts: { removed: "true" } })
      .where(eq(hotels.id, hotel.id));
  }

  revalidatePath("/");
  return { done: true };
}
