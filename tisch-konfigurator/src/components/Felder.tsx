// Wiederverwendbare, barrierearme Formularfelder (Label + Fehleranzeige).

import { useId } from 'react';

interface ZahlFeldProps {
  readonly label: string;
  readonly wert: number;
  readonly einheit?: string;
  readonly min?: number;
  readonly max?: number;
  readonly fehler?: string | undefined;
  readonly onChange: (wert: number) => void;
}

/** Zahleneingabe mit Label, Einheit und optionaler Fehlermeldung. */
export function ZahlFeld({ label, wert, einheit, min, max, fehler, onChange }: ZahlFeldProps) {
  const id = useId();
  const fehlerId = `${id}-fehler`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {einheit ? <span className="text-muted-foreground"> ({einheit})</span> : null}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        value={Number.isFinite(wert) ? wert : ''}
        min={min}
        max={max}
        step={1}
        aria-invalid={fehler ? true : undefined}
        aria-describedby={fehler ? fehlerId : undefined}
        onChange={(e) => onChange(e.target.valueAsNumber)}
        className="rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
      {fehler ? (
        <p id={fehlerId} role="alert" className="text-xs text-primary">
          {fehler}
        </p>
      ) : null}
    </div>
  );
}

interface AuswahlFeldProps<T extends string> {
  readonly label: string;
  readonly wert: T;
  readonly optionen: ReadonlyArray<{ readonly id: T; readonly label: string }>;
  readonly fehler?: string | undefined;
  readonly onChange: (wert: T) => void;
}

/** Auswahlfeld (Dropdown) mit Label und optionaler Fehlermeldung. */
export function AuswahlFeld<T extends string>({
  label,
  wert,
  optionen,
  fehler,
  onChange,
}: AuswahlFeldProps<T>) {
  const id = useId();
  const fehlerId = `${id}-fehler`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        value={wert}
        aria-invalid={fehler ? true : undefined}
        aria-describedby={fehler ? fehlerId : undefined}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
      >
        {optionen.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      {fehler ? (
        <p id={fehlerId} role="alert" className="text-xs text-primary">
          {fehler}
        </p>
      ) : null}
    </div>
  );
}
