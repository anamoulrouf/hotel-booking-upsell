import { describe, expect, it } from "vitest";
import { parseRobots } from "./robots";

describe("robots parsing", () => {
  it("allows everything when no rules match our UA", () => {
    const r = parseRobots("User-agent: OtherBot\nDisallow: /x\n");
    expect(r.allowed("/anything")).toBe(true);
  });

  it("applies * group disallows", () => {
    const r = parseRobots("User-agent: *\nDisallow: /admin/\nDisallow: /private\n");
    expect(r.allowed("/rooms")).toBe(true);
    expect(r.allowed("/admin/login")).toBe(false);
    expect(r.allowed("/private")).toBe(false);
    expect(r.allowed("/privateX")).toBe(false); // literal prefix match (RFC 9309)
  });

  it("prefers our exact UA group over *", () => {
    const r = parseRobots("User-agent: *\nDisallow: /\n\nUser-agent: UpLayerReportBot\nDisallow: /admin/\n");
    expect(r.allowed("/rooms")).toBe(true);
    expect(r.allowed("/admin/x")).toBe(false);
  });

  it("longest match wins between Allow and Disallow", () => {
    const r = parseRobots("User-agent: *\nDisallow: /\nAllow: /public/\n");
    expect(r.allowed("/public/room")).toBe(true);
    expect(r.allowed("/other")).toBe(false);
  });

  it("empty disallow value means allow all", () => {
    const r = parseRobots("User-agent: *\nDisallow:\n");
    expect(r.allowed("/anything")).toBe(true);
  });

  it("parses crawl-delay in seconds", () => {
    const r = parseRobots("User-agent: *\nCrawl-delay: 2\n");
    expect(r.crawlDelayMs).toBe(2000);
  });
});
