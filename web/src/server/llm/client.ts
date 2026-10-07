// Claude client for extraction (docs/03 §2): haiku-4-5, JSON-only outputs.
// LLM_BASE_URL points at the stub server in tests (docs/09 §5); production
// leaves it unset. Returns null when unconfigured — callers fall back to the
// deterministic path (the pipeline never hard-depends on the LLM).
import Anthropic from "@anthropic-ai/sdk";

export const LLM_MODEL = "claude-haiku-4-5"; // extraction model per CLAUDE.md
export const GENERATE_MODEL = "claude-sonnet-5-5"; // copy + ideas per CLAUDE.md

export function getLlmClient(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  return new Anthropic({
    apiKey,
    baseURL: process.env.LLM_BASE_URL || undefined,
    maxRetries: 2,
    timeout: 30_000,
  });
}
