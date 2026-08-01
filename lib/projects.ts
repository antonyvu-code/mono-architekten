import type { Locale } from "./i18n";

export type Category = "residential" | "cultural" | "commercial";

type Bilingual = Record<Locale, string>;
type BilingualList = Record<Locale, string[]>;

export interface Project {
  slug: string;
  name: string;
  category: Category;
  year: string;
  location: Bilingual;
  area: string;
  status: Bilingual;
  featured?: boolean;
  hero: string;
  heroAlt: Bilingual;
  images: { src: string; alt: Bilingual; caption: Bilingual }[];
  summary: Bilingual;
  body: BilingualList;
}

const u = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const projects: Project[] = [
  {
    slug: "galerie-weiss",
    name: "Galerie Weiß",
    category: "cultural",
    year: "2023",
    location: { de: "Berlin — Mitte", en: "Berlin — Mitte" },
    area: "1.850 m²",
    status: { de: "Realisiert", en: "Completed" },
    featured: true,
    hero: u("photo-1518005020951-eccb494ad742", 2200),
    heroAlt: {
      de: "Weiße Sichtbetonfassade der Galerie Weiß mit geschwungener Rampe",
      en: "White exposed-concrete facade of Galerie Weiß with curved ramp",
    },
    images: [
      {
        src: u("photo-1439337153520-7082a56a81f4", 1800),
        alt: {
          de: "Glasdach über dem zentralen Ausstellungsraum",
          en: "Glass roof above the central exhibition hall",
        },
        caption: {
          de: "Zentraler Saal — Oberlicht mit Nordausrichtung",
          en: "Central hall — north-facing skylight",
        },
      },
      {
        src: u("photo-1487958449943-2429e8be8625", 1800),
        alt: {
          de: "Detail der weißen Betonfassade",
          en: "Detail of the white concrete facade",
        },
        caption: {
          de: "Fassade — gesäuerter Weißbeton, Fertigteile",
          en: "Facade — acid-etched white concrete, precast",
        },
      },
    ],
    summary: {
      de: "Ein Haus für Kunst, das selbst zurücktritt: fünf Säle um einen Lichthof, Weißbeton außen, Kalkputz innen.",
      en: "A house for art that steps back itself: five halls around a light court, white concrete outside, lime plaster inside.",
    },
    body: {
      de: [
        "Die Galerie Weiß ersetzt einen Parkplatz in einem Mitte-Blockrand und schließt die Straßenflucht mit einer fast fensterlosen, aber fein reliefierten Fassade. Der Auftritt ist bewusst still: Das Haus kündigt Kunst nicht an, es bewahrt sie.",
        "Im Inneren organisieren sich fünf unterschiedlich proportionierte Säle um einen verglasten Lichthof. Alles Tageslicht kommt von Norden oder von oben; die Wände tragen Kalkputz, der Streiflicht weich macht. Technik, Depot und Anlieferung liegen vollständig im Untergeschoss.",
        "Der Rundgang ist eine einzige Bewegung: eine flache Rampe führt ohne Absatz vom Foyer bis auf das Dach, wo die Stadt selbst zum letzten Exponat wird. Die Besucherführung braucht deshalb keine Beschilderung — die Architektur ist der Wegweiser.",
      ],
      en: [
        "Galerie Weiß replaces a parking lot in a Mitte perimeter block, closing the street line with a nearly windowless yet finely relief-textured facade. The presence is deliberately quiet: the building doesn't announce art, it keeps it.",
        "Inside, five differently proportioned halls organise themselves around a glazed light court. All daylight arrives from the north or from above; the walls carry lime plaster that softens raking light. Services, storage and delivery sit entirely below grade.",
        "The visitor route is a single movement: a shallow ramp leads without a step from foyer to roof, where the city itself becomes the final exhibit. Wayfinding needs no signage — the architecture is the guide.",
      ],
    },
  },
  {
    slug: "haus-brandt",
    name: "Haus Brandt",
    category: "residential",
    year: "2024",
    location: { de: "Potsdam", en: "Potsdam" },
    area: "340 m²",
    status: { de: "Realisiert", en: "Completed" },
    featured: true,
    hero: u("photo-1600585154340-be6161a56a0c", 2200),
    heroAlt: {
      de: "Haus Brandt — flacher Baukörper mit großen Öffnungen zum Garten",
      en: "Haus Brandt — low volume with large openings towards the garden",
    },
    images: [
      {
        src: u("photo-1600607687939-ce8a6c25118c", 1800),
        alt: {
          de: "Wohnraum mit raumhoher Verglasung und Holzdecke",
          en: "Living space with full-height glazing and timber ceiling",
        },
        caption: {
          de: "Wohnraum — Douglasie, geölter Estrich",
          en: "Living space — Douglas fir, oiled screed",
        },
      },
      {
        src: u("photo-1512917774080-9991f1c4c750", 1800),
        alt: {
          de: "Gartenfassade am Abend",
          en: "Garden facade at dusk",
        },
        caption: {
          de: "Gartenseite — Dämmerung, Bauaufnahme",
          en: "Garden side — dusk, completion photo",
        },
      },
    ],
    summary: {
      de: "Ein eingeschossiger Hof für drei Generationen: zwei Flügel, ein Dach, alle Räume am Garten.",
      en: "A single-storey court for three generations: two wings, one roof, every room on the garden.",
    },
    body: {
      de: [
        "Haus Brandt ist ein Generationenhaus am Rand von Potsdam. Statt Geschosse zu stapeln, legt der Entwurf zwei Flügel um einen geschützten Hof — kurze Wege für die Großeltern, Rückzug für die Familie, ein gemeinsames Dach für alle.",
        "Die Konstruktion ist ein sichtbares Holzskelett auf einem mineralischen Sockel. Innen bleibt die Tragstruktur unverkleidet; die Räume gewinnen ihre Wärme aus Douglasie, Lehmputz und dem wechselnden Licht des Hofes.",
        "Ein umlaufender Dachüberstand von 1,80 Metern verschattet im Sommer und lässt die flache Wintersonne tief in die Räume. Das Haus kommt ohne aktive Kühlung aus.",
      ],
      en: [
        "Haus Brandt is a multi-generation house on the edge of Potsdam. Instead of stacking floors, the design lays two wings around a sheltered court — short distances for the grandparents, retreat for the family, one shared roof for all.",
        "The structure is an exposed timber skeleton on a mineral plinth. Inside, the frame remains unclad; the rooms draw their warmth from Douglas fir, clay plaster and the changing light of the court.",
        "A continuous 1.80-metre roof overhang shades the summer sun and lets the low winter sun reach deep into the rooms. The house needs no active cooling.",
      ],
    },
  },
  {
    slug: "kontorhaus-spree",
    name: "Kontorhaus Spree",
    category: "commercial",
    year: "2025",
    location: { de: "Berlin — Friedrichshain", en: "Berlin — Friedrichshain" },
    area: "4.200 m²",
    status: { de: "Im Bau", en: "Under construction" },
    featured: true,
    hero: u("photo-1486718448742-163732cd1544", 2200),
    heroAlt: {
      de: "Kontorhaus Spree — geschichtete Betonfassade am Wasser",
      en: "Kontorhaus Spree — layered concrete facade by the water",
    },
    images: [
      {
        src: u("photo-1497366754035-f200968a6e72", 1800),
        alt: {
          de: "Offene Bürolandschaft mit Sichtbetondecke",
          en: "Open workspace with exposed concrete ceiling",
        },
        caption: {
          de: "Regelgeschoss — 5,40 m Raster, stützenfrei",
          en: "Typical floor — 5.40 m grid, column-free",
        },
      },
      {
        src: u("photo-1449157291145-7efd050a4d0e", 1800),
        alt: {
          de: "Fassadendetail mit tiefen Laibungen",
          en: "Facade detail with deep reveals",
        },
        caption: {
          de: "Fassade — Recyclingbeton, tiefe Laibungen als Sonnenschutz",
          en: "Facade — recycled concrete, deep reveals as solar shading",
        },
      },
    ],
    summary: {
      de: "Ein Arbeitshaus am Wasser, gebaut für hundert Jahre Nutzungswechsel: Skelettbau, 3,60 m Raumhöhe, Fassade aus Recyclingbeton.",
      en: "A working building on the water, built for a century of changing use: skeleton frame, 3.60 m ceilings, a facade of recycled concrete.",
    },
    body: {
      de: [
        "Das Kontorhaus Spree übersetzt die Berliner Gewerbehof-Typologie ins 21. Jahrhundert. Ein robustes Betonskelett mit 3,60 Metern Raumhöhe erlaubt Büro, Werkstatt oder Wohnen — das Haus legt sich nicht fest, und genau darin liegt seine Nachhaltigkeit.",
        "Die Fassade besteht aus Fertigteilen mit 40 Prozent Rezyklatanteil. Tiefe Laibungen ersetzen außenliegenden Sonnenschutz; die Gliederung folgt dem Tragwerk, nicht einer Mode.",
        "Zur Spree öffnet sich das Erdgeschoss auf ganzer Länge als öffentliche Kolonnade. Der Uferweg bleibt durchgängig — das Haus nimmt der Stadt nichts, es gibt ihr eine gedeckte Passage zurück.",
      ],
      en: [
        "Kontorhaus Spree translates the Berlin Gewerbehof typology into the 21st century. A robust concrete skeleton with 3.60-metre ceilings accommodates office, workshop or living — the building refuses to specialise, and precisely that is its sustainability.",
        "The facade is made of precast elements with 40 percent recycled aggregate. Deep reveals replace external shading; the articulation follows the structure, not a fashion.",
        "Towards the Spree, the ground floor opens along its full length as a public colonnade. The riverside path remains continuous — the building takes nothing from the city; it returns a covered passage to it.",
      ],
    },
  },
  {
    slug: "stadtbibliothek-koepenick",
    name: "Stadtbibliothek Köpenick",
    category: "cultural",
    year: "2024",
    location: { de: "Berlin — Köpenick", en: "Berlin — Köpenick" },
    area: "3.100 m²",
    status: { de: "Realisiert", en: "Completed" },
    hero: u("photo-1524230572899-a752b3835840", 2200),
    heroAlt: {
      de: "Geschwungener heller Baukörper der Stadtbibliothek",
      en: "Curved light-coloured volume of the city library",
    },
    images: [
      {
        src: u("photo-1521587760476-6c12a4b040da", 1800),
        alt: {
          de: "Lesesaal mit umlaufenden Regalen",
          en: "Reading room with continuous shelving",
        },
        caption: {
          de: "Lesesaal — Esche, indirektes Nordlicht",
          en: "Reading room — ash, indirect north light",
        },
      },
    ],
    summary: {
      de: "Ein öffentliches Wohnzimmer am Wasser: ein runder Lesesaal, um den sich alles Übrige wickelt.",
      en: "A public living room by the water: one round reading hall around which everything else wraps.",
    },
    body: {
      de: [
        "Die Bibliothek stellt ihren wichtigsten Raum in die Mitte: einen kreisrunden, zweigeschossigen Lesesaal, in dem alle Generationen an einem Ort zusammenkommen. Verwaltung, Medien und Werkräume wickeln sich als Ring darum.",
        "Nach außen zeigt das Haus eine ruhige, geschwungene Fassade aus hellem Klinker — eine Verbeugung vor der Altstadt Köpenick, ohne sie zu imitieren. Im Inneren dominiert Esche: Regale, Decken, Treppen aus einer Hand.",
      ],
      en: [
        "The library places its most important room at the centre: a circular, two-storey reading hall where all generations share one space. Administration, media and workshops wrap around it as a ring.",
        "Outwardly the building shows a calm, curved facade of light brick — a bow to Köpenick's old town without imitating it. Inside, ash dominates: shelves, ceilings and stairs from a single hand.",
      ],
    },
  },
  {
    slug: "villa-maren",
    name: "Villa Maren",
    category: "residential",
    year: "2022",
    location: { de: "Rügen — Ostsee", en: "Rügen — Baltic Sea" },
    area: "285 m²",
    status: { de: "Realisiert", en: "Completed" },
    hero: u("photo-1512917774080-9991f1c4c750", 2200),
    heroAlt: {
      de: "Villa Maren — flacher Baukörper mit Blick zur Ostsee",
      en: "Villa Maren — low volume facing the Baltic Sea",
    },
    images: [
      {
        src: u("photo-1600566753086-00f18fb6b3ea", 1800),
        alt: {
          de: "Innenraum mit Kamin und gerahmtem Seeblick",
          en: "Interior with fireplace and framed sea view",
        },
        caption: {
          de: "Kaminraum — ein Fenster, ein Blick",
          en: "Fireplace room — one window, one view",
        },
      },
    ],
    summary: {
      de: "Ein Ferienhaus als Rahmen: drei Höfe gegen den Wind, ein einziges großes Fenster zur See.",
      en: "A holiday house as a frame: three courts against the wind, one single large window to the sea.",
    },
    body: {
      de: [
        "Auf der Steilküste von Rügen duckt sich die Villa Maren gegen den Westwind. Drei eingeschnittene Höfe schaffen windstille Außenräume für jede Tageszeit; die Räume dazwischen sind bewusst knapp gehalten.",
        "Der See gehört einem einzigen Fenster: sechs Meter breit, rahmenlos, dem Kaminraum vorbehalten. Alle übrigen Öffnungen sind klein und tief — das Haus spart seinen einen großen Blick auf, statt ihn zu verbrauchen.",
      ],
      en: [
        "On the cliffs of Rügen, Villa Maren ducks against the west wind. Three carved-in courts create calm outdoor rooms for every hour of the day; the spaces between them are kept deliberately tight.",
        "The sea belongs to a single window: six metres wide, frameless, reserved for the fireplace room. All other openings are small and deep — the house saves its one great view instead of spending it.",
      ],
    },
  },
  {
    slug: "atelierhaus-n9",
    name: "Atelierhaus N9",
    category: "commercial",
    year: "2021",
    location: { de: "Leipzig — Plagwitz", en: "Leipzig — Plagwitz" },
    area: "960 m²",
    status: { de: "Realisiert", en: "Completed" },
    hero: u("photo-1487958449943-2429e8be8625", 2200),
    heroAlt: {
      de: "Atelierhaus N9 — strenge Betonfassade mit großen Nordfenstern",
      en: "Atelierhaus N9 — austere concrete facade with large north windows",
    },
    images: [
      {
        src: u("photo-1459767129954-1b1c1f9b9ace", 1800),
        alt: {
          de: "Fassadenraster im Detail",
          en: "Facade grid in detail",
        },
        caption: {
          de: "Nordfassade — Raster 3,20 m, Industrieverglasung",
          en: "North facade — 3.20 m grid, industrial glazing",
        },
      },
    ],
    summary: {
      de: "Acht Ateliers unter einem Sheddach: Rohbau als Endzustand, Mieten unter Marktniveau.",
      en: "Eight studios under a sawtooth roof: shell as finished state, rents below market.",
    },
    body: {
      de: [
        "Das Atelierhaus N9 beweist, dass günstig und präzise kein Widerspruch ist. Der Rohbau ist der Endzustand: Sichtbeton, Estrich, Aufputzinstallation — jede eingesparte Schicht senkt die Miete der Künstlerinnen und Künstler.",
        "Ein Sheddach holt gleichmäßiges Nordlicht in alle acht Ateliers. Die Grundrisse sind neutral geschnitten und über Schiebewände koppelbar; das Haus soll Nutzungen überleben, die heute noch niemand kennt.",
      ],
      en: [
        "Atelierhaus N9 proves that affordable and precise are no contradiction. The shell is the finished state: exposed concrete, screed, surface-mounted services — every omitted layer lowers the artists' rent.",
        "A sawtooth roof brings even north light into all eight studios. The floor plans are cut neutrally and can be coupled via sliding walls; the building is meant to outlive uses nobody knows yet.",
      ],
    },
  },
  {
    slug: "kapelle-am-feld",
    name: "Kapelle am Feld",
    category: "cultural",
    year: "2023",
    location: { de: "Brandenburg — Uckermark", en: "Brandenburg — Uckermark" },
    area: "120 m²",
    status: { de: "Realisiert", en: "Completed" },
    hero: u("photo-1520607162513-77705c0f0d4a", 2200),
    heroAlt: {
      de: "Kapelle am Feld — monolithischer Baukörper in offener Landschaft",
      en: "Kapelle am Feld — monolithic volume in open landscape",
    },
    images: [
      {
        src: u("photo-1496307653780-42ee777d4833", 1800),
        alt: {
          de: "Lichtschlitz über dem Altarraum",
          en: "Light slot above the altar space",
        },
        caption: {
          de: "Innenraum — ein Lichtschlitz, nach Osten",
          en: "Interior — one slot of light, facing east",
        },
      },
    ],
    summary: {
      de: "Ein Raum aus gestampftem Lehm für alle Konfessionen — und für niemanden: Stille als Programm.",
      en: "A room of rammed earth for all denominations — and for no one: stillness as the brief.",
    },
    body: {
      de: [
        "Zwischen zwei Feldern in der Uckermark steht ein einziger Raum aus gestampftem Lehm, gewonnen aus dem Aushub des eigenen Fundaments. Kein Turm, kein Symbol, keine Widmung — die Kapelle gehört dem Weg, an dem sie steht.",
        "Das Licht kommt durch einen einzigen, handbreiten Schlitz in der Ostwand. Im Lauf des Tages wandert es einmal über die gestampfte Wand — die Kapelle hat keine weitere Ausstattung und braucht auch keine.",
      ],
      en: [
        "Between two fields in the Uckermark stands a single room of rammed earth, won from the excavation of its own foundation. No tower, no symbol, no dedication — the chapel belongs to the path it stands on.",
        "Light enters through a single hand-wide slot in the eastern wall. Over the course of a day it wanders once across the rammed wall — the chapel has no further furnishing and needs none.",
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const featuredProjects = projects.filter((p) => p.featured);

/** zero-padded index of a project within the full list, e.g. "03" */
export function projectIndex(slug: string): string {
  return String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");
}
