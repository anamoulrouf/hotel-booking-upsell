"use server";

// Unlock lite (docs/09 M6 6.0, brief §3 step 4): the email gate. Idempotent —
// leads.reportId is unique, so a re-submit updates rather than duplicates.
// Room count writes through to hotels.room_count, which the report's revenue
// math recomputes from at render (deterministic engines only — CLAUDE.md
// rule 2). Consent notice is rendered with the form (brief §12).
import { eq } from "drizzle-orm";
import { z } from "zod";
import { events, hotels, leads, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";

export type UnlockState = { error?: string; done?: boolean };

const unlockSchema = z.object({
  token: z.string().min(10).max(64),
  email: z.string().email().max(200),
  name: z.string().min(2).max(120),
  role: z.string().min(2).max(120),
  roomCount: z.coerce.number().int().min(1).max(5000),
});

export async function unlockReport(_prev: UnlockState, formData: FormData): Promise<UnlockState> {
  const parsed = unlockSchema.safeParse({
    token: String(formData.get("token") ?? ""),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    name: String(formData.get("name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    roomCount: String(formData.get("roomCount") ?? ""),
  });
  if (!parsed.success) {
    return { error: "Check the fields — a work email, your name, role and a room count are required." };
  }
  const { token, email, name, role, roomCount } = parsed.data;

  const [report] = await db
    .select({ id: reports.id, unlocked: reports.unlocked, removedAt: reports.removedAt, hotelId: reports.hotelId })
    .from(reports)
    .where(eq(reports.token, token))
    .limit(1);
  if (!report || report.removedAt) return { error: "This report no longer exists." };

  // idempotent: leads.report_id is unique — update on re-submit
  await db
    .insert(leads)
    .values({ reportId: report.id, email, name, role, roomCount })
    .onConflictDoUpdate({
      target: leads.reportId,
      set: { email, name, role, roomCount, unlockedAt: new Date() },
    });

  if (!report.unlocked) {
    await db.update(reports).set({ unlocked: true, updatedAt: new Date() }).where(eq(reports.id, report.id));
  }
  // room count feeds the revenue math — the report recomputes at render
  await db.update(hotels).set({ roomCount }).where(eq(hotels.id, report.hotelId));

  await db.insert(events).values({
    reportId: report.id,
    type: "unlocked",
    payload: { reUnlocked: report.unlocked },
  });

  return { done: true };
}
