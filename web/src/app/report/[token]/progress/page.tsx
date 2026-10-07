import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hotels, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";
import { ProgressPoller } from "@/components/progress-poller";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ProgressPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const [row] = await db
    .select({ status: reports.status, steps: reports.steps, removedAt: reports.removedAt })
    .from(reports)
    .innerJoin(hotels, eq(reports.hotelId, hotels.id))
    .where(eq(reports.token, token))
    .limit(1);

  if (!row || row.removedAt) notFound();

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-6 py-16">
        <p className="text-body text-xs uppercase tracking-[0.2em]">UpLayer · Booking Upsell Report</p>
        <h1 className="font-notch text-ink mt-4 text-center text-4xl font-semibold tracking-display md:text-5xl">
          Building your report<span className="text-brand">.</span>
        </h1>
        <p className="text-body mt-4 text-center text-base font-light">
          Usually under a minute. You&apos;ll see the first results without entering
          your email.
        </p>
        <div className="mt-12 w-full">
          <ProgressPoller token={token} initialStatus={row.status} initialSteps={row.steps} />
        </div>
      </div>
    </main>
  );
}
