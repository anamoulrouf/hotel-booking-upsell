// Token-scoped progress polling (docs/01-architecture.md §4).
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { hotels, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";

export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const [row] = await db
    .select({ status: reports.status, steps: reports.steps, degraded: reports.degraded, hotelName: hotels.name })
    .from(reports)
    .innerJoin(hotels, eq(reports.hotelId, hotels.id))
    .where(eq(reports.token, token))
    .limit(1);

  if (!row) return NextResponse.json({ error: "not found" }, { status: 404 });

  return NextResponse.json(
    { status: row.status, steps: row.steps, degraded: row.degraded, hotelName: row.hotelName },
    { headers: { "cache-control": "no-store" } },
  );
}
