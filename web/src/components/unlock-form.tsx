"use client";

// Unlock lite form (brief §3 step 4): work email, name, role, room count
// (prefilled from crawl). On success the report re-renders unlocked.
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { unlockReport } from "@/server/actions/unlock";

export function UnlockForm({
  token,
  suggestedRooms,
  collapsed = false,
  ctaLabel = "Unlock the full report — free",
}: {
  token: string;
  suggestedRooms: number | null;
  collapsed?: boolean;
  ctaLabel?: string;
}) {
  const [state, action, pending] = useActionState(unlockReport, {});
  const router = useRouter();
  // brief §3 step 3→4: the preview carries NO email field — the form appears
  // only after the unlock click (E2E C14)
  const [revealed, setRevealed] = useState(!collapsed);

  useEffect(() => {
    if (state.done) router.refresh();
  }, [state.done, router]);

  const input = "border-input text-ink placeholder:text-muted-foreground mt-1 h-11 w-full border bg-white px-3 text-sm font-normal transition-colors focus:border-hairline focus:outline-none";

  if (!revealed) {
    return (
      <button
        type="button"
        data-testid="unlock-reveal"
        onClick={() => setRevealed(true)}
        className="bg-primary text-on-primary hover:brightness-95 inline-flex h-12 w-full items-center justify-center px-6 text-sm font-normal transition-[filter] sm:w-auto"
      >
        {ctaLabel}
      </button>
    );
  }

  return (
    <form action={action} className="space-y-4" data-testid="unlock-form">
      <input type="hidden" name="token" value={token} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">Work email</span>
          <input name="email" type="email" required placeholder="you@yourhotel.com" className={input} />
        </label>
        <label className="block">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">Name</span>
          <input name="name" required minLength={2} placeholder="Your name" className={input} />
        </label>
        <label className="block">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">Role</span>
          <input name="role" required minLength={2} placeholder="GM, owner, revenue manager…" className={input} />
        </label>
        <label className="block">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">Rooms</span>
          <input
            name="roomCount" type="number" min={1} max={5000} required
            defaultValue={suggestedRooms ?? ""} placeholder="e.g. 40"
            className={input}
          />
        </label>
      </div>
      <p className="text-muted-foreground text-xs leading-5">
        We store your email, name, role and room count with this report, and may contact you about it.
        Privacy policy on request; removal via /remove.
      </p>
      <button
        type="submit" disabled={pending}
        className="bg-primary text-on-primary hover:brightness-95 inline-flex h-14 w-full items-center justify-center px-8 text-sm font-normal transition-[filter] disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Unlocking…" : "Unlock the full report — free"}
      </button>
      {state.error ? (
        <p role="alert" className="text-destructive text-sm">{state.error}</p>
      ) : null}
    </form>
  );
}
