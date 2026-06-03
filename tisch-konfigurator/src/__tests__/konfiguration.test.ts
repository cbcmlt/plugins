// Unit-Tests der Domänenlogik (Geometrie, Validierung, Preisberechnung).
// Nur synthetische C0-Testdaten (R_86, Teststandards).

import { describe, expect, it } from 'vitest';

import { STANDARD_KONFIGURATION } from '@/domain/catalog';
import { berechnePreis, flaecheQm, umfangM, validiere } from '@/domain/konfiguration';
import type { Konfiguration } from '@/domain/types';

describe('Geometrie', () => {
  it('berechnet Fläche und Umfang einer rechteckigen Platte', () => {
    expect(flaecheQm(STANDARD_KONFIGURATION)).toBeCloseTo(1.28, 5); // 1600 × 800 mm
    expect(umfangM(STANDARD_KONFIGURATION)).toBeCloseTo(4.8, 5);
  });

  it('berechnet Fläche und Umfang einer runden Platte', () => {
    const rund: Konfiguration = { ...STANDARD_KONFIGURATION, form: 'rund', durchmesserMm: 1000 };
    expect(flaecheQm(rund)).toBeCloseTo(Math.PI * 0.25, 5); // r = 0,5 m
    expect(umfangM(rund)).toBeCloseTo(Math.PI, 5);
  });
});

describe('Preisberechnung', () => {
  it('berechnet den Standardtisch (Eiche, ohne Aufpreise)', () => {
    const preis = berechnePreis(STANDARD_KONFIGURATION);
    expect(preis.materialKosten).toBe(409.6); // 1,28 m² × 320 €
    expect(preis.kantenKosten).toBe(0);
    expect(preis.gestellKosten).toBe(0);
    expect(preis.gesamtNetto).toBe(409.6);
  });

  it('addiert Kantenkosten je laufendem Meter', () => {
    const mitKante: Konfiguration = { ...STANDARD_KONFIGURATION, kanteId: 'gefast' };
    const preis = berechnePreis(mitKante);
    expect(preis.kantenKosten).toBe(57.6); // 4,8 m × 12 €
    expect(preis.gesamtNetto).toBe(467.2);
  });

  it('addiert den pauschalen Gestell-Aufpreis', () => {
    const mitGestell: Konfiguration = { ...STANDARD_KONFIGURATION, gestellId: 'hoehenverstellbar' };
    const preis = berechnePreis(mitGestell);
    expect(preis.gestellKosten).toBe(540);
    expect(preis.gesamtNetto).toBe(949.6);
  });

  it('wirft bei ungültiger Konfiguration (Fail-Secure)', () => {
    const ungueltig: Konfiguration = { ...STANDARD_KONFIGURATION, materialId: 'gold' };
    expect(() => berechnePreis(ungueltig)).toThrow();
  });
});

describe('Validierung', () => {
  it('akzeptiert die Standardkonfiguration', () => {
    expect(validiere(STANDARD_KONFIGURATION)).toHaveLength(0);
  });

  it('meldet ein Maß außerhalb der Grenzen', () => {
    const zuKlein: Konfiguration = { ...STANDARD_KONFIGURATION, laengeMm: 100 };
    const fehler = validiere(zuKlein);
    expect(fehler.some((f) => f.feld === 'laengeMm')).toBe(true);
  });

  it('meldet nicht-ganzzahlige Maße', () => {
    const krumm: Konfiguration = { ...STANDARD_KONFIGURATION, hoeheMm: 740.5 };
    const fehler = validiere(krumm);
    expect(fehler.some((f) => f.feld === 'hoeheMm')).toBe(true);
  });

  it('meldet unbekannte Auswahl-IDs (Whitelist)', () => {
    const fremd: Konfiguration = { ...STANDARD_KONFIGURATION, gestellId: '<script>' };
    const fehler = validiere(fremd);
    expect(fehler.some((f) => f.feld === 'gestellId')).toBe(true);
  });

  it('prüft bei runder Form den Durchmesser statt Länge/Breite', () => {
    const rund: Konfiguration = {
      ...STANDARD_KONFIGURATION,
      form: 'rund',
      durchmesserMm: 200, // unter Minimum
      laengeMm: 100, // unzulässig, aber bei runder Form irrelevant
    };
    const fehler = validiere(rund);
    expect(fehler.some((f) => f.feld === 'durchmesserMm')).toBe(true);
    expect(fehler.some((f) => f.feld === 'laengeMm')).toBe(false);
  });
});
