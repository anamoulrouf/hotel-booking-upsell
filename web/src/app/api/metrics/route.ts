// Funnel metrics (docs/09 M8, brief §13): counts over the trailing 60 days.
// Guarded by METRICS_TOKEN (?t=) — 404 when unset or wrong, so the endpoint
// is invisible by default.
import { and, count, eq, gte, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { events, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("t") ?? "";
  const expected = process.env.METRICS_TOKEN;
  if (!expected || token !== expected) {
    return new NextResponse(null, { status: 404 });
  }

  const since = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
  const countType = async (
    type: "report_started" | "report_failed" | "preview_seen" | "cta_clicked" | "unlocked" | "call_booked",
  ) => {
    const [row] = await db
      .select({ value: count() })
      .from(events)
      .where(and(eq(events.type, type), gte(events.createdAt, since)));
    return row?.value ?? 0;
  };

  const [started, previews, ctaClicks, unlocked, calls] = await Promise.all([
    countType("report_started"),
    countType("preview_seen"),
    countType("cta_clicked"),
    countType("unlocked"),
    countType("call_booked"),
  ]);
  const [failed] = await db
    .select({ value: count() })
    .from(events)
    .where(and(eq(events.type, "report_failed"), gte(events.createdAt, since)));
  const [avgLatency] = await db
    .select({ ms: sql<number>`coalesce(avg((steps->'score'->>'ms')::int), 0)::int` })
    .from(reports)
    .where(gte(reports.createdAt, since));

  const pct = (a: number, b: number) => (b === 0 ? null : Math.round((a / b) * 100));

  return NextResponse.json(
    {
      windowDays: 60,
      reportsStarted: started,
      previewsSeen: previews,
      ctaClicked: ctaClicks,
      unlocked,
      callsBooked: calls,
      failed,
      avgPipelineMs: avgLatency?.ms ?? 0,
      targets: { // brief §13
        previewToUnlock_pct: pct(unlocked, previews),
        previewToUnlock_target: 30,
        unlockToCall_pct: pct(calls, unlocked),
        unlockToCall_target: 5,
        reportsStarted_target: 300,
      },
    },
    { headers: { "cache-control": "no-store" } },
  );
}
