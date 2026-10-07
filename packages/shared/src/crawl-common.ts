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
    const p = u.pathname === "/" ? "/" : u.pathname.replace(/\/+$/, "");
    return `${u.origin}${p}`;
  } catch {
    return url;
  }
}

export function extractLinks(html: string, base: URL): string[] {
  const out = new Set<string>();
  for (const m of html.matchAll(/href="([^"#]+)"/g)) {
    try {
      const u = new URL(m[1], base);
      if (u.origin !== base.origin) continue;
      if (u.protocol !== "http:" && u.protocol !== "https:") continue;
      if (SKIP_PATH.test(u.pathname)) continue;
      out.add(u.origin + u.pathname);
    } catch {
      /* malformed href */
    }
  }
  return [...out];
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
