// Geometrie, Validierung und Preisberechnung des Tisch-Konfigurators.
// Reine Funktionen ohne Seiteneffekte — vollständig durch Unit-Tests abgedeckt.
// Datenklassifizierung (R_86): C0.

import { findeGestell, findeKante, findeMaterial, GRENZEN } from './catalog';
import type { Konfiguration, MassGrenze, Preisaufstellung, ValidierungsFehler } from './types';

const QM_PRO_QMM = 1_000_000; // 1 m² = 1.000.000 mm²
const MM_PRO_M = 1000;

/** Auf zwei Nachkommastellen kaufmännisch gerundet. */
function rundeEuro(betrag: number): number {
  return Math.round(betrag * 100) / 100;
}

/** Plattenfläche in m² — abhängig von der gewählten Form. */
export function flaecheQm(k: Konfiguration): number {
  if (k.form === 'rund') {
    const radiusMm = k.durchmesserMm / 2;
    return (Math.PI * radiusMm * radiusMm) / QM_PRO_QMM;
  }
  return (k.laengeMm * k.breiteMm) / QM_PRO_QMM;
}

/** Umfang der Platte in laufenden Metern — abhängig von der gewählten Form. */
export function umfangM(k: Konfiguration): number {
  if (k.form === 'rund') {
    return (Math.PI * k.durchmesserMm) / MM_PRO_M;
  }
  return (2 * (k.laengeMm + k.breiteMm)) / MM_PRO_M;
}

/**
 * Validiert eine Konfiguration vollständig (Eingabevalidierung, R_XX/OWASP).
 * Prüft Typ, Wertebereich und Gültigkeit der Auswahl-IDs (Whitelist).
 * Liefert eine Liste aller gefundenen Fehler (leer = gültig).
 */
export function validiere(k: Konfiguration): readonly ValidierungsFehler[] {
  const fehler: ValidierungsFehler[] = [];

  const pruefeMass = (feld: keyof Konfiguration, wert: number, grenze: MassGrenze) => {
    if (!Number.isFinite(wert)) {
      fehler.push({ feld, meldung: 'Bitte eine gültige Zahl eingeben.' });
      return;
    }
    if (!Number.isInteger(wert)) {
      fehler.push({ feld, meldung: 'Maße müssen ganzzahlige Millimeter sein.' });
      return;
    }
    if (wert < grenze.minMm || wert > grenze.maxMm) {
      fehler.push({
        feld,
        meldung: `Zulässig sind ${grenze.minMm}–${grenze.maxMm} mm.`,
      });
    }
  };

  pruefeMass('hoeheMm', k.hoeheMm, GRENZEN.hoeheMm);

  if (k.form === 'rund') {
    pruefeMass('durchmesserMm', k.durchmesserMm, GRENZEN.durchmesserMm);
  } else {
    pruefeMass('laengeMm', k.laengeMm, GRENZEN.laengeMm);
    pruefeMass('breiteMm', k.breiteMm, GRENZEN.breiteMm);
  }

  if (!findeMaterial(k.materialId)) {
    fehler.push({ feld: 'materialId', meldung: 'Unbekanntes Material.' });
  }
  if (!findeGestell(k.gestellId)) {
    fehler.push({ feld: 'gestellId', meldung: 'Unbekanntes Gestell.' });
  }
  if (!findeKante(k.kanteId)) {
    fehler.push({ feld: 'kanteId', meldung: 'Unbekannte Kantenbearbeitung.' });
  }

  return fehler;
}

/**
 * Berechnet die Preisaufstellung einer Konfiguration.
 * Wirft einen Fehler, wenn die Konfiguration ungültig ist — Aufrufer müssen
 * zuvor {@link validiere} aufrufen (Fail-Secure).
 */
export function berechnePreis(k: Konfiguration): Preisaufstellung {
  const fehler = validiere(k);
  if (fehler.length > 0) {
    throw new Error('Konfiguration ist ungültig und kann nicht berechnet werden.');
  }

  // Nach erfolgreicher Validierung sind die Lookups garantiert vorhanden.
  const material = findeMaterial(k.materialId)!;
  const gestell = findeGestell(k.gestellId)!;
  const kante = findeKante(k.kanteId)!;

  const flaeche = flaecheQm(k);
  const umfang = umfangM(k);

  const materialKosten = rundeEuro(flaeche * material.preisProQm);
  const kantenKosten = rundeEuro(umfang * kante.preisProMeter);
  const gestellKosten = rundeEuro(gestell.aufpreis);
  const gesamtNetto = rundeEuro(materialKosten + kantenKosten + gestellKosten);

  return {
    flaecheQm: Math.round(flaeche * 1000) / 1000,
    umfangM: Math.round(umfang * 1000) / 1000,
    materialKosten,
    kantenKosten,
    gestellKosten,
    gesamtNetto,
  };
}

/** Formatiert einen EUR-Betrag deutsch (z. B. „1.234,50 €"). */
export function formatiereEuro(betrag: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(betrag);
}
