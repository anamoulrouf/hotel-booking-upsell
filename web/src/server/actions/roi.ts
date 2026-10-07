"use server";

// Persist the ROI editor inputs (docs/09 M6 6.3): token-scoped, only when
// the report is unlocked. Values are validated and clamped — the deterministic
// engines consume them at render.
import { eq } from "drizzle-orm";
import { z } from "zod";
import { reports } from "@uplayer/shared/db";
import { db } from "@/server/db";

export type SaveState = { saved?: boolean; error?: string };

const roiSchema = z.object({
  token: z.string().min(10).max(64),
  occupancy: z.coerce.number().min(0.2).max(1),
  avgStayNights: z.coerce.number().min(1).max(14),
  currentUpsellRevenue: z.coerce.number().min(0).max(10_000_000),
  buildPrice: z.coerce.number().min(0).max(500_000),
  carePlan: z.coerce.boolean(),
});

export async function saveRoiInputs(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const parsed = roiSchema.safeParse({
    token: String(formData.get("token") ?? ""),
    occupancy: Number(formData.get("occupancy")) / 100,
    avgStayNights: formData.get("avgStayNights"),
    currentUpsellRevenue: formData.get("currentUpsellRevenue"),
    buildPrice: formData.get("buildPrice"),
    carePlan: formData.get("carePlan") === "on",
  });
  if (!parsed.success) return { error: "Values out of range." };
  const { token, ...inputs } = parsed.data;

  const [report] = await db
    .select({ id: reports.id, unlocked: reports.unlocked, removedAt: reports.removedAt })
    .from(reports)
    .where(eq(reports.token, token))
    .limit(1);
  if (!report || report.removedAt) return { error: "Report not found." };
  if (!report.unlocked) return { error: "Unlock the report first." };

  await db
    .update(reports)
    .set({ inputs, updatedAt: new Date() })
    .where(eq(reports.id, report.id));
  return { saved: true };
}
