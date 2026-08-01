"use client";

import { createElement, useRef, type ElementType } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface Props {
  /** Lines of text; each line gets its own mask and enters with a stagger. */
  lines: string[];
  as?: ElementType;
  className?: string;
  /** extra class per line wrapper (e.g. italic on the second line) — serializable for RSC */
  lineClassNames?: string[];
  /** play on mount (hero) instead of on scroll */
  immediate?: boolean;
  delay?: number;
}

/** Masked line-by-line text reveal — used only for heroes and section openers. */
export default function RevealText({
  lines,
  as = "h2",
  className = "",
  lineClassNames,
  immediate = false,
  delay = 0,
}: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        rootRef.current!.querySelectorAll("[data-line]"),
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.09,
          delay,
          scrollTrigger: immediate
            ? undefined
            : { trigger: rootRef.current, start: "top 85%", once: true },
        }
      );
    },
    { scope: rootRef }
  );

  return createElement(
    as,
    { ref: rootRef, className },
    lines.map((line, i) => (
      <span key={i} className="block overflow-hidden">
        <span data-line className={`block will-change-transform ${lineClassNames?.[i] ?? ""}`}>
          {line}
        </span>
      </span>
    ))
  );
}
