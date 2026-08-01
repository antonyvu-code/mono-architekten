"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface Props {
  children: ReactNode;
  className?: string;
  /** reveal from bottom ("up") or from the left ("left") */
  direction?: "up" | "left";
  /** play immediately on mount instead of on scroll (page heroes) */
  immediate?: boolean;
}

/** Clip-path image reveal: the frame opens, the photo settles from scale 1.12 → 1. */
export default function Reveal({
  children,
  className = "",
  direction = "up",
  immediate = false,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const frame = frameRef.current!;
      const img = frame.querySelector("img");

      const from =
        direction === "up" ? "inset(100% 0% 0% 0%)" : "inset(0% 100% 0% 0%)";

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1.15 },
        scrollTrigger: immediate
          ? undefined
          : { trigger: frame, start: "top 82%", once: true },
      });
      tl.fromTo(frame, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)" });
      if (img) tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.4 }, 0);
    },
    { scope: frameRef }
  );

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
