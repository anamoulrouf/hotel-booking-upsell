"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type StepState = "pending" | "running" | "done" | "failed" | "skipped";
type Steps = Record<string, { state: StepState; ms?: number; error?: string }>;

const STEP_ORDER: { key: string; label: string; soon?: boolean }[] = [
  { key: "create", label: "Starting your report" },
  { key: "crawl_core", label: "Reading your website" },
  { key: "facts", label: "Finding your hotel details" },
  { key: "search", label: "Checking your market", soon: true },
  { key: "packages", label: "Finding your packages" },
  { key: "score", label: "Running your numbers" },
  { key: "ideas", label: "Drafting package ideas" },
];

export function ProgressPoller({
  token,
  initialStatus,
  initialSteps,
}: {
  token: string;
  initialStatus: string;
  initialSteps: Steps;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [steps, setSteps] = useState<Steps>(initialSteps);

  // Derived during render — no setState-in-effect cascade.
  const failed =
    status === "failed"
      ? (steps["crawl_core"]?.error ?? steps["pipeline"]?.error ?? "We couldn't reach that website.")
      : null;

  useEffect(() => {
    if (status === "preview_ready" || status === "ready") {
      router.replace(`/report/${token}`);
      return;
    }
    if (status === "failed") return;
    const controller = new AbortController();
    const tick = async () => {
      try {
        const res = await fetch(`/api/reports/${token}/status`, { signal: controller.signal });
        if (!res.ok) return;
        const data = (await res.json()) as { status: string; steps: Steps };
        setStatus(data.status);
        setSteps(data.steps);
      } catch {
        /* transient network error — next tick retries */
      }
    };
    const id = setInterval(tick, 2000);
    return () => {
      clearInterval(id);
      controller.abort();
    };
  }, [status, steps, token, router]);

  if (failed) {
    return (
      <div className="bg-card border-destructive/30 shadow-upl-md border p-8 text-center" data-testid="progress-failed">
        <p className="text-destructive text-lg font-semibold">We couldn&apos;t read that website.</p>
        <p className="text-body mt-2 text-sm font-light">{failed}</p>
        <Link
          href="/"
          className="bg-primary text-on-primary hover:brightness-95 mt-6 inline-flex h-12 items-center px-6 text-sm font-normal transition-[filter]"
        >
          Try another website
        </Link>
      </div>
    );
  }

  return (
    <ol className="w-full space-y-2" data-testid="progress-list">
      {STEP_ORDER.map((s) => {
        const st = steps[s.key]?.state ?? "pending";
        const active = st === "running";
        return (
          <li
            key={s.key}
            data-testid={`step-${s.key}`}
            data-state={st}
            className={`flex items-center justify-between border px-5 py-4 text-sm transition-colors ${
              active
                ? "border-hairline bg-white shadow-upl-md"
                : st === "done"
                  ? "border-border/60 bg-white"
                  : "border-border/40 text-muted-foreground"
            }`}
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden
                className={`inline-block h-2 w-2 ${
                  st === "done" ? "bg-success" : active ? "bg-hairline animate-pulse" : st === "skipped" ? "bg-border" : "bg-border/50"
                }`}
              />
              <span className={st === "pending" ? "text-muted-foreground" : "text-ink font-normal"}>
                {s.label}
                {s.soon ? <span className="text-muted-foreground/70"> (next build)</span> : null}
              </span>
            </span>
            <span aria-live="polite" className="text-muted-foreground text-xs tabular-nums">
              {st === "done" && steps[s.key]?.ms != null ? `${((steps[s.key]?.ms ?? 0) / 1000).toFixed(1)}s` : ""}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
