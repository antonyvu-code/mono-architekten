/**
 * Sonnenstand für einen Ort und einen Zeitpunkt.
 *
 * VITRINE misst, was in der Welt des Themas wirklich zählt: Architektur wird für Licht
 * entworfen. Die beiden Eingaben standen längst auf dem Schirm — die Berliner Uhr und die
 * Koordinaten in der Telemetriezeile. Daraus lässt sich der Sonnenstand geschlossen
 * berechnen, ohne API und ohne Netzwerk, also bleibt es eine *gemessene* Zahl im Sinne von
 * DNA-Regel 2 und kostet nichts im Ladebudget.
 *
 * Verfahren: NOAA Solar Position, gekürzt auf die Genauigkeit, die eine Bildschirmanzeige
 * braucht (Abweichung < 0.5°, mehr als genug für Schattenwinkel).
 */

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

/** Berlin Mitte — dieselben Koordinaten, die die Telemetriezeile ausweist. */
export const BERLIN = { lat: 52.529, lon: 13.401 } as const;

export interface SunPosition {
  /** Höhe über dem Horizont in Grad. Negativ = unter dem Horizont. */
  elevation: number;
  /** Azimut in Grad, von Norden im Uhrzeigersinn: 90 = Ost, 180 = Süd, 270 = West. */
  azimuth: number;
  /** Himmelsrichtung als Kürzel, für die Telemetriezeile. */
  compass: string;
  /** true, solange die Sonne über dem Horizont steht. */
  isDay: boolean;
}

const COMPASS = ["N", "NO", "O", "SO", "S", "SW", "W", "NW"] as const;

function toJulian(date: Date): number {
  return date.valueOf() / 86_400_000 - 0.5 + 2_440_588;
}

export function sunPosition(
  date: Date,
  lat: number = BERLIN.lat,
  lon: number = BERLIN.lon
): SunPosition {
  const d = toJulian(date) - 2_451_545;

  // Mittlere Anomalie und ekliptikale Länge der Sonne
  const meanAnomaly = (357.5291 + 0.98560028 * d) * RAD;
  const center =
    (1.9148 * Math.sin(meanAnomaly) +
      0.02 * Math.sin(2 * meanAnomaly) +
      0.0003 * Math.sin(3 * meanAnomaly)) *
    RAD;
  const eclipticLon = meanAnomaly + center + 102.9372 * RAD + Math.PI;

  // Schiefe der Ekliptik
  const obliquity = 23.4397 * RAD;

  const declination = Math.asin(Math.sin(obliquity) * Math.sin(eclipticLon));
  const rightAscension = Math.atan2(
    Math.cos(obliquity) * Math.sin(eclipticLon),
    Math.cos(eclipticLon)
  );

  // Stundenwinkel
  const siderealTime = (280.16 + 360.9856235 * d) * RAD + lon * RAD;
  const hourAngle = siderealTime - rightAscension;

  const latRad = lat * RAD;
  const elevation =
    Math.asin(
      Math.sin(latRad) * Math.sin(declination) +
        Math.cos(latRad) * Math.cos(declination) * Math.cos(hourAngle)
    ) * DEG;

  // Azimut von Norden im Uhrzeigersinn
  const azimuth =
    (Math.atan2(
      Math.sin(hourAngle),
      Math.cos(hourAngle) * Math.sin(latRad) - Math.tan(declination) * Math.cos(latRad)
    ) *
      DEG +
      180 +
      360) %
    360;

  return {
    elevation,
    azimuth,
    compass: COMPASS[Math.round(azimuth / 45) % 8],
    isDay: elevation > 0,
  };
}

/**
 * Der Schattenwurf, den die Fassade aus dem Sonnenstand ableitet.
 *
 * Ein Schatten zeigt vom Licht weg, wird flacher je höher die Sonne steht, und verschwindet
 * bei Nacht ganz — dann bleibt die Fassade unbeleuchtet, was gestalterisch der ehrlichere
 * Zustand ist als ein erfundener Schatten.
 */
export function facadeShadow(sun: SunPosition) {
  if (!sun.isDay) return { x: 0, y: 0, blur: 0, opacity: 0, length: 0 };

  // Schatten zeigt in die Gegenrichtung der Sonne
  const away = (sun.azimuth + 180) * RAD;
  // Je tiefer die Sonne, desto länger der Schatten — bei 90° (Zenit) fast null
  const length = Math.min(1, Math.max(0.06, Math.cos(sun.elevation * RAD) ** 2));

  return {
    x: Math.sin(away) * length,
    y: -Math.cos(away) * length,
    blur: 0.06 + length * 0.1,
    opacity: 0.1 + length * 0.14,
    length,
  };
}
