"use client";

import { useEffect } from "react";
import { facadeShadow, sunPosition } from "@/lib/sun";

/**
 * VITRINE: der Sonnenstand ist die eine steuernde Variable des Projekts.
 *
 * Diese Komponente rendert nichts. Sie schreibt den aktuellen Berliner Sonnenstand als
 * CSS-Custom-Properties an das Wurzelelement; Fassade, Schattenfuge und Telemetrie lesen
 * alle von dort, statt die Rechnung je zu wiederholen.
 *
 * Die Seite ist statisch vorgerendert, deshalb definiert `globals.css` gestaltete
 * Standardwerte (Vormittagslicht). Was hier passiert, ist eine Korrektur auf die echte
 * Uhrzeit — kein Aufbau aus dem Nichts. Ohne JavaScript bleibt die Fassade beleuchtet.
 *
 * Aktualisiert im Minutentakt: die Sonne wandert 0,25° pro Minute, häufiger wäre eine
 * Animation ohne Gegenwert.
 */
export default function Daylight() {
  useEffect(() => {
    const root = document.documentElement;

    const apply = () => {
      const sun = sunPosition(new Date());
      const shadow = facadeShadow(sun);

      root.style.setProperty("--sun-el", sun.elevation.toFixed(2));
      root.style.setProperty("--sun-az", sun.azimuth.toFixed(2));
      root.style.setProperty("--sun-compass", `"${sun.compass}"`);
      root.style.setProperty("--sun-day", sun.isDay ? "1" : "0");

      root.style.setProperty("--facade-shadow-x", `${(shadow.x * 0.09).toFixed(4)}em`);
      root.style.setProperty("--facade-shadow-y", `${(shadow.y * 0.09).toFixed(4)}em`);
      root.style.setProperty("--facade-shadow-blur", `${shadow.blur.toFixed(4)}em`);
      root.style.setProperty("--facade-shadow-alpha", shadow.opacity.toFixed(3));

      // Streiflicht: die Richtung, aus der das Licht über die Seite fällt.
      // Auf 0–360 normalisiert — CSS rechnet zwar modular, aber ein Wert wie 374deg in den
      // DevTools sieht nach Fehler aus und kostet beim nächsten Lesen unnötig Zeit.
      root.style.setProperty(
        "--rake-deg",
        `${((((sun.azimuth + 90) % 360) + 360) % 360).toFixed(1)}deg`
      );
      root.style.setProperty(
        "--rake-alpha",
        (sun.isDay ? 0.03 + Math.max(0, Math.sin(sun.elevation * (Math.PI / 180))) * 0.05 : 0).toFixed(3)
      );
    };

    apply();

    // Erst nach der ersten Korrektur den langen Übergang einschalten. Sonst wandert der
    // Schatten beim Laden 90 Sekunden lang vom Vorgabewert an seinen echten Platz — sichtbar
    // falsch genau in dem Moment, in dem jemand die Seite zum ersten Mal ansieht.
    //
    // Bewusst `setTimeout` statt `requestAnimationFrame`: rAF steht still, solange das
    // Dokument versteckt ist (Hintergrund-Tab). Der Schatten bliebe dann für immer ohne
    // Übergang — ein Zustand, der erst auffiele, wenn jemand den Tab wieder hervorholt.
    const settle = setTimeout(() => root.style.setProperty("--facade-transition", "90s"), 50);

    const id = setInterval(apply, 60_000);
    return () => {
      clearTimeout(settle);
      clearInterval(id);
    };
  }, []);

  return null;
}
