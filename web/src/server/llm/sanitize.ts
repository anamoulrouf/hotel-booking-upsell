// Untrusted-page-text sanitizer (docs/08 §2): crawled HTML becomes plain text
// for extraction. Scripts/styles/comments are dropped (the canary fixture's
// injection attempts live there), tags stripped, length capped.
const SCRIPT_STYLE = /<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi;
const COMMENTS = /<!--[\s\S]*?-->/g;
const TAGS = /<[^>]+>/g;
const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

export function pageTextForLlm(html: string, maxChars = 12_000): string {
  const text = html
    .replace(SCRIPT_STYLE, " ")
    .replace(COMMENTS, " ")
    .replace(TAGS, " ")
    .replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.slice(0, maxChars);
}
