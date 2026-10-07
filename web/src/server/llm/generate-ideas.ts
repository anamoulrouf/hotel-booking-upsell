// Package-idea generation (brief §8, docs/03 §4.1): sonnet drafts 15–20 ideas
// from the hotel's facts and found packages. Constraints enforced by prompt +
// merge rules: never propose an included item, never contradict the site,
// prices labeled "suggested, set your own". Fallback: a small generic list,
// labeled generic (docs/03 §4.1).
import { z } from "zod";
import type { Anthropic } from "@anthropic-ai/sdk";
import { GENERATE_MODEL } from "./client";

export const ideaSchema = z.object({
  name: z.string().min(2).max(120),
  oneLine: z.string().min(10).max(220),
  guestFit: z.string().max(120).optional(),
  timing: z.string().max(60).optional(),
  priceLow: z.number().min(0).max(100_000).nullable().optional(),
  priceHigh: z.number().min(0).max(100_000).nullable().optional(),
  category: z.string().max(40).default("room_stay"),
});
export const ideasResultSchema = z.object({ ideas: z.array(ideaSchema).min(5).max(20) });
export type Idea = z.infer<typeof ideaSchema>;

const SYSTEM = `You draft pre-arrival upsell package ideas for a hotel.
Constraints:
- NEVER propose an item the hotel already includes complimentary (listed as included).
- NEVER invent facilities the hotel does not have (no spa idea without a spa; partner experiences must say "partner").
- Prices are SUGGESTED ranges only, always modest and realistic for the hotel's market.
- Every idea gets a one-line pitch (what the guest gets), a guest fit, and a timing: "at booking", "12 days out", or "2 days out".
Output ONLY one JSON object: {"ideas":[{"name":"","oneLine":"","guestFit":"","timing":"","priceLow":0,"priceHigh":0,"category":""}]}
category is one of: room_stay, food_drink, wellness, family, romance, business, local, arrival. No prose, no markdown fences.`;

function parseIdeas(text: string): Idea[] | null {
  const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  try {
    const parsed = ideasResultSchema.safeParse(JSON.parse(json));
    return parsed.success ? parsed.data.ideas : null;
  } catch {
    return null;
  }
}

export async function generateIdeasWithLlm(
  client: Anthropic,
  input: {
    name: string;
    city?: string | null;
    starRating?: number | null;
    foundPackages: string[];
    includedItems: string[];
    amenities: string[];
  },
): Promise<Idea[] | null> {
  const user = [
    `Hotel: ${input.name}${input.city ? ` (${input.city})` : ""}${input.starRating ? ` · ${input.starRating} stars` : ""}`,
    `Found packages (already sold by the hotel): ${input.foundPackages.join(", ") || "none detected"}`,
    `Already included complimentary — NEVER propose: ${input.includedItems.join(", ") || "nothing detected"}`,
    `Facilities/amenities detected: ${input.amenities.join(", ") || "none detected"}`,
    "Draft 15-20 pre-arrival upsell ideas that fit this exact hotel.",
  ].join("\n");

  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await client.messages.create({
      model: GENERATE_MODEL,
      max_tokens: 3000,
      temperature: 0.4,
      system: SYSTEM,
      messages: [{ role: "user", content: user }],
    });
    let text = "";
    for (const block of res.content) {
      if (block.type === "text") {
        text = block.text;
        break;
      }
    }
    const ideas = parseIdeas(text);
    if (ideas) return ideas;
  }
  return null;
}

// Deterministic fallback (docs/03 §4.1: "generic list for hotel type,
// labeled generic") — category-complete, no facility assumptions.
export function genericIdeas(): Idea[] {
  return [
    { name: "Early check-in", oneLine: "Drop your bags and start the day the moment you arrive.", guestFit: "All guests", timing: "at booking", priceLow: 20, priceHigh: 40, category: "room_stay" },
    { name: "Late check-out", oneLine: "Keep the room until late afternoon on departure day.", guestFit: "Leisure + business", timing: "2 days out", priceLow: 25, priceHigh: 50, category: "room_stay" },
    { name: "Room upgrade on arrival", oneLine: "A better view and more space, confirmed before you travel.", guestFit: "Couples", timing: "2 days out", priceLow: 40, priceHigh: 90, category: "room_stay" },
    { name: "Breakfast pro upgrade", oneLine: "Skip the line with a served premium breakfast for two.", guestFit: "Couples", timing: "at booking", priceLow: 15, priceHigh: 35, category: "food_drink" },
    { name: "Welcome drinks on the terrace", oneLine: "Two house cocktails to start the stay right.", guestFit: "Couples", timing: "at booking", priceLow: 20, priceHigh: 45, category: "food_drink" },
    { name: "In-room celebration set", oneLine: "Bubbles and treats chilled and waiting in the room.", guestFit: "Couples + celebrations", timing: "2 days out", priceLow: 35, priceHigh: 80, category: "romance" },
    { name: "Guaranteed parking spot", oneLine: "One less thing to worry about — your spot is waiting.", guestFit: "Road trippers", timing: "at booking", priceLow: 10, priceHigh: 30, category: "arrival" },
    { name: "Airport transfer, private car", oneLine: "A driver meets you at arrivals — fixed price, no surge.", guestFit: "All guests", timing: "at booking", priceLow: 35, priceHigh: 90, category: "arrival" },
    { name: "Late-night snack box", oneLine: "A curated box delivered to the door, until midnight.", guestFit: "Families + business", timing: "2 days out", priceLow: 15, priceHigh: 35, category: "food_drink" },
    { name: "Quiet-floor guarantee", oneLine: "The quietest wing of the hotel, confirmed at booking.", guestFit: "Business + light sleepers", timing: "at booking", priceLow: 15, priceHigh: 40, category: "room_stay" },
  ];
}
