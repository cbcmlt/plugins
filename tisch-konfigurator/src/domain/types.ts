// Domänentypen des Tisch-Konfigurators.
// Datenklassifizierung (R_86): C0 — ausschließlich technische Produktdaten,
// keine personenbezogenen Daten.

/** Grundform der Tischplatte. */
export type Tischform = 'rechteckig' | 'rund';

/** Plattenmaterial mit flächenbezogenem Preis. */
export interface MaterialOption {
  readonly id: string;
  readonly label: string;
  /** Preis pro Quadratmeter Plattenfläche in EUR. */
  readonly preisProQm: number;
}

/** Untergestell/Beine mit pauschalem Aufpreis. */
export interface GestellOption {
  readonly id: string;
  readonly label: string;
  /** Pauschaler Aufpreis in EUR. */
  readonly aufpreis: number;
}

/** Kantenbearbeitung, abgerechnet je laufendem Meter Umfang. */
export interface KantenOption {
  readonly id: string;
  readonly label: string;
  /** Preis pro laufendem Meter Kante in EUR. */
  readonly preisProMeter: number;
}

/** Zulässiger Wertebereich eines Maßes in Millimetern. */
export interface MassGrenze {
  readonly minMm: number;
  readonly maxMm: number;
}

/** Eine vollständige Tischkonfiguration. */
export interface Konfiguration {
  readonly form: Tischform;
  /** Länge bei rechteckiger Form (mm). */
  readonly laengeMm: number;
  /** Breite bei rechteckiger Form (mm). */
  readonly breiteMm: number;
  /** Durchmesser bei runder Form (mm). */
  readonly durchmesserMm: number;
  /** Höhe der Tischbeine/des Gestells (mm). */
  readonly hoeheMm: number;
  readonly materialId: string;
  readonly gestellId: string;
  readonly kanteId: string;
}

/** Ein Validierungsfehler, bezogen auf ein konkretes Feld. */
export interface ValidierungsFehler {
  readonly feld: keyof Konfiguration;
  readonly meldung: string;
}

/** Aufgeschlüsseltes Berechnungsergebnis. */
export interface Preisaufstellung {
  readonly flaecheQm: number;
  readonly umfangM: number;
  readonly materialKosten: number;
  readonly kantenKosten: number;
  readonly gestellKosten: number;
  readonly gesamtNetto: number;
}
