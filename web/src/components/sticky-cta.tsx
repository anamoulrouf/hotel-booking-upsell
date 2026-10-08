"use client";

import { useEffect, useState } from "react";
import { CtaButton } from "./cta-button";

// Persistent walkthrough bar — visible only in the middle zone of the report:
// hidden while the verdict band (#cta-band) or the end of the page (#next-steps)
// is on screen, so it never doubles up with another CTA or covers the footer.
export function StickyCta({ token, range }: { token: string; range: string | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const band = document.getElementById("cta-band");
    const end = document.getElementById("next-steps");
    if (!band || !end) return;
    let bandOnScreen = true;
    let endOnScreen = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target.id === "cta-band") bandOnScreen = e.isIntersecting;
          if (e.target.id === "next-steps") endOnScreen = e.isIntersecting;
        }
        setVisible(!bandOnScreen && !endOnScreen);
      },
      { rootMargin: "0px" },
    );
    io.observe(band);
    io.observe(end);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-label="Book a walkthrough"
      data-testid="sticky-cta"
      className={`bg-surface-alt/95 fixed inset-x-0 bottom-0 z-50 border-t border-white/10 backdrop-blur print:hidden transition-transform duration-300 motion-reduce:transition-none ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3">
        <p className="text-sm text-white/80">
          {range ? (
            <>
              <span className="font-notch text-brand text-base font-semibold">{range}</span>
              <span className="text-white/60"> /yr missing · est.</span>
            </>
          ) : (
            "Your report is ready"
          )}
        </p>
        <CtaButton
          token={token}
          placement="sticky"
          variant="amber"
          size="sm"
          label="Book a walkthrough"
          testid="cta-sticky-button"
        />
      </div>
    </div>
  );
}
