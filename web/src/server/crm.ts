// CRM sync (docs/09 M7): a new unlocked lead posts as JSON to
// CRM_WEBHOOK_URL. Idempotent via leads.crm_synced_at — set only on success
// so failed syncs retry on the next unlock/cron pass. Unset URL ⇒ skipped.
import { CRM_WEBHOOK_URL } from "@/lib/env";

export type LeadPayload = {
  email: string;
  name: string;
  role: string;
  roomCount: number;
  hotel: string;
  grade: string | null;
  score: number | null;
  reportUrl: string;
};

export function crmPayload(lead: LeadPayload): string {
  return JSON.stringify({ type: "lead_unlocked", lead, ts: new Date().toISOString() });
}

export async function syncLeadToCrm(lead: LeadPayload): Promise<boolean> {
  const url = CRM_WEBHOOK_URL();
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: crmPayload(lead),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
