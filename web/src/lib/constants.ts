// Brief §15 constants — single app-side source (CLAUDE.md rule 6).
// Values live in @uplayer/shared; this module is the only place UI reads them from.
export {
  TOOL_NAME,
  DEFAULTS,
  SCORE_MAX,
} from "@uplayer/shared";

// Walkthrough CTA target (brief §3 step 6, §9.7). When SCHEDULER_URL is set
// (Cal.com et al.) the CTA books directly and logs call_booked; otherwise it
// falls back to a mailto. Centralized so ops can repoint it without touching
// page code.
export const WALKTHROUGH_EMAIL = "hello@uplayer.agency";
// Client-readable: NEXT_PUBLIC_ vars inline into the browser bundle.
export const schedulerUrl = () => process.env.NEXT_PUBLIC_SCHEDULER_URL || "";
