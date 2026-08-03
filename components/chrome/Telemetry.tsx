"use client";

import { useEffect, useRef } from "react";
import { sunPosition } from "@/lib/sun";

/**
 * VITRINE-Telemetrie — gemessene Werte, aber die des Themas.
 *
 * Vorher standen hier `Y 00000` (Scroll-Offset) und die Viewport-Größe. Beides ist wahr,
 * aber es sind Tatsachen des *Browsers*, nicht der Architektur. Ein Ausstellungsraum misst
 * Licht: Sonnenhöhe und Himmelsrichtung, berechnet aus der Berliner Uhr und den Koordinaten,
 * die ohnehin in dieser Zeile stehen. Damit sind die Eingaben der Rechnung sichtbar neben
 * ihrem Ergebnis.
 *
 * `aria-hidden`, weil sich die Werte im Sekundentakt ändern — vorgelesen wären sie Lärm.
 * Die inhaltlich wichtige Fassung steht als `SunReadout` im Hero, dort ohne `aria-hidden`.
 */
export default function Telemetry() {
  const clockRef = useRef<HTMLSpanElement>(null);
  const sunRef = useRef<HTMLSpanElement>(null);
  const vpRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("de-DE", {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const tick = () => {
      const now = new Date();
      if (clockRef.current) clockRef.current.textContent = `BER ${fmt.format(now)}`;
      if (sunRef.current) {
        const sun = sunPosition(now);
        sunRef.current.textContent = sun.isDay
          ? `SONNE ${sun.elevation.toFixed(1)}° ${sun.compass}`
          : `SONNE ${sun.elevation.toFixed(1)}° — UNTER HORIZONT`;
      }
    };
    tick();
    const id = setInterval(tick, 1000);

    const onResize = () => {
      if (vpRef.current) vpRef.current.textContent = `VP ${window.innerWidth}×${window.innerHeight}`;
    };
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(id);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="mono-label-xs pointer-events-none fixed bottom-6 left-6 z-40 hidden gap-5 text-stone-deep md:flex"
    >
      <span ref={clockRef} />
      <span ref={sunRef} />
      <span ref={vpRef} />
      <span>52.529°N 13.401°E</span>
    </div>
  );
}
