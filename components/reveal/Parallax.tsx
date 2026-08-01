"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface Props {
  children: ReactNode;
  className?: string;
  /** yPercent travel, kept deliberately small (concept: 5–10, never more) */
  amount?: number;
}

/** Very light scrub parallax. The inner layer is overscanned so edges never show. */
export default function Parallax({ children, className = "", amount = 6 }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        innerRef.current,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: frameRef }
  );

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={innerRef}
        className="absolute inset-x-0"
        style={{ top: `-${amount * 1.6}%`, height: `${100 + amount * 3.2}%` }}
      >
        {children}
      </div>
    </div>
  );
}
