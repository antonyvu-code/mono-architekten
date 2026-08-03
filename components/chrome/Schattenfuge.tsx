/**
 * VITRINE-Chrome — ersetzt die vier Sucherwinkel von LAB NOIR.
 *
 * Sucherwinkel sind ein Kamera-Motiv und gehören zum Labor. Ein Ausstellungsraum rahmt
 * anders: eine Hängeschiene oben, ein Sockel unten, und dazwischen die **Schattenfuge** —
 * die zurückspringende Fuge, mit der eine Wand den Boden nicht berührt. Genau das macht ein
 * Vitrinenobjekt: es steht auf einem Sockel und schwebt einen Millimeter über dem Grund.
 *
 * Die Fuge liest die Lichtrichtung aus `--rake-deg`: die dem Licht zugewandte Kante ist
 * heller, die abgewandte trägt den Schatten. Dieselbe Variable, die auch die Fassade steuert.
 */
export default function Schattenfuge() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 hidden md:block">
      {/* Hängeschiene */}
      <span className="absolute left-6 right-6 top-3 h-px bg-ink/12" />

      {/* seitliche Anschlüsse — nur angedeutet, die Vitrine ist offen nach vorn */}
      <span className="absolute bottom-6 left-3 top-6 w-px bg-ink/10" />
      <span className="absolute bottom-6 right-3 top-6 w-px bg-ink/10" />

      {/* Sockel mit Schattenfuge: die Fuge trägt den Schatten, der Sockel darunter die Last */}
      <span
        className="absolute bottom-[13px] left-6 right-6 h-[3px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(17,17,17,calc(0.10 * var(--rake-shadow, 1))), transparent)",
        }}
      />
      <span className="absolute bottom-3 left-6 right-6 h-px bg-ink/22" />
    </div>
  );
}
