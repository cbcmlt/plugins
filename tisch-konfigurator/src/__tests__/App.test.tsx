// Smoke-Test der Oberfläche.

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from '@/App';

describe('App', () => {
  it('rendert die Kopfzeile', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /Tisch-Konfigurator/i })).toBeInTheDocument();
  });

  it('zeigt für die Standardkonfiguration einen Gesamtpreis', () => {
    render(<App />);
    expect(screen.getByText(/Gesamt \(netto\)/i)).toBeInTheDocument();
    // Standardtisch (Eiche 1600 × 800 mm) = 409,60 € (Materialzeile + Gesamt).
    expect(screen.getAllByText(/409,60/).length).toBeGreaterThan(0);
  });
});
