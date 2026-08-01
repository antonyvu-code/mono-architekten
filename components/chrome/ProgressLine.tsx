"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Lab Noir signature: 2px scroll-progress line, moving like a gauge needle. */
export default function ProgressLine() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const set = gsap.quickSetter(barRef.current, "scaleX");
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => set(self.progress),
    });
    return () => st.kill();
  });

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-stone"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
