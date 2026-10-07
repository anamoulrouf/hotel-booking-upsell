"use client";

import { useState } from "react";

// Share actions for the private report URL (brief §6: "shareable link").
// Client-side so the URL resolves at click time — no server URL plumbing.

export function CopyReportLink() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      data-testid="copy-link"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* clipboard unavailable — no-op */
        }
      }}
      className="border-border text-body hover:border-hairline hover:text-hairline inline-flex h-9 items-center gap-2 border px-4 text-xs font-normal transition-colors"
    >
      {copied ? "Link copied" : "Copy report link"}
    </button>
  );
}

export function ShareReportLink() {
  return (
    <button
      type="button"
      data-testid="share-link"
      onClick={() => {
        const url = window.location.href;
        window.location.href = `mailto:?subject=${encodeURIComponent(
          "Our hotel's upsell report",
        )}&body=${encodeURIComponent(`Here's the upsell report for our hotel: ${url}`)}`;
      }}
      className="text-body hover:text-hairline inline-flex h-9 items-center text-xs font-normal transition-colors"
    >
      Send this to my team →
    </button>
  );
}
