import { createServer } from "node:http";
import { describe, expect, it } from "vitest";
import { parseListingFromText, searchOtaListing } from "./ota";

describe("parseListingFromText", () => {
  it("parses star and nightly rate from listing snippets", () => {
    const r = parseListingFromText("Hotel Aurora, a 4-star hotel in Lisbon. Rooms from $180 per night.");
    expect(r.starRating).toBe(4);
    expect(r.nightlyRate).toBe(180);
  });

  it("parses 'rated X out of 5' and 'from €120/night'", () => {
    const r = parseListingFromText("Rated 5 out of 5 by guests. Doubles from €120/night.");
    expect(r.starRating).toBe(5);
    expect(r.nightlyRate).toBe(120);
  });

  it("clamps garbage: 12 stars and $5 nightly are rejected", () => {
    const r = parseListingFromText("A 12-star hotel. Rooms from $5 per night.");
    expect(r.starRating).toBeUndefined();
    expect(r.nightlyRate).toBeUndefined();
  });
});

describe("searchOtaListing", () => {
  it("hits the stub and merges listing data", async () => {
    const server = createServer((req, res) => {
      let raw = "";
      req.on("data", (c) => (raw += c));
      req.on("end", () => {
        expect(raw).toContain("Hotel Aurora");
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            results: [
              { title: "Hotel Aurora", content: "a 4-star boutique hotel", url: "https://booking.com/x" },
              { title: "Rates", content: "from $150 per night", url: "https://booking.com/x" },
            ],
          }),
        );
      });
    });
    await new Promise<void>((r) => server.listen(0, () => r()));
    process.env.TAVILY_API_KEY = "test-key";
    process.env.SEARCH_BASE_URL = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
    try {
      const listing = await searchOtaListing({ name: "Hotel Aurora", city: "Lisbon" });
      expect(listing?.starRating).toBe(4);
      expect(listing?.nightlyRate).toBe(150);
    } finally {
      delete process.env.TAVILY_API_KEY;
      delete process.env.SEARCH_BASE_URL;
      await new Promise<void>((r) => server.close(() => r()));
    }
  });

  it("returns null without a key", async () => {
    delete process.env.TAVILY_API_KEY;
    expect(await searchOtaListing({ name: "X" })).toBeNull();
  });
});
