"use client";

import { useEffect, useRef } from "react";

/**
 * Lab Noir signature: live instrument readout, real values only —
 * Berlin clock, scroll offset, viewport size.
 */
export default function Telemetry() {
  const clockRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLSpanElement>(null);
  const vpRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("de-DE", {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const tickClock = () => {
      if (clockRef.current) clockRef.current.textContent = `BER ${fmt.format(new Date())}`;
    };
    tickClock();
    const clockId = setInterval(tickClock, 1000);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.textContent = `Y ${String(Math.round(window.scrollY)).padStart(5, "0")}`;
        }
      });
    };
    const onResize = () => {
      if (vpRef.current) {
        vpRef.current.textContent = `VP ${window.innerWidth}×${window.innerHeight}`;
      }
    };
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(clockId);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="mono-label-xs pointer-events-none fixed bottom-4 left-5 z-40 hidden gap-5 text-stone-deep md:flex"
    >
      <span ref={clockRef} />
      <span ref={scrollRef} />
      <span ref={vpRef} />
      <span>52.529°N 13.401°E</span>
    </div>
  );
}
