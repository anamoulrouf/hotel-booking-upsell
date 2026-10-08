"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { hotels, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";
import { purgeReportRows } from "@/server/purge";

export type RemoveState = { error?: string; done?: boolean };

// Case H39 (docs/07): flag the source report, delete its data + cache clones
// + stored PDFs. Children go first via the shared purge.
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
  await purgeReportRows(allIds);

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
