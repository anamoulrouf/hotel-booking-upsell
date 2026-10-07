// One-off verification: run the real M4 pipeline against a real schema.org hotel.
// Usage: DATABASE_URL=... tsx scripts/verify-dolli.mts <domain>
import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { DEFAULTS } from "@uplayer/shared";
import { detectedTech, hotels, packages as packagesTable, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";
import { runPipeline } from "@/server/pipeline";

const domain = process.argv[2] ?? "thedolli.com";

const [hotel] = await db
  .insert(hotels)
  .values({ domain })
  .onConflictDoUpdate({ target: hotels.domain, set: { domain } })
  .returning({ id: hotels.id });

const token = randomBytes(16).toString("base64url");
const [report] = await db
  .insert(reports)
  .values({
    hotelId: hotel.id,
    token,
    inputs: {
      occupancy: DEFAULTS.occupancy,
      avgStayNights: DEFAULTS.avgStayNights,
      currentUpsellRevenue: DEFAULTS.currentUpsellRevenue,
      buildPrice: DEFAULTS.buildPrice,
      carePlan: true,
    },
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })
  .returning({ id: reports.id });

console.log(`running pipeline for ${domain} (report ${report.id}) …`);
const t0 = Date.now();
await runPipeline(report.id);
console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s\n`);

const [row] = await db.select().from(reports).where(eq(reports.id, report.id));
const [hotelRow] = await db.select().from(hotels).where(eq(hotels.id, hotel.id));
const pkgs = await db.select({ name: packagesTable.name, priceMin: packagesTable.priceMin }).from(packagesTable).where(eq(packagesTable.reportId, report.id));
const tech = await db.select({ category: detectedTech.category, name: detectedTech.name }).from(detectedTech).where(eq(detectedTech.reportId, report.id));

console.log("hotel:", { name: hotelRow.name, city: hotelRow.city, rooms: hotelRow.roomCount, stars: hotelRow.starRating });
console.log("status:", row.status, "| steps:", Object.entries(row.steps).map(([k, v]) => `${k}=${v.state}`).join(" "));
console.log(`score: ${row.scoreTotal}/${row.scoreOutOf} grade ${row.scoreGrade}`);
console.log("missed:", row.missedLow != null ? `$${row.missedLow} – $${row.missedHigh}` : "needs room count");
console.log("tech:", tech.map((t) => `${t.category}:${t.name}`).join(", ") || "none");
console.log(`packages (${pkgs.length}):`, pkgs.slice(0, 8).map((p) => p.name).join(" | "));
console.log("\nreport url: http://localhost:3000/report/" + token);
process.exit(0);
