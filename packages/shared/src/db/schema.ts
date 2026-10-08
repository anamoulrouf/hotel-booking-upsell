// Source of truth per docs/02-data-model.md. Migrated by web (drizzle-kit).
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const reportStatus = pgEnum("report_status", [
  "pending",
  "crawling",
  "analyzing",
  "generating",
  "preview_ready",
  "ready",
  "failed",
]);

export const techCategory = pgEnum("tech_category", [
  "engine",
  "upsell_tool",
  "pms",
  "widget",
  "payment_link_manual",
]);

export const packageKind = pgEnum("package_kind", ["found", "suggested"]);

export const guestProfile = pgEnum("guest_profile", [
  "family",
  "couple",
  "business",
]);

export const eventType = pgEnum("event_type", [
  "report_started",
  "report_failed",
  "preview_seen",
  "unlocked",
  "pdf_opened",
  "roi_edited",
  "cta_clicked",
  "call_booked",
]);

export const hotels = pgTable("hotels", {
  id: uuid("id").defaultRandom().primaryKey(),
  domain: text("domain").notNull().unique(),
  name: text("name"),
  address: text("address"),
  city: text("city"),
  country: text("country"),
  starRating: integer("star_rating"),
  roomCount: integer("room_count"),
  brandAssets: jsonb("brand_assets").$type<{
    logoUrl?: string;
    primary?: string;
    secondary?: string;
    fonts?: string[];
    heroImages?: string[];
  }>(),
  sourceFacts: jsonb("source_facts").$type<Record<string, string>>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const reports = pgTable(
  "reports",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    hotelId: uuid("hotel_id")
      .notNull()
      .references(() => hotels.id),
    token: text("token").notNull().unique(),
    status: reportStatus("status").notNull().default("pending"),
    unlocked: boolean("unlocked").notNull().default(false),
    inputs: jsonb("inputs")
      .$type<{
        occupancy: number;
        avgStayNights: number;
        currentUpsellRevenue: number;
        buildPrice: number;
        carePlan: boolean;
      }>()
      .notNull(),
    scoreTotal: integer("score_total"),
    scoreOutOf: integer("score_out_of").default(100),
    scoreGrade: text("score_grade"),
    scoreBreakdown: jsonb("score_breakdown").$type<
      {
        area: string;
        label: string;
        points: number;
        max: number;
        skipped?: boolean;
        finding: string;
        fix: string;
      }[]
    >(),
    missedLow: integer("missed_low"),
    missedHigh: integer("missed_high"),
    captureRate: real("capture_rate"),
    priceBand: integer("price_band"),
    steps: jsonb("steps")
      .$type<
        Record<
          string,
          {
            state: "pending" | "running" | "done" | "failed" | "skipped";
            ms?: number;
            error?: string;
          }
        >
      >()
      .notNull()
      .default({}),
    degraded: jsonb("degraded").$type<string[]>().notNull().default([]),
    cachedFromId: uuid("cached_from_id"),
    removedAt: timestamp("removed_at", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [index("reports_hotel_idx").on(t.hotelId)],
);

export const pages = pgTable(
  "pages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reportId: uuid("report_id")
      .notNull()
      .references(() => reports.id),
    url: text("url").notNull(),
    title: text("title"),
    kind: text("kind"),
    httpStatus: integer("http_status"),
    textContent: text("text_content"),
    loadMs: integer("load_ms"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [index("pages_report_idx").on(t.reportId)],
);

export const detectedTech = pgTable(
  "detected_tech",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reportId: uuid("report_id")
      .notNull()
      .references(() => reports.id),
    category: techCategory("category").notNull(),
    name: text("name").notNull(),
    evidence: text("evidence"),
    confidence: real("confidence").notNull().default(0.8),
  },
  (t) => [uniqueIndex("tech_report_name_idx").on(t.reportId, t.name)],
);

export const packages = pgTable(
  "packages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reportId: uuid("report_id")
      .notNull()
      .references(() => reports.id),
    kind: packageKind("kind").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    priceMin: integer("price_min"),
    priceMax: integer("price_max"),
    currency: text("currency").notNull().default("USD"),
    category: text("category").notNull(),
    guestFit: text("guest_fit"),
    timing: text("timing"),
    included: boolean("included").notNull().default(false),
    source: text("source"),
    hasPhoto: boolean("has_photo").notNull().default(false),
    hasPrice: boolean("has_price").notNull().default(false),
    hasDescription: boolean("has_description").notNull().default(false),
  },
  (t) => [index("packages_report_idx").on(t.reportId)],
);

export const samplePages = pgTable(
  "sample_pages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reportId: uuid("report_id")
      .notNull()
      .references(() => reports.id),
    profile: guestProfile("profile").notNull(),
    booking: jsonb("booking").$type<{
      nights: number;
      party: string;
      channel: string;
      leadDays: number;
      roomType: string;
    }>(),
    picks: jsonb("picks").$type<
      { packageId: string; order: number; perGuestLine: string }[]
    >(),
  },
  (t) => [uniqueIndex("sample_report_profile_idx").on(t.reportId, t.profile)],
);

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  reportId: uuid("report_id")
    .notNull()
    .unique()
    .references(() => reports.id),
  email: text("email").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  roomCount: integer("room_count").notNull(),
  crmSyncedAt: timestamp("crm_synced_at", { withTimezone: true }),
  unlockedAt: timestamp("unlocked_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const events = pgTable(
  "events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reportId: uuid("report_id").references(() => reports.id),
    type: eventType("type").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [index("events_type_idx").on(t.type, t.createdAt)],
);
