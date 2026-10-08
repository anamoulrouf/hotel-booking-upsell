// Funnel instrumentation (brief §11): records cta_clicked with the placement.
// Token-scoped (CLAUDE.md rule 4); a missing report 404s but the client ignores
// responses — analytics must never block the CTA.
import { and, eq, gt } from "drizzle-orm";
import { NextResponse } from "next/server";
import { events, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";

const PLACEMENTS = new Set(["band", "sticky", "footer", "panel"]);

export async function POST(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  let placement = "unknown";
  let booked = false;
  try {
    const body = (await req.json()) as { placement?: string; booked?: boolean };
    if (body.placement && PLACEMENTS.has(body.placement)) placement = body.placement;
    if (body.booked) booked = true;
  } catch {
    /* body optional */
  }

  const [row] = await db
    .select({ id: reports.id, removedAt: reports.removedAt })
    .from(reports)
    .where(and(eq(reports.token, token), gt(reports.expiresAt, new Date())))
    .limit(1);
  if (!row || row.removedAt) return NextResponse.json({ error: "not found" }, { status: 404 });

  // a scheduler booking is the funnel's call_booked; a plain click is the
  // cta_clicked proxy (docs/09 M8 metrics)
  await db.insert(events).values({
    reportId: row.id,
    type: booked ? "call_booked" : "cta_clicked",
    payload: { placement },
  });
  return new NextResponse(null, { status: 204 });
}
