/**
 * Schematic map of Berlin-Mitte — hairline street grid, the Spree as the
 * single accent stroke, one mark for the studio. Deliberately not to scale.
 */
export default function StylizedMap({ caption }: { caption: string }) {
  return (
    <figure>
      <svg
        viewBox="0 0 560 400"
        role="img"
        aria-label={caption}
        className="w-full border border-line bg-paper-2"
      >
        {/* street grid, slightly irregular like a real quarter */}
        <g stroke="rgba(17,17,17,0.16)" strokeWidth="1">
          <line x1="0" y1="70" x2="560" y2="52" />
          <line x1="0" y1="140" x2="560" y2="128" />
          <line x1="0" y1="216" x2="560" y2="208" />
          <line x1="0" y1="300" x2="560" y2="312" />
          <line x1="80" y1="0" x2="64" y2="400" />
          <line x1="180" y1="0" x2="172" y2="400" />
          <line x1="284" y1="0" x2="292" y2="400" />
          <line x1="396" y1="0" x2="410" y2="400" />
          <line x1="490" y1="0" x2="500" y2="400" />
          {/* diagonal — Torstraße */}
          <line x1="0" y1="188" x2="560" y2="150" strokeWidth="1.5" />
        </g>

        {/* the Spree — the one allowed accent */}
        <path
          d="M -10 356 C 120 330, 200 372, 300 352 S 480 310, 570 330"
          fill="none"
          stroke="#8a8a83"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* block hints */}
        <g fill="rgba(17,17,17,0.05)">
          <rect x="92" y="82" width="76" height="46" />
          <rect x="196" y="150" width="76" height="54" />
          <rect x="306" y="64" width="76" height="52" />
          <rect x="420" y="140" width="58" height="56" />
          <rect x="92" y="226" width="66" height="62" />
          <rect x="306" y="222" width="88" height="66" />
        </g>

        {/* studio mark */}
        <g>
          <circle cx="252" cy="172" r="22" fill="none" stroke="rgba(17,17,17,0.25)" strokeWidth="1" />
          <circle cx="252" cy="172" r="5" fill="#111111" />
          <line x1="252" y1="150" x2="252" y2="120" stroke="#111111" strokeWidth="1" />
          <text
            x="262"
            y="116"
            fontFamily="var(--font-space-mono), monospace"
            fontSize="11"
            letterSpacing="0.14em"
            fill="#111111"
          >
            MONO — LINIENSTR. 155
          </text>
        </g>

        {/* scale-less scale bar, an honest instrument joke */}
        <g stroke="#62625b" strokeWidth="1">
          <line x1="24" y1="376" x2="104" y2="376" />
          <line x1="24" y1="372" x2="24" y2="380" />
          <line x1="104" y1="372" x2="104" y2="380" />
        </g>
        <text
          x="112"
          y="380"
          fontFamily="var(--font-space-mono), monospace"
          fontSize="10"
          letterSpacing="0.12em"
          fill="#62625b"
        >
          O.M. / N.T.S.
        </text>
      </svg>
      <figcaption className="mono-label-xs mt-3 text-stone-deep">{caption}</figcaption>
    </figure>
  );
}
