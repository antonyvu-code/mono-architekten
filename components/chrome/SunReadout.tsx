"use client";

import { useEffect, useState } from "react";
import { sunPosition, type SunPosition } from "@/lib/sun";

/**
 * Die Bildunterschrift der Fassade — in der Grammatik eines Wandschilds:
 * Gegenstand · Wert · Ort, in fester Reihenfolge, ohne Adjektive.
 *
 * Server und erster Client-Render zeigen beide „—“, damit es keine Hydrations-Abweichung
 * gibt; der Messwert erscheint, sobald er gemessen werden kann. Ein Strich ist ehrlicher
 * als eine vorgerenderte Uhrzeit, die schon falsch ist, wenn die Seite ankommt.
 */
export default function SunReadout() {
  const [sun, setSun] = useState<SunPosition | null>(null);
  const [time, setTime] = useState<string>("—");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("de-DE", {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => {
      const now = new Date();
      setSun(sunPosition(now));
      setTime(fmt.format(now));
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="mono-label-xs text-right text-stone-deep">
      <span className="text-stone">LICHT</span>{" "}
      {sun ? `${sun.elevation.toFixed(1)}° ${sun.compass}` : "—"}
      <span aria-hidden="true"> · </span>
      <span className="text-stone">BERLIN</span> {time}
      {sun && !sun.isDay && <span aria-hidden="true"> · UNTER HORIZONT</span>}
    </p>
  );
}
