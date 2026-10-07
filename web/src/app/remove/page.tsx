import type { Metadata } from "next";
import Link from "next/link";
import { RemoveForm } from "@/components/remove-form";

export const metadata: Metadata = { title: "Remove a report" };

export default function RemovePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6 py-16">
      <h1 className="font-notch text-ink text-4xl font-semibold tracking-display">
        Remove a report<span className="text-brand">.</span>
      </h1>
      <p className="text-body mt-4 text-base font-light leading-[1.6]">
        Paste the report link (or the token in its URL). We delete the report,
        its cached copies, everything the crawl stored about your property, and
        the domain stays out of the 30-day cache.
      </p>
      <div className="mt-10">
        <RemoveForm />
      </div>
      <Link href="/" className="text-hairline mt-10 text-sm hover:underline">
        ← Back to {`Booking Upsell Report`}
      </Link>
    </main>
  );
}
