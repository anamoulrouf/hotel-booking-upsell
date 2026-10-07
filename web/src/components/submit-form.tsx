"use client";

import { useActionState } from "react";
import { submitUrl, type SubmitState } from "@/server/actions/submit-url";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function SubmitForm() {
  const [state, action, isPending] = useActionState<SubmitState, FormData>(submitUrl, {});

  return (
    <div className="w-full max-w-xl">
      {/* Sharp orthogonal form group — 0px radius, hairline focus (docs/10-DESIGN.md §4) */}
      <form action={action} className="flex flex-col gap-3 sm:flex-row">
        <input
          data-testid="submit-url"
          type="url"
          name="url"
          required
          placeholder="https://yourhotel.com"
          aria-label="Your hotel's website"
          className="border-input text-ink placeholder:text-muted-foreground h-14 flex-1 border bg-white px-4 text-base font-normal transition-colors focus:border-hairline focus:shadow-upl-md focus:outline-none"
        />
        {TURNSTILE_SITE_KEY ? (
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="light" />
        ) : null}
        <button
          type="submit"
          data-testid="submit-button"
          disabled={isPending}
          className="bg-primary text-on-primary hover:brightness-95 focus-visible:border-hairline inline-flex h-14 items-center justify-center px-8 text-sm font-normal transition-[filter] disabled:opacity-60"
        >
          {isPending ? "Starting…" : "Get my report"}
        </button>
      </form>
      {state.error ? (
        <p role="alert" data-testid="submit-error" className="text-destructive mt-3 text-sm font-normal">
          {state.error}
        </p>
      ) : null}
      {TURNSTILE_SITE_KEY ? (
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      ) : null}
    </div>
  );
}
