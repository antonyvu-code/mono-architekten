export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefix a path with the locale segment. path starts with "/" or is "". */
export function localePath(locale: Locale, path: string = ""): string {
  return `/${locale}${path}`;
}

/** Swap the locale prefix of a full pathname, keeping the rest of the route. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split("/");
  // ["", "de", "projects", "slug"] -> replace index 1
  if (parts.length > 1 && isLocale(parts[1])) {
    parts[1] = target;
    return parts.join("/") || `/${target}`;
  }
  return `/${target}${pathname}`;
}

const de = {
  meta: {
    title: "MONO Architekten — Architektur der Stille | Berlin",
    description:
      "MONO Architekten ist ein Berliner Studio für Wohn-, Kultur- und Gewerbebauten. Reduktion, Material, Licht — Architektur, die dem Wesentlichen Raum gibt.",
  },
  nav: {
    home: "Start",
    projects: "Projekte",
    studio: "Studio",
    contact: "Kontakt",
    menu: "Menü",
    close: "Schließen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    skip: "Zum Inhalt springen",
    langLabel: "Sprache wechseln",
  },
  home: {
    eyebrow: "MONO Architekten — Berlin, seit 2011",
    heroA: "MONO",
    heroB: "Architekten",
    tagline: "Bauten für das Wesentliche — Wohnen, Kultur, Gewerbe",
    scroll: "Scrollen",
    selected: "Ausgewählte Arbeiten",
    selectedIndex: "03 von 07 Projekten",
    viewProject: "Projekt ansehen",
    allProjects: "Alle Projekte",
    statement:
      "Wir bauen keine Ikonen. Wir bauen Räume, in denen das Leben die Hauptrolle spielt — präzise, ruhig, dauerhaft.",
    statementLink: "Über das Studio",
  },
  projects: {
    title: "Projekte",
    eyebrow: "Index — 2011 bis heute",
    filterAll: "Alle",
    filterLabel: "Nach Typologie filtern",
    empty: "Keine Projekte in dieser Kategorie.",
    count: "Projekte",
    /** Ansage für Screenreader, wenn der Filter die Liste ändert. {n} = Anzahl. */
    resultCount: "{n} Projekte werden angezeigt.",
    resultCountOne: "Ein Projekt wird angezeigt.",
  },
  categories: {
    residential: "Wohnen",
    cultural: "Kultur",
    commercial: "Gewerbe",
  },
  detail: {
    year: "Jahr",
    location: "Ort",
    area: "Fläche",
    status: "Status",
    typology: "Typologie",
    figure: "Abb.",
    next: "Nächstes Projekt",
    backToIndex: "Zurück zum Index",
  },
  studio: {
    title: "Studio",
    eyebrow: "Haltung, Team, Arbeitsweise",
    statement:
      "Architektur beginnt für uns dort, wo etwas weggelassen wird. Was bleibt, muss tragen — konstruktiv, räumlich, atmosphärisch.",
    philosophyTitle: "Haltung",
    philosophy: [
      "MONO wurde 2011 in Berlin gegründet — aus der Überzeugung, dass gute Architektur nicht laut sein muss, um lange zu wirken. Unsere Bauten entstehen aus dem Ort, aus dem Programm und aus dem Material; nie aus einer Geste.",
      "Wir arbeiten in allen Leistungsphasen, vom ersten Gespräch bis zur Übergabe. Jedes Projekt durchläuft dieselbe Disziplin: ein Konzept, ein dominantes Material, ein klarer Umgang mit Licht. Alles Weitere ist Konsequenz.",
    ],
    principlesTitle: "Prinzipien",
    principles: [
      {
        title: "Reduktion",
        text: "Jedes Element muss zwei Aufgaben erfüllen, sonst entfällt es. Ornament ersetzen wir durch Proportion.",
      },
      {
        title: "Material",
        text: "Wenige Materialien, ehrlich gefügt — Sichtbeton, Holz, Kalkputz. Oberflächen dürfen altern.",
      },
      {
        title: "Licht",
        text: "Tageslicht ist das einzige Material, das nichts kostet. Wir planen Räume von der Sonne her.",
      },
    ],
    teamTitle: "Team",
    teamRole: "Rolle",
    teamSince: "Seit",
    team: [
      { name: "Johanna Merz", role: "Gründungspartnerin", since: "2011" },
      { name: "David Okon", role: "Gründungspartner", since: "2011" },
      { name: "Aylin Kaya", role: "Projektleitung Kultur", since: "2016" },
      { name: "Jonas Brehm", role: "Projektleitung Wohnen", since: "2018" },
      { name: "Marta Silva", role: "Architektin", since: "2021" },
      { name: "Til Neumann", role: "Architekt", since: "2023" },
    ],
    factsTitle: "Studio in Zahlen",
    facts: [
      { value: "2011", label: "Gegründet" },
      { value: "06", label: "Mitarbeitende" },
      { value: "46", label: "Projekte" },
      { value: "03", label: "Auszeichnungen" },
    ],
  },
  contact: {
    title: "Kontakt",
    eyebrow: "Anfrage, Besuch, Presse",
    intro:
      "Erzählen Sie uns von Ihrem Grundstück, Ihrem Programm, Ihrem Zeitrahmen. Wir antworten innerhalb von 48 Stunden.",
    name: "Name",
    email: "E-Mail",
    message: "Nachricht",
    messagePlaceholder: "Grundstück, Programm, Zeitrahmen …",
    submit: "Anfrage senden",
    success: "Danke — Ihre Nachricht ist angekommen. Wir melden uns innerhalb von 48 Stunden.",
    addressTitle: "Atelier",
    address: ["Linienstraße 155", "10115 Berlin — Mitte"],
    hours: "Mo–Fr, 9–18 Uhr",
    mapCaption: "Berlin-Mitte, schematisch — kein Maßstab",
  },
  footer: {
    tagline: "Architektur der Stille",
    navTitle: "Navigation",
    officeTitle: "Atelier",
    legalTitle: "Rechtliches",
    imprint: "Impressum",
    privacy: "Datenschutz",
    concept: "Konzeptprojekt — Studio und Bauten sind fiktiv",
    grid: "Raster",
    gridHint: "Taste G — 12-Spalten-Raster",
  },
  a11y: {
    telemetry: "Statusanzeige",
    heroImageAlt: "Außenansicht",
  },
};

