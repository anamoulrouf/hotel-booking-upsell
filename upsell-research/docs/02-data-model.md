# Data Model (Drizzle / Neon Postgres)

Schema source of truth: `packages/shared/src/db/schema.ts` (shared types) with migrations in `web/drizzle/`. Forward-compatible with M2 batch mode and leaderboard without breaking changes.

## Tables

```ts
import { pgTable, text, integer, boolean, timestamp, jsonb, uuid, real, uniqueIndex, index, pgEnum } from "drizzle-orm/pg-core";

export const reportStatus = pgEnum("report_status", [
  "pending","crawling","analyzing","generating","preview_ready","ready","failed",
]);
export const techCategory = pgEnum("tech_category", [
  "engine","upsell_tool","pms","widget","payment_link_manual",
]);
export const packageKind = pgEnum("package_kind", ["found","suggested"]);
export const guestProfile = pgEnum("guest_profile", ["family","couple","business"]);
export const eventType = pgEnum("event_type", [
  "report_started","report_failed","preview_seen","unlocked","pdf_opened",
  "roi_edited","cta_clicked",
]);

export const hotels = pgTable("hotels", {
  id: uuid("id").defaultRandom().primaryKey(),
  domain: text("domain").notNull().unique(),          // normalized: lowercase, strip www
  name: text("name"),
  address: text("address"), city: text("city"), country: text("country"),
  starRating: integer("star_rating"),                 // 1..5, nullable
  roomCount: integer("room_count"),                   // nullable until unlock-confirmed
  brandAssets: jsonb("brand_assets").$type<{
    logoUrl?: string; primary?: string; secondary?: string;
    fonts?: string[]; heroImages?: string[];
  }>(),
  sourceFacts: jsonb("source_facts").$type<Record<string, string>>(), // provenance per field
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  hotelId: uuid("hotel_id").notNull().references(() => hotels.id),
  token: text("token").notNull().unique(),            // nanoid(21) — the access control
  status: reportStatus("status").notNull().default("pending"),
  unlocked: boolean("unlocked").notNull().default(false),
  inputs: jsonb("inputs").$type<{
    occupancy: number; avgStayNights: number;         // defaults 0.65 / 2.2, editable
    currentUpsellRevenue: number;                     // default 0
    buildPrice: number;                               // default 15000
    carePlan: boolean;                                // default true
  }>().notNull(),
  scoreTotal: integer("score_total"),
  scoreOutOf: integer("score_out_of").default(100),   // drops when an area is skipped
  scoreGrade: text("score_grade"),                    // A|B|C|D|F
  scoreBreakdown: jsonb("score_breakdown").$type<{
    area: string; points: number; max: number; skipped?: boolean;
    finding: string; fix: string;
  }[]>(),
  missedLow: integer("missed_low"), missedHigh: integer("missed_high"),
  captureRate: real("capture_rate"), priceBand: integer("price_band"), // spend/booking USD
  steps: jsonb("steps").$type<Record<string, {
    state: "pending"|"running"|"done"|"failed"|"skipped"; ms?: number; error?: string;
  }>>().notNull().default({}),
  degraded: jsonb("degraded").$type<string[]>().notNull().default([]),
  cachedFromId: uuid("cached_from_id"),
  removedAt: timestamp("removed_at", { withTimezone: true }), // /remove flag
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(), // +30d
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({
  byHotel: index("reports_hotel_idx").on(t.hotelId),
}));

export const pages = pgTable("pages", {
  id: uuid("id").defaultRandom().primaryKey(),
  reportId: uuid("report_id").notNull().references(() => reports.id),
  url: text("url").notNull(), title: text("title"), kind: text("kind"), // home|rooms|dining|...
  httpStatus: integer("http_status"), textContent: text("text_content"),
  loadMs: integer("load_ms"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({ byReport: index("pages_report_idx").on(t.reportId) }));
// Retention: textContent NULLed after 7 days (cron); structured results live to report expiry.

export const detectedTech = pgTable("detected_tech", {
  id: uuid("id").defaultRandom().primaryKey(),
  reportId: uuid("report_id").notNull().references(() => reports.id),
  category: techCategory("category").notNull(),
  name: text("name").notNull(),                       // "WebHotelier", "Oaky", "manual payment link"
  evidence: text("evidence"),                         // selector/script URL/FAQ quote
  confidence: real("confidence").notNull().default(0.8),
}, (t) => ({ uniq: uniqueIndex("tech_report_name_idx").on(t.reportId, t.name) }));

export const packages = pgTable("packages", {
  id: uuid("id").defaultRandom().primaryKey(),
  reportId: uuid("report_id").notNull().references(() => reports.id),
  kind: packageKind("kind").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  priceMin: integer("price_min"), priceMax: integer("price_max"), // null ⇒ "ask"/no price shown
  currency: text("currency").notNull().default("USD"),
  category: text("category").notNull(), // room_stay|food_drink|wellness|family|romance|business|local|arrival
  guestFit: text("guest_fit"),        // "families with kids", "couples", ...
  timing: text("timing"),             // at_booking|12_days_out|2_days_out
  included: boolean("included").notNull().default(false), // excluded from ideas & picks
  source: text("source"),             // page URL or "suggested"
  hasPhoto: boolean("has_photo").notNull().default(false),
  hasPrice: boolean("has_price").notNull().default(false),
  hasDescription: boolean("has_description").notNull().default(false),
}, (t) => ({ byReport: index("packages_report_idx").on(t.reportId) }));

export const samplePages = pgTable("sample_pages", {
  id: uuid("id").defaultRandom().primaryKey(),
  reportId: uuid("report_id").notNull().references(() => reports.id),
  profile: guestProfile("profile").notNull(),
  booking: jsonb("booking").$type<{ nights:number; party:string; channel:string;
    leadDays:number; roomType:string }>(),
  picks: jsonb("picks").$type<{ packageId:string; order:number;
    perGuestLine:string }[]>(),
}, (t) => ({ uniq: uniqueIndex("sample_report_profile_idx").on(t.reportId, t.profile) }));

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  reportId: uuid("report_id").notNull().unique().references(() => reports.id), // idempotent unlock
  email: text("email").notNull(), name: text("name").notNull(),
  role: text("role").notNull(), roomCount: integer("room_count").notNull(),
  crmSyncedAt: timestamp("crm_synced_at", { withTimezone: true }), // M2
  unlockedAt: timestamp("unlocked_at", { withTimezone: true }).defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  reportId: uuid("report_id").references(() => reports.id),
  type: eventType("type").notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (t) => ({ byType: index("events_type_idx").on(t.type, t.createdAt) }));
```

## Notes

- **Token = access control.** `nanoid(21)` (~126 bits). Every report route/endpoint is token-scoped; raw `id` never leaves the server.
- **`reports.inputs`** holds the editable ROI inputs so share links reproduce exactly what the lead sees; server recalculates via the same pure engine.
- **`score_out_of`** implements the skipped-area rule (e.g. mobile failed ⇒ 90).
- **`packages.included`** is the inclusion-detection flag; enforced in generation prompts AND in a generation-time filter (belt and braces).
- **`detectedTech.payment_link_manual`** stores the Dolli learning-5 outreach signal with the FAQ quote as evidence.
- **Idempotency**: `leads.reportId` unique; unlock Server Action uses `onConflictDoNothing` then reads.
- **Migrations**: `drizzle-kit generate` per PR; applied to the PR's Neon branch in CI; applied to prod on merge. All additive in M1.
- **Retention cron** (Vercel Cron, daily): NULL `pages.text_content` older than 7d; hard-delete reports past `expiresAt` where `removedAt` set, anonymize others (keep aggregates); leads retained 12 months, deleted on `/remove` request.
