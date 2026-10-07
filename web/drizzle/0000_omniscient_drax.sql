CREATE TYPE "public"."event_type" AS ENUM('report_started', 'report_failed', 'preview_seen', 'unlocked', 'pdf_opened', 'roi_edited', 'cta_clicked');--> statement-breakpoint
CREATE TYPE "public"."guest_profile" AS ENUM('family', 'couple', 'business');--> statement-breakpoint
CREATE TYPE "public"."package_kind" AS ENUM('found', 'suggested');--> statement-breakpoint
CREATE TYPE "public"."report_status" AS ENUM('pending', 'crawling', 'analyzing', 'generating', 'preview_ready', 'ready', 'failed');--> statement-breakpoint
CREATE TYPE "public"."tech_category" AS ENUM('engine', 'upsell_tool', 'pms', 'widget', 'payment_link_manual');--> statement-breakpoint
CREATE TABLE "detected_tech" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid NOT NULL,
	"category" "tech_category" NOT NULL,
	"name" text NOT NULL,
	"evidence" text,
	"confidence" real DEFAULT 0.8 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid,
	"type" "event_type" NOT NULL,
	"payload" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domain" text NOT NULL,
	"name" text,
	"address" text,
	"city" text,
	"country" text,
	"star_rating" integer,
	"room_count" integer,
	"brand_assets" jsonb,
	"source_facts" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "hotels_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"room_count" integer NOT NULL,
	"crm_synced_at" timestamp with time zone,
	"unlocked_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "leads_report_id_unique" UNIQUE("report_id")
);
--> statement-breakpoint
CREATE TABLE "packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid NOT NULL,
	"kind" "package_kind" NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price_min" integer,
	"price_max" integer,
	"currency" text DEFAULT 'USD' NOT NULL,
	"category" text NOT NULL,
	"guest_fit" text,
	"timing" text,
	"included" boolean DEFAULT false NOT NULL,
	"source" text,
	"has_photo" boolean DEFAULT false NOT NULL,
	"has_price" boolean DEFAULT false NOT NULL,
	"has_description" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid NOT NULL,
	"url" text NOT NULL,
	"title" text,
	"kind" text,
	"http_status" integer,
	"text_content" text,
	"load_ms" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"token" text NOT NULL,
	"status" "report_status" DEFAULT 'pending' NOT NULL,
	"unlocked" boolean DEFAULT false NOT NULL,
	"inputs" jsonb NOT NULL,
	"score_total" integer,
	"score_out_of" integer DEFAULT 100,
	"score_grade" text,
	"score_breakdown" jsonb,
	"missed_low" integer,
	"missed_high" integer,
	"capture_rate" real,
	"price_band" integer,
	"steps" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"degraded" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cached_from_id" uuid,
	"removed_at" timestamp with time zone,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reports_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "sample_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid NOT NULL,
	"profile" "guest_profile" NOT NULL,
	"booking" jsonb,
	"picks" jsonb
);
--> statement-breakpoint
ALTER TABLE "detected_tech" ADD CONSTRAINT "detected_tech_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."reports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."reports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."reports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packages" ADD CONSTRAINT "packages_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."reports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."reports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sample_pages" ADD CONSTRAINT "sample_pages_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."reports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "tech_report_name_idx" ON "detected_tech" USING btree ("report_id","name");--> statement-breakpoint
CREATE INDEX "events_type_idx" ON "events" USING btree ("type","created_at");--> statement-breakpoint
CREATE INDEX "packages_report_idx" ON "packages" USING btree ("report_id");--> statement-breakpoint
CREATE INDEX "pages_report_idx" ON "pages" USING btree ("report_id");--> statement-breakpoint
CREATE INDEX "reports_hotel_idx" ON "reports" USING btree ("hotel_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sample_report_profile_idx" ON "sample_pages" USING btree ("report_id","profile");