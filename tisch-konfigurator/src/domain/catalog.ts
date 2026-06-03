// Produktkatalog des Tisch-Konfigurators (Stammdaten).
// Datenklassifizierung (R_86): C0 — öffentliche/technische Produktdaten.
// Whitelist-Ansatz: Nur hier hinterlegte Optionen sind gültig (sichere Defaults).

import type {
  GestellOption,
  KantenOption,
  Konfiguration,
  MassGrenze,
  MaterialOption,
} from './types';

export const MATERIALIEN: readonly MaterialOption[] = [
  { id: 'eiche', label: 'Eiche massiv', preisProQm: 320 },
  { id: 'buche', label: 'Buche massiv', preisProQm: 240 },
  { id: 'mdf-weiss', label: 'MDF weiß lackiert', preisProQm: 130 },
  { id: 'linoleum', label: 'Linoleum auf Trägerplatte', preisProQm: 160 },
];

export const GESTELLE: readonly GestellOption[] = [
  { id: 'vier-bein-holz', label: 'Vier Beine, Holz', aufpreis: 0 },
  { id: 'vier-bein-stahl', label: 'Vier Beine, Stahl pulverbeschichtet', aufpreis: 90 },
  { id: 'wange-stahl', label: 'Stahlwange (U-Form)', aufpreis: 180 },
  { id: 'hoehenverstellbar', label: 'Höhenverstellbares Elektro-Gestell', aufpreis: 540 },
];

export const KANTEN: readonly KantenOption[] = [
  { id: 'gerade', label: 'Gerade Kante', preisProMeter: 0 },
  { id: 'gefast', label: 'Gefaste Kante', preisProMeter: 12 },
  { id: 'abgerundet', label: 'Abgerundete Kante', preisProMeter: 18 },
];

/** Zulässige Wertebereiche je Maß (mm). */
export const GRENZEN = {
  laengeMm: { minMm: 600, maxMm: 3000 },
  breiteMm: { minMm: 400, maxMm: 1200 },
  durchmesserMm: { minMm: 600, maxMm: 1600 },
  hoeheMm: { minMm: 600, maxMm: 1200 },
} as const satisfies Record<string, MassGrenze>;

/** Sichere Standardkonfiguration (Deny-by-default: stets gültige Ausgangswerte). */
export const STANDARD_KONFIGURATION: Konfiguration = {
  form: 'rechteckig',
  laengeMm: 1600,
  breiteMm: 800,
  durchmesserMm: 1000,
  hoeheMm: 740,
  materialId: 'eiche',
  gestellId: 'vier-bein-holz',
  kanteId: 'gerade',
};

/** Liefert das Material zur ID oder undefined (Whitelist-Lookup). */
export function findeMaterial(id: string): MaterialOption | undefined {
  return MATERIALIEN.find((m) => m.id === id);
}

/** Liefert das Gestell zur ID oder undefined (Whitelist-Lookup). */
export function findeGestell(id: string): GestellOption | undefined {
  return GESTELLE.find((g) => g.id === id);
}

/** Liefert die Kante zur ID oder undefined (Whitelist-Lookup). */
export function findeKante(id: string): KantenOption | undefined {
  return KANTEN.find((k) => k.id === id);
}
