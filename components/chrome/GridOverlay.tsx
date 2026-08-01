"use client";

import { useEffect, useState } from "react";

/**
 * MONO's own signature element: the 12-column layout grid can be exposed
 * like a drawing layer — toggle with the button or the G key.
 */
export default function GridOverlay({ label, hint }: { label: string; hint: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(input|textarea|select)$/i.test(target.tagName)) return;
      if (e.key.toLowerCase() === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {visible && (
        <div aria-hidden="true" className="page-margin pointer-events-none fixed inset-0 z-30">
          <div className="grid-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-full border-x border-ink/[0.06] bg-ink/[0.02]" />
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-pressed={visible}
        title={hint}
        className={`mono-label-xs fixed bottom-4 right-5 z-40 hidden border px-2.5 py-1.5 transition-colors md:block ${
          visible
            ? "border-ink bg-ink text-paper"
            : "border-line text-stone-deep hover:border-ink hover:text-ink"
        }`}
      >
        [G] {label}
      </button>
    </>
  );
}
