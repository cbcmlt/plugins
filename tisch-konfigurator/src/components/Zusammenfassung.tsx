// Live-Zusammenfassung mit Preisaufstellung.

import { findeGestell, findeKante, findeMaterial } from '@/domain/catalog';
import { formatiereEuro } from '@/domain/konfiguration';
import type { Konfiguration, Preisaufstellung } from '@/domain/types';

interface ZusammenfassungProps {
  readonly konfiguration: Konfiguration;
  readonly preis: Preisaufstellung | null;
}

function Zeile({ bezeichnung, wert }: { bezeichnung: string; wert: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1">
      <span className="text-sm text-muted-foreground">{bezeichnung}</span>
      <span className="text-sm font-medium tabular-nums">{wert}</span>
    </div>
  );
}

export function Zusammenfassung({ konfiguration, preis }: ZusammenfassungProps) {
  const material = findeMaterial(konfiguration.materialId);
  const gestell = findeGestell(konfiguration.gestellId);
  const kante = findeKante(konfiguration.kanteId);

  const masse =
    konfiguration.form === 'rund'
      ? `Ø ${konfiguration.durchmesserMm} mm`
      : `${konfiguration.laengeMm} × ${konfiguration.breiteMm} mm`;

  return (
    <aside className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Zusammenfassung</h2>

      <div>
        <Zeile bezeichnung="Form" wert={konfiguration.form === 'rund' ? 'Rund' : 'Rechteckig'} />
        <Zeile bezeichnung="Maße" wert={masse} />
        <Zeile bezeichnung="Höhe" wert={`${konfiguration.hoeheMm} mm`} />
        <Zeile bezeichnung="Material" wert={material?.label ?? '—'} />
        <Zeile bezeichnung="Gestell" wert={gestell?.label ?? '—'} />
        <Zeile bezeichnung="Kante" wert={kante?.label ?? '—'} />
      </div>

      <hr className="border-border" />

      {preis ? (
        <div>
          <Zeile bezeichnung="Plattenfläche" wert={`${preis.flaecheQm.toLocaleString('de-DE')} m²`} />
          <Zeile bezeichnung="Umfang" wert={`${preis.umfangM.toLocaleString('de-DE')} m`} />
          <Zeile bezeichnung="Material" wert={formatiereEuro(preis.materialKosten)} />
          <Zeile bezeichnung="Kantenbearbeitung" wert={formatiereEuro(preis.kantenKosten)} />
          <Zeile bezeichnung="Gestell" wert={formatiereEuro(preis.gestellKosten)} />
          <hr className="my-2 border-border" />
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-base font-semibold">Gesamt (netto)</span>
            <span className="text-xl font-bold tabular-nums text-primary">
              {formatiereEuro(preis.gesamtNetto)}
            </span>
          </div>
        </div>
      ) : (
        <p role="alert" className="text-sm text-primary">
          Bitte korrigieren Sie die markierten Eingaben, um einen Preis zu erhalten.
        </p>
      )}
    </aside>
  );
}
