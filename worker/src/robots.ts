// Minimal robots.txt (RFC 9309 subset): UA groups, Disallow/Allow prefixes,
// longest-match wins, Crawl-Delay honored. 401/403 robots = block all;
// missing or other 4xx/5xx = allow (standard crawlers' behavior).
import { CRAWL_UA } from "./ua";

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
    // an empty Disallow value means "allow everything" (RFC 9309) — no rule
    if (key === "disallow" && value !== "") current.rules.push({ allow: false, prefix: value });
    else if (key === "allow" && value !== "") current.rules.push({ allow: true, prefix: value });
    else if (key === "crawl-delay") {
      const d = Number(value);
      if (Number.isFinite(d) && d >= 0) current.delay = d * 1000;
    }
  }

  // our group = exact UA match wins over *; longest agent string wins
  const uaLower = ua.toLowerCase();
  const ours = groups
    .filter((g) => g.agents.includes(uaLower))
    .concat(groups.filter((g) => !g.agents.includes(uaLower) && g.agents.includes("*")));
  const matched = ours.find((g) => g.agents.includes(uaLower)) ?? ours.find((g) => g.agents.includes("*"));

  if (!matched) return { fetched: true, blockedAll: false, crawlDelayMs: null, allowed: () => true };

  return {
    fetched: true,
    blockedAll: false,
    crawlDelayMs: matched.delay,
    allowed(pathname: string): boolean {
      const hits = matched!.rules
        .filter((r) => pathname.startsWith(r.prefix))
        .sort((a, b) => b.prefix.length - a.prefix.length);
      return hits.length === 0 || hits[0].allow;
    },
  };
}

export async function fetchRobots(origin: string): Promise<Robots> {
  try {
    const res = await fetch(`${origin}/robots.txt`, { headers: { "user-agent": CRAWL_UA } });
    if (res.status === 401 || res.status === 403) {
      return { fetched: true, blockedAll: true, crawlDelayMs: null, allowed: () => false };
    }
    if (!res.ok) return { fetched: false, blockedAll: false, crawlDelayMs: null, allowed: () => true };
    return parseRobots(await res.text());
  } catch {
    return { fetched: false, blockedAll: false, crawlDelayMs: null, allowed: () => true };
  }
}
