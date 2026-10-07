"use client";

import { useActionState } from "react";
import { requestRemoval, type RemoveState } from "@/server/actions/remove";

export function RemoveForm() {
  const [state, action, isPending] = useActionState<RemoveState, FormData>(requestRemoval, {});

  if (state.done) {
    return (
      <div className="bg-card border-success/40 shadow-upl-sm border p-6" role="status">
        <p className="text-lg font-semibold">Done — the report and its data are deleted.</p>
        <p className="text-body mt-2 text-sm font-light">
          The domain is also excluded from the report cache. If anything was
          already emailed to someone, that copy is outside our control.
        </p>
      </div>
    );
  }

  return (
    <form action={action}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          data-testid="remove-token"
          name="token"
          required
          placeholder="https://…/report/<token> or just the token"
          aria-label="Report link or token"
          className="border-input text-ink placeholder:text-muted-foreground h-14 flex-1 border bg-white px-4 text-base font-normal transition-colors focus:border-hairline focus:shadow-upl-md focus:outline-none"
        />
        <button
          type="submit"
          data-testid="remove-button"
          disabled={isPending}
          className="bg-primary text-on-primary hover:brightness-95 inline-flex h-14 items-center justify-center px-8 text-sm font-normal transition-[filter] disabled:opacity-60"
        >
          {isPending ? "Removing…" : "Remove my report"}
        </button>
      </div>
      {state.error ? (
        <p role="alert" data-testid="remove-error" className="text-destructive mt-3 text-sm font-normal">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
