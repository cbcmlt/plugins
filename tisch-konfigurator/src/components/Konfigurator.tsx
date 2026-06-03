// Hauptkomponente: hält den Konfigurationszustand, validiert live und
// berechnet die Preisaufstellung.

import { useMemo, useState } from 'react';

import { GESTELLE, GRENZEN, KANTEN, MATERIALIEN, STANDARD_KONFIGURATION } from '@/domain/catalog';
import { berechnePreis, validiere } from '@/domain/konfiguration';
import type { Konfiguration, Preisaufstellung, Tischform } from '@/domain/types';

import { AuswahlFeld, ZahlFeld } from './Felder';
import { Zusammenfassung } from './Zusammenfassung';

const FORM_OPTIONEN: ReadonlyArray<{ id: Tischform; label: string }> = [
  { id: 'rechteckig', label: 'Rechteckig' },
  { id: 'rund', label: 'Rund' },
];

export function Konfigurator() {
  const [konfiguration, setKonfiguration] = useState<Konfiguration>(STANDARD_KONFIGURATION);

  // Teil-Update des unveränderlichen Zustands.
  const update = <K extends keyof Konfiguration>(feld: K, wert: Konfiguration[K]) => {
    setKonfiguration((vorher) => ({ ...vorher, [feld]: wert }));
  };

  const fehler = useMemo(() => validiere(konfiguration), [konfiguration]);

  // Fehlermeldung je Feld für die Anzeige aufbereiten.
  const fehlerProFeld = useMemo(() => {
    const map = new Map<keyof Konfiguration, string>();
    for (const f of fehler) {
      if (!map.has(f.feld)) map.set(f.feld, f.meldung);
    }
    return map;
  }, [fehler]);

  // Preis nur bei gültiger Konfiguration (Fail-Secure).
  const preis = useMemo<Preisaufstellung | null>(
    () => (fehler.length === 0 ? berechnePreis(konfiguration) : null),
    [konfiguration, fehler],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <form className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 shadow-sm">
        <AuswahlFeld
          label="Form"
          wert={konfiguration.form}
          optionen={FORM_OPTIONEN}
          onChange={(form) => update('form', form)}
        />

        {konfiguration.form === 'rund' ? (
          <ZahlFeld
            label="Durchmesser"
            einheit="mm"
            wert={konfiguration.durchmesserMm}
            min={GRENZEN.durchmesserMm.minMm}
            max={GRENZEN.durchmesserMm.maxMm}
            fehler={fehlerProFeld.get('durchmesserMm')}
            onChange={(wert) => update('durchmesserMm', wert)}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <ZahlFeld
              label="Länge"
              einheit="mm"
              wert={konfiguration.laengeMm}
              min={GRENZEN.laengeMm.minMm}
              max={GRENZEN.laengeMm.maxMm}
              fehler={fehlerProFeld.get('laengeMm')}
              onChange={(wert) => update('laengeMm', wert)}
            />
            <ZahlFeld
              label="Breite"
              einheit="mm"
              wert={konfiguration.breiteMm}
              min={GRENZEN.breiteMm.minMm}
              max={GRENZEN.breiteMm.maxMm}
              fehler={fehlerProFeld.get('breiteMm')}
              onChange={(wert) => update('breiteMm', wert)}
            />
          </div>
        )}

        <ZahlFeld
          label="Höhe"
          einheit="mm"
          wert={konfiguration.hoeheMm}
          min={GRENZEN.hoeheMm.minMm}
          max={GRENZEN.hoeheMm.maxMm}
          fehler={fehlerProFeld.get('hoeheMm')}
          onChange={(wert) => update('hoeheMm', wert)}
        />

        <AuswahlFeld
          label="Material"
          wert={konfiguration.materialId}
          optionen={MATERIALIEN}
          fehler={fehlerProFeld.get('materialId')}
          onChange={(id) => update('materialId', id)}
        />

        <AuswahlFeld
          label="Gestell"
          wert={konfiguration.gestellId}
          optionen={GESTELLE}
          fehler={fehlerProFeld.get('gestellId')}
          onChange={(id) => update('gestellId', id)}
        />

        <AuswahlFeld
          label="Kantenbearbeitung"
          wert={konfiguration.kanteId}
          optionen={KANTEN}
          fehler={fehlerProFeld.get('kanteId')}
          onChange={(id) => update('kanteId', id)}
        />
      </form>

      <Zusammenfassung konfiguration={konfiguration} preis={preis} />
    </div>
  );
}
