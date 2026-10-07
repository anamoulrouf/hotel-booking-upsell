"use client";

// Live ROI editor (brief §7): inputs recompute the deterministic engine
// client-side (computeRoi from @uplayer/shared — pure, no server round-trip);
// "Save" persists via the token-scoped action. Low/mid/high take-rate
// scenarios shown side by side.
import { useActionState, useMemo, useState } from "react";
import { computeRoi } from "@uplayer/shared";
import { saveRoiInputs } from "@/server/actions/roi";

type Inputs = {
  occupancy: number; // 0–1
  avgStayNights: number;
  currentUpsellRevenue: number;
  buildPrice: number;
  carePlan: boolean;
};

const TAKE_RATES = [
  { label: "Low", rate: 0.08 },
  { label: "Mid", rate: 0.115 },
  { label: "High", rate: 0.15 },
];

function money(n: number): string {
  if (Math.abs(n) >= 1000) return `$${Math.round(n).toLocaleString()}`;
  return `$${Math.round(n)}`;
}

export function RoiEditor({
  token,
  rooms,
  starRating,
  initial,
}: {
  token: string;
  rooms: number;
  starRating: number | null;
  initial: Inputs;
}) {
  const [inputs, setInputs] = useState<Inputs>(initial);
  const [, setSaved] = useState(false);
  const [saveState, saveAction, saving] = useActionState(saveRoiInputs, {} as { saved?: boolean; error?: string });

  const scenarios = useMemo(
    () =>
      TAKE_RATES.map((t) => ({
        ...t,
        roi: computeRoi({
          rooms,
          occupancy: inputs.occupancy,
          avgStayNights: inputs.avgStayNights,
          nightlyRate: null, // OTA-derived rate lands with the search step; baseline band applies
          starRating,
          currentUpsellRevenue: inputs.currentUpsellRevenue,
          buildPrice: inputs.buildPrice,
          carePlan: inputs.carePlan,
          scorePct: 100, // post-upgrade attainable capture (upper bound, labeled)
          takeRate: t.rate,
        }),
      })),
    [inputs, rooms, starRating],
  );

  const mid = scenarios[1].roi;

  const set = (patch: Partial<Inputs>) => {
    setSaved(false);
    setInputs((prev) => ({ ...prev, ...patch }));
  };

  return (
    <div className="space-y-6">
      {/* inputs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">Rooms</span>
          <input
            type="number" min={1} max={5000} value={rooms} disabled
            className="border-input text-ink mt-1 h-10 w-full border bg-white px-3 text-sm font-normal disabled:opacity-60"
          />
        </label>
        <label className="block">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">Occupancy %</span>
          <input
            type="number" min={20} max={100} value={Math.round(inputs.occupancy * 100)}
            onChange={(e) => set({ occupancy: Math.min(100, Math.max(20, Number(e.target.value) || 0)) / 100 })}
            className="border-input text-ink mt-1 h-10 w-full border bg-white px-3 text-sm font-normal"
          />
        </label>
        <label className="block">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">Avg stay (nights)</span>
          <input
            type="number" min={1} max={14} step={0.1} value={inputs.avgStayNights}
            onChange={(e) => set({ avgStayNights: Math.min(14, Math.max(1, Number(e.target.value) || 1)) })}
            className="border-input text-ink mt-1 h-10 w-full border bg-white px-3 text-sm font-normal"
          />
        </label>
        <label className="block">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">Current upsell sales / yr</span>
          <input
            type="number" min={0} value={inputs.currentUpsellRevenue}
            onChange={(e) => set({ currentUpsellRevenue: Math.max(0, Number(e.target.value) || 0) })}
            className="border-input text-ink mt-1 h-10 w-full border bg-white px-3 text-sm font-normal"
          />
        </label>
      </div>

      {/* scenarios — Low / Mid / High */}
      <div className="grid gap-3 md:grid-cols-3">
        {scenarios.map((s) => (
          <div key={s.label} className="border-hairline/20 bg-background border p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">
                {s.label} · {Math.round(s.rate * 100)}% take rate
              </span>
            </div>
            <p className="font-notch text-ink mt-2 text-2xl font-semibold tabular-nums">
              {money(s.roi.projectedYearly)}
            </p>
            <p className="text-muted-foreground text-xs">projected pre-arrival /yr</p>
            <dl className="divide-hairline/15 mt-3 divide-y border-hairline/15 border-y text-xs">
              <div className="flex justify-between py-1.5">
                <dt className="text-muted-foreground">Added /yr</dt>
                <dd className="text-ink font-semibold tabular-nums">{money(s.roi.addedYearly)}</dd>
              </div>
              <div className="flex justify-between py-1.5">
                <dt className="text-muted-foreground">Payback</dt>
                <dd className="text-ink font-semibold tabular-nums">
                  {s.roi.paybackMonths ? `${Math.round(s.roi.paybackMonths)} mo` : "—"}
                </dd>
              </div>
              <div className="flex justify-between py-1.5">
                <dt className="text-muted-foreground">3-yr kept (UpLayer)</dt>
                <dd className="text-ink font-semibold tabular-nums">{money(s.roi.keptUpLayer3yr)}</dd>
              </div>
              <div className="flex justify-between py-1.5">
                <dt className="text-muted-foreground">3-yr cost (SaaS 10%)</dt>
                <dd className="text-ink font-semibold tabular-nums">{money(s.roi.costSaaS3yrCommission)}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground text-xs leading-5">
        Projections are estimates computed by UpLayer&apos;s deterministic engine from your inputs —
        industry take-rate range, vendor reported. Mid scenario: {money(mid.projectedYearly)} projected,{" "}
        {mid.paybackMonths ? `${Math.round(mid.paybackMonths)}-month payback` : "no payback"} on a{" "}
        {money(inputs.buildPrice)} build{inputs.carePlan ? " + $1,000/yr care" : ""}, keep{" "}
        {money(mid.keptUpLayer3yr)} over 3 years.
      </p>

      {/* persist */}
      <form action={saveAction} className="flex flex-wrap items-center gap-4">
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="occupancy" value={Math.round(inputs.occupancy * 100)} />
        <input type="hidden" name="avgStayNights" value={inputs.avgStayNights} />
        <input type="hidden" name="currentUpsellRevenue" value={inputs.currentUpsellRevenue} />
        <input type="hidden" name="buildPrice" value={inputs.buildPrice} />
        <input type="hidden" name="carePlan" value={inputs.carePlan ? "on" : "off"} />
        <label className="text-body flex items-center gap-2 text-sm font-normal">
          <input
            type="checkbox" name="carePlanDisplay" checked={inputs.carePlan}
            onChange={(e) => set({ carePlan: e.target.checked })}
            className="accent-[#FF9E00] h-4 w-4"
          />
          Include the $1,000/yr care plan
        </label>
        <button
          type="submit" disabled={saving}
          className="bg-ink text-white hover:bg-ink/90 inline-flex h-10 items-center px-5 text-sm font-normal transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save these numbers"}
        </button>
        {saveState.saved ? <span className="text-xs text-[#00695C]">Saved.</span> : null}
        {saveState.error ? <span className="text-destructive text-xs">{saveState.error}</span> : null}
      </form>
    </div>
  );
}
