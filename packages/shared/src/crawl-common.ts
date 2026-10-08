// Crawl rules shared by the worker crawler and the web fallback crawler —
// one copy so the two paths can never drift (they classify and filter
// identically or the score depends on which path happened to run).

export const CRAWL_UA = "UpLayerReportBot/1.0 (+https://uplayer.agency/bot)";

export const PRIORITY: { re: RegExp; kind: string }[] = [
  { re: /\/(offers|packages|experiences|activities|tours)/, kind: "offers" },
  { re: /\/(faq|faqs|questions)/, kind: "faq" },
  { re: /\/(rooms|suites|accommodation|stay)/, kind: "rooms" },
  { re: /\/(dining|restaurant|food|bar)/, kind: "dining" },
  { re: /\/(spa|wellness|gym|pool)/, kind: "spa" },
  { re: /\/(about|story|contact)/, kind: "about" },
];

export function classifyKind(pathname: string): string {
  if (pathname === "/") return "home";
  return PRIORITY.find((p) => p.re.test(pathname))?.kind ?? "page";
}

const SKIP_PATH = /\/(wp-admin|wp-login|cart|checkout|account|calendar)/;

export function canonicalUrl(url: string): string {
  try {
    const u = new URL(url);
    // www and apex are the same site for dedupe (hotels redirect between them)
    const host = u.hostname.replace(/^www\./, "");
    const p = u.pathname === "/" ? "/" : u.pathname.replace(/\/+$/, "");
    return `${u.protocol}//${host}${p}`;
  } catch {
    return url;
  }
}

export function extractLinksWithText(
  html: string,
  base: URL,
): { url: string; text: string }[] {
  const baseHost = base.hostname;
  const out = new Map<string, { url: string; text: string }>();
  for (const m of html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    try {
      const u = new URL(m[1], base);
      if (!/^https?:$/i.test(u.protocol)) continue;
      // image-only links carry their intent in alt/title — append so the
      // engine picker can see "Book" on an <img>-based anchor
      const alts = [...m[2].matchAll(/\b(?:alt|title)=["']([^"']+)["']/gi)].map((a) => a[1]);
      const text = (
        m[2].replace(TAGS_RE, " ").replace(/\s+/g, " ").trim() +
        " " +
        alts.join(" ")
      )
        .trim()
        .slice(0, 100);
      const key = `${u.origin}${u.pathname}`;
      if (!out.has(key)) out.set(key, { url: key, text });
    } catch {
      /* malformed href */
    }
  }
  return [...out.values()];
}

const TAGS_RE = /<[^>]+>/g;

// same-origin comparison that treats example.com and www.example.com as one
// site — hotels routinely redirect to www and would otherwise starve the crawl
function sameSite(a: string, b: string): boolean {
  return a.replace(/^www\./, "") === b.replace(/^www\./, "");
}

export function extractLinks(html: string, base: URL): string[] {
  const baseHost = base.hostname;
  const out = new Set<string>();
  for (const m of html.matchAll(/href="([^"#]+)"/g)) {
    try {
      const u = new URL(m[1], base);
      if (!sameSite(u.hostname, baseHost)) continue;
      if (u.protocol !== "http:" && u.protocol !== "https:") continue;
      if (SKIP_PATH.test(u.pathname)) continue;
      out.add(u.origin + u.pathname);
    } catch {
      /* malformed href */
    }
  }
  return [...out];
}

// The hotel's booking-engine link (docs/03 §1 data point 5): usually
// cross-origin and often white-labeled — the engine name is not in the URL,
// so match the anchor text ("Book now", "Reserve", "Check availability")
// and known engine URL markers. One hop, robots-checked by the caller.
export function pickEngineLink(
  links: { url: string; text: string }[],
  enginePatterns: RegExp[],
): string | null {
  const byText = links.find((l) => /book|reserv|rates|check availability|extras/i.test(l.text));
  if (byText) return byText.url;
  const byUrl = links.find((l) => enginePatterns.some((re) => re.test(l.url)));
  return byUrl?.url ?? null;
}

// ——— robots.txt (RFC 9309 subset) ———
// UA groups, Disallow/Allow prefixes (literal prefix match), longest-match
// wins, Crawl-Delay honored. 401/403 robots = block all; missing or other
// 4xx/5xx = allow. An empty Disallow value means "allow everything".

export type Robots = {
  fetched: boolean;
  blockedAll: boolean;
  crawlDelayMs: number | null;
  allowed(pathname: string): boolean;
};

type Rule = { allow: boolean; prefix: string };

export function parseRobots(txt: string, ua = "UpLayerReportBot"): Robots {
  const groups: { agents: string[]; rules: Rule[]; delay: number | null }[] = [];
  let current: (typeof groups)[number] | null = null;
  let lastWasAgent = false;

  for (const rawLine of txt.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();

    if (key === "user-agent") {
      if (!current || !lastWasAgent) {
        current = { agents: [], rules: [], delay: null };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (!current) continue;
    if (key === "disallow" && value !== "") current.rules.push({ allow: false, prefix: value });
    else if (key === "allow" && value !== "") current.rules.push({ allow: true, prefix: value });
    else if (key === "crawl-delay") {
      const d = Number(value);
      if (Number.isFinite(d) && d >= 0) current.delay = d * 1000;
    }
  }

  const uaLower = ua.toLowerCase();
  const matched =
    groups.find((g) => g.agents.includes(uaLower)) ?? groups.find((g) => g.agents.includes("*"));

  if (!matched) return { fetched: true, blockedAll: false, crawlDelayMs: null, allowed: () => true };

  return {
    fetched: true,
    blockedAll: false,
    crawlDelayMs: matched.delay,
    allowed(pathname: string): boolean {
      const hits = matched.rules
        .filter((r) => pathname.startsWith(r.prefix))
        .sort((a, b) => b.prefix.length - a.prefix.length);
      return hits.length === 0 || hits[0].allow;
    },
  };
}

export async function fetchRobots(origin: string, timeoutMs = 5_000): Promise<Robots> {
  try {
    const res = await fetch(`${origin}/robots.txt`, {
      headers: { "user-agent": CRAWL_UA },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (res.status === 401 || res.status === 403) {
      return { fetched: true, blockedAll: true, crawlDelayMs: null, allowed: () => false };
    }
    if (!res.ok) return { fetched: false, blockedAll: false, crawlDelayMs: null, allowed: () => true };
    return parseRobots(await res.text());
  } catch {
    return { fetched: false, blockedAll: false, crawlDelayMs: null, allowed: () => true };
  }
}
