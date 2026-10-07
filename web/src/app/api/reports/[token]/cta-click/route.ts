// Funnel instrumentation (brief §11): records cta_clicked with the placement.
// Token-scoped (CLAUDE.md rule 4); a missing report 404s but the client ignores
// responses — analytics must never block the CTA.
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { events, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";

const PLACEMENTS = new Set(["band", "sticky", "footer"]);

export async function POST(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  let placement = "unknown";
  try {
    const body = (await req.json()) as { placement?: string };
    if (body.placement && PLACEMENTS.has(body.placement)) placement = body.placement;
  } catch {
    /* body optional */
  }

  const [row] = await db
    .select({ id: reports.id, removedAt: reports.removedAt })
    .from(reports)
    .where(eq(reports.token, token))
    .limit(1);
  if (!row || row.removedAt) return NextResponse.json({ error: "not found" }, { status: 404 });

  await db.insert(events).values({ reportId: row.id, type: "cta_clicked", payload: { placement } });
  return new NextResponse(null, { status: 204 });
}
