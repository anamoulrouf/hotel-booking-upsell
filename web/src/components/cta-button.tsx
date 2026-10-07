"use client";

import { WALKTHROUGH_EMAIL } from "@/lib/constants";

// The walkthrough CTA — every placement fires cta_clicked (brief §11 funnel
// events) then opens the walkthrough mailto. keepalive so the POST survives
// the mailto handoff.
export function CtaButton({
  token,
  placement,
  variant = "amber",
  size = "lg",
  label = "Book a 15-minute walkthrough",
  testid,
  className = "",
}: {
  token: string;
  placement: "band" | "sticky" | "footer";
  variant?: "amber" | "ink";
  size?: "sm" | "lg";
  label?: string;
  testid: string;
  className?: string;
}) {
  const onClick = () => {
    try {
      fetch(`/api/reports/${token}/cta-click`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ placement }),
        keepalive: true,
      }).catch(() => {
        /* analytics must never block the CTA */
      });
    } catch {
      /* ditto */
    }
    const subject = encodeURIComponent("Walkthrough of my upsell report");
    const body = encodeURIComponent("I'd like a 15-minute walkthrough of my report.");
    window.location.href = `mailto:${WALKTHROUGH_EMAIL}?subject=${subject}&body=${body}`;
  };

  const look =
    variant === "amber"
      ? "bg-primary text-on-primary hover:brightness-95"
      : "bg-ink text-white hover:bg-ink/90";
  const sizing = size === "sm" ? "h-10 px-5 text-xs" : "h-14 px-8 text-sm";

  return (
    <button
      type="button"
      data-testid={testid}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-normal transition-[filter,background-color] ${look} ${sizing} ${className}`}
    >
      {label}
    </button>
  );
}
