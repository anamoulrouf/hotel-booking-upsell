// Booking-engine + upsell-tool fingerprints (docs/03-pipeline.md §2–3).
// Matched against raw HTML (scripts, links, iframes, cookies, markers).
// WebHotelier included per the Dolli field test (learning 6).

export const BOOKING_ENGINES: { name: string; patterns: RegExp[]; extrasKnown: boolean }[] = [
  { name: "SynXis", patterns: [/synxis/i, /be\.synxis\.com/i], extrasKnown: true },
  { name: "iHotelier", patterns: [/ihotelier/i, /travelclick/i], extrasKnown: true },
  { name: "Cloudbeds", patterns: [/hotels\.cloudbeds/i, /booking\.cloudbeds/i], extrasKnown: true },
  { name: "Mews", patterns: [/app\.mews\.com/i, /mewsubs/i], extrasKnown: true },
  { name: "SiteMinder TheBookingButton", patterns: [/thebookingbutton/i, /sitefinder\.siteminder/i], extrasKnown: true },
  { name: "Little Hotelier", patterns: [/littlehotelier/i], extrasKnown: true },
  { name: "WebRezPro", patterns: [/webrezpro/i], extrasKnown: false },
  { name: "Bookassist", patterns: [/bookassist/i], extrasKnown: true },
  { name: "Profitroom", patterns: [/profitroom/i], extrasKnown: true },
  { name: "RMS Cloud", patterns: [/rmscloud/i], extrasKnown: false },
  { name: "eviivo", patterns: [/eviivo/i], extrasKnown: true },
  { name: "Stayntouch", patterns: [/stayntouch/i], extrasKnown: true },
  { name: "ThinkReservations", patterns: [/thinkreservations/i], extrasKnown: true },
  { name: "ResNexus", patterns: [/resnexus/i], extrasKnown: true },
  { name: "WebHotelier", patterns: [/webhotelier/i, /hotelwithflight/i], extrasKnown: false },
  { name: "Clock PMS", patterns: [/clocksoftware/i, /clockpms/i], extrasKnown: false },
  { name: "Guestline", patterns: [/guestline/i, /rezn/i], extrasKnown: false },
  { name: "Protel (Planet)", patterns: [/protel/i, /weareplanet/i], extrasKnown: false },
];

// The hotel's likely PMS, inferred from the booking engine where they come together.
export const PMS_BY_ENGINE: Record<string, string> = {
  Mews: "Mews",
  Cloudbeds: "Cloudbeds",
  "Little Hotelier": "Little Hotelier",
  Stayntouch: "Stayntouch",
  eviivo: "eviivo",
  "RMS Cloud": "RMS Cloud",
};

export const UPSELL_TOOLS: { name: string; patterns: RegExp[]; beyondCheckin: boolean }[] = [
  { name: "Oaky", patterns: [/oaky\.com/i, /getoaky/i], beyondCheckin: true },
  { name: "Chekin", patterns: [/chekin/i], beyondCheckin: false },
  { name: "Duve", patterns: [/duve/i, /wishbox/i], beyondCheckin: true },
  { name: "UpsellGuru", patterns: [/upsellguru/i], beyondCheckin: true },
  { name: "Canary Technologies", patterns: [/canarytechnologies/i, /canaryapply/i], beyondCheckin: true },
  { name: "AeroGuest", patterns: [/aeroguest/i], beyondCheckin: false },
  { name: "HiJiffy", patterns: [/hijiffy/i], beyondCheckin: true },
  { name: "Conduit (HostAI)", patterns: [/conduit\.ai/i, /hostai/i], beyondCheckin: true },
  { name: "Akia", patterns: [/akia\.com/i], beyondCheckin: true },
  { name: "Whistle (Cloudbeds)", patterns: [/whistle\.cloudbeds/i, /askwhistle/i], beyondCheckin: true },
  { name: "Straiv", patterns: [/straiv/i, /code2order/i], beyondCheckin: false },
  { name: "GuestJoy (SiteMinder)", patterns: [/guestjoy/i], beyondCheckin: true },
  { name: "Bookboost", patterns: [/bookboost/i], beyondCheckin: true },
  { name: "Nor1", patterns: [/nor1/i], beyondCheckin: false },
];

// Widgets that are NOT upsell tools (recorded so the report can say so — the
// Dolli field test caught The Hotels Network being miscounted as one).
export const NON_UPSELL_WIDGETS: { name: string; patterns: RegExp[] }[] = [
  { name: "The Hotels Network", patterns: [/thehotelsnetwork/i] },
];

export type FingerprintHit = { name: string; evidence: string };

export function detectEngines(htmls: string[]): { hit: FingerprintHit; extrasKnown: boolean } | null {
  const haystack = htmls.join("\n").slice(0, 4_000_000);
  for (const engine of BOOKING_ENGINES) {
    for (const re of engine.patterns) {
      const m = haystack.match(re);
      if (m) return { hit: { name: engine.name, evidence: `matched /${m[0]}/i` }, extrasKnown: engine.extrasKnown };
    }
  }
  return null;
}

export function detectUpsellTools(htmls: string[]): {
  upsell: FingerprintHit[];
  beyondCheckin: boolean;
  widgets: string[];
} {
  const haystack = htmls.join("\n").slice(0, 4_000_000);
  const upsell: FingerprintHit[] = [];
  let beyondCheckin = false;
  for (const tool of UPSELL_TOOLS) {
    for (const re of tool.patterns) {
      const m = haystack.match(re);
      if (m) {
        upsell.push({ name: tool.name, evidence: `matched /${m[0]}/i` });
        if (tool.beyondCheckin) beyondCheckin = true;
        break;
      }
    }
  }
  const widgets = NON_UPSELL_WIDGETS.filter((w) => w.patterns.some((re) => re.test(haystack))).map((w) => w.name);
  return { upsell, beyondCheckin, widgets };
}

// Dolli learning 5: a hotel that emails a payment link after booking already
// does the pre-arrival payment step manually — a strong outreach signal.
export const MANUAL_PAYMENT_LINK_PATTERNS: RegExp[] = [
  /payment link/i,
  /secure payment link/i,
  /we (?:will|'ll) (?:email|send) you (?:a|the) (?:secure )?(?:payment|paying) link/i,
  /pay(?:ing)? (?:the )?(?:deposit|balance) (?:via|by) (?:bank )?transfer/i,
];

export function detectManualPaymentLink(htmls: string[]): FingerprintHit | null {
  const haystack = htmls.join("\n").slice(0, 4_000_000);
  for (const re of MANUAL_PAYMENT_LINK_PATTERNS) {
    const m = haystack.match(re);
    if (m) return { name: "manual payment link", evidence: `FAQ matched "${m[0]}"` };
  }
  return null;
}
