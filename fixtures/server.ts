// Fixture sites for the E2E suite (docs/06-testing-strategy.md §2).
// M0: skeleton with the stateful 403-on-second-request middleware (Dolli learning 3).
// Full fixture content (schema.org, packages, FAQ wording, 40-link page) lands in M2.
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const PORTS = {
  "rich-hotel.test": 4311, // fixture A — schema.org, priced packages, engine 403s on 2nd hit
  "sparse-hotel.test": 4312, // fixture B — JS-rendered, no JSON-LD
  "canary-hotel.test": 4313, // fixture C — prompt-injection canary
} as const;

// Per-host request counter → engine path 403s on its second hit (case I41).
const engineHits = new Map<string, number>();

const MIME: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".txt": "text/plain",
  ".png": "image/png",
};

function serve(port: number, host: string) {
  createServer((req, res) => {
    const url = new URL(req.url ?? "/", `http://${host}`);

    if (url.pathname === "/engine/rates") {
      const hits = (engineHits.get(host) ?? 0) + 1;
      engineHits.set(host, hits);
      if (hits >= 2) {
        // Dolli learning 3: engines 403 the second bot hit — first hit must
        // already carry the fingerprint + buy affordance (case I41).
        res.writeHead(403, { "content-type": "text/plain" });
        return res.end("Forbidden");
      }
      res.writeHead(200, { "content-type": "text/html" });
      return res.end(readFileSync(join(import.meta.dirname, host.replace(/\./g, "-"), "engine.html")));
    }

    // Static resolution: extension-bearing paths as-is, else try .html, then dir index.
    const root = join(import.meta.dirname, host.replace(/\./g, "-"));
    const base = url.pathname === "/" ? "index.html" : url.pathname.replace(/^\/+/, "");
    const candidates = existsSync(join(root, base)) && !statSync(join(root, base)).isDirectory()
      ? [join(root, base)]
      : [join(root, `${base}.html`), join(root, base, "index.html")];
    const file = candidates.find((f) => existsSync(f) && statSync(f).isFile());
    if (file) {
      res.writeHead(200, { "content-type": MIME[extname(file)] ?? "text/html" });
      return res.end(readFileSync(file));
    }

    res.writeHead(404, { "content-type": "text/plain" });
    res.end("fixture: not found");
  }).listen(port, () => console.log(`fixture ${host} on :${port}`));
}

for (const [host, port] of Object.entries(PORTS)) serve(port, host);

// Keep the unused-import linter calm while the suite is a skeleton.
export type { IncomingMessage, ServerResponse };