const en: typeof de = {
  meta: {
    title: "MONO Architekten — Architecture of Stillness | Berlin",
    description:
      "MONO Architekten is a Berlin studio for residential, cultural and commercial buildings. Reduction, material, light — architecture that gives room to the essential.",
  },
  nav: {
    home: "Home",
    projects: "Projects",
    studio: "Studio",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
    langLabel: "Switch language",
  },
  home: {
    eyebrow: "MONO Architekten — Berlin, est. 2011",
    heroA: "MONO",
    heroB: "Architekten",
    tagline: "Buildings for the essential — living, culture, work",
    scroll: "Scroll",
    selected: "Selected works",
    selectedIndex: "03 of 07 projects",
    viewProject: "View project",
    allProjects: "All projects",
    statement:
      "We don't build icons. We build spaces where life plays the leading role — precise, quiet, lasting.",
    statementLink: "About the studio",
  },
  projects: {
    title: "Projects",
    eyebrow: "Index — 2011 to date",
    filterAll: "All",
    filterLabel: "Filter by typology",
    empty: "No projects in this category.",
    count: "Projects",
    resultCount: "{n} projects shown.",
    resultCountOne: "One project shown.",
  },
  categories: {
    residential: "Residential",
    cultural: "Cultural",
    commercial: "Commercial",
  },
  detail: {
    year: "Year",
    location: "Location",
    area: "Area",
    status: "Status",
    typology: "Typology",
    figure: "Fig.",
    next: "Next project",
    backToIndex: "Back to index",
  },
  studio: {
    title: "Studio",
    eyebrow: "Attitude, team, practice",
    statement:
      "For us, architecture begins where something is left out. What remains must carry — structurally, spatially, atmospherically.",
    philosophyTitle: "Attitude",
    philosophy: [
      "MONO was founded in Berlin in 2011 — out of the conviction that good architecture doesn't need to be loud to last. Our buildings emerge from the site, the brief and the material; never from a gesture.",
      "We work across all project phases, from the first conversation to handover. Every project passes through the same discipline: one concept, one dominant material, one clear approach to light. Everything else is consequence.",
    ],
    principlesTitle: "Principles",
    principles: [
      {
        title: "Reduction",
        text: "Every element must serve two purposes, or it is removed. We replace ornament with proportion.",
      },
      {
        title: "Material",
        text: "Few materials, honestly joined — exposed concrete, timber, lime plaster. Surfaces are allowed to age.",
      },
      {
        title: "Light",
        text: "Daylight is the only material that costs nothing. We plan rooms starting from the sun.",
      },
    ],
    teamTitle: "Team",
    teamRole: "Role",
    teamSince: "Since",
    team: [
      { name: "Johanna Merz", role: "Founding partner", since: "2011" },
      { name: "David Okon", role: "Founding partner", since: "2011" },
      { name: "Aylin Kaya", role: "Project lead, cultural", since: "2016" },
      { name: "Jonas Brehm", role: "Project lead, residential", since: "2018" },
      { name: "Marta Silva", role: "Architect", since: "2021" },
      { name: "Til Neumann", role: "Architect", since: "2023" },
    ],
    factsTitle: "Studio in numbers",
    facts: [
      { value: "2011", label: "Founded" },
      { value: "06", label: "People" },
      { value: "46", label: "Projects" },
      { value: "03", label: "Awards" },
    ],
  },
  contact: {
    title: "Contact",
    eyebrow: "Enquiries, visits, press",
    intro:
      "Tell us about your site, your brief, your timeframe. We reply within 48 hours.",
    name: "Name",
    email: "Email",
    message: "Message",
    messagePlaceholder: "Site, brief, timeframe …",
    submit: "Send enquiry",
    success: "Thank you — your message has arrived. We'll get back to you within 48 hours.",
    addressTitle: "Atelier",
    address: ["Linienstraße 155", "10115 Berlin — Mitte"],
    hours: "Mon–Fri, 9 am–6 pm",
    mapCaption: "Berlin-Mitte, schematic — not to scale",
  },
  footer: {
    tagline: "Architecture of stillness",
    navTitle: "Navigation",
    officeTitle: "Atelier",
    legalTitle: "Legal",
    imprint: "Imprint",
    privacy: "Privacy",
    concept: "Concept project — studio and buildings are fictional",
    grid: "Grid",
    gridHint: "Key G — 12-column grid",
  },
  a11y: {
    telemetry: "Status display",
    heroImageAlt: "Exterior view",
  },
};

export const dictionaries = { de, en } as const;
export type Dictionary = typeof de;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
