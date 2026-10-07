// Brief §15 constants — single app-side source (CLAUDE.md rule 6).
// Values live in @uplayer/shared; this module is the only place UI reads them from.
export {
  TOOL_NAME,
  DEFAULTS,
  SCORE_MAX,
} from "@uplayer/shared";

// Walkthrough CTA target (brief §3 step 6, §9.7) until the scheduler lands.
// Centralized so the CEO/ops can repoint it without touching page code.
export const WALKTHROUGH_EMAIL = "hello@uplayer.agency";
