// Toolbox-Manifest (STUB) für die MB Planungs-Toolbox.
//
// Status: NOCH NICHT registriert und NICHT validiert. Dieses Werkzeug ist derzeit
// ein eigenständiges HTML (index.html). Zur Einbindung als `iframe`/`external-link`-
// Modul muss dieses Manifest gegen `@mb/types` (moduleManifestSchema, Zod) validiert
// und über die Toolbox-API registriert werden (z. B. `pnpm manifest:register`) —
// sobald die Toolbox-Plattform und Node/pnpm verfügbar sind.
//
// Datenklassifizierung: maintainer ist eine geteilte Team-Adresse (keine
// personenbezogene Einzeladresse). Hochgeladene Modelle werden ausschließlich
// lokal im Browser verarbeitet (keine Übertragung) — können aber kunden-/
// projektbezogen und damit ≥ C2 sein.

export const moduleConfig = {
  id: 'modell-viewer',
  name: 'Modell-Viewer (STL)',
  description:
    'Lokaler Browser-Viewer für STL-Dateien: 3D-Ansicht (Orbit/Pan/Zoom), Rotation ' +
    'zum Ausrichten, mit Oberfläche, Volumen, Gesamtmaßen, Material-/Gewichtsabschätzung ' +
    'und Skalierung.',
  category: 'Analyse', // Planung | Konfiguration | Analyse | Backup | Sonstiges
  status: 'prototype', // prototype | beta | stable
  entryType: 'iframe', // iframe | external-link
  // TODO: nach Bereitstellung (interne URL) eintragen — muss HTTPS sein.
  entryUrl: 'https://TODO.intern.max-boegl.de/modell-viewer/',
  roles: ['planer'],
  maintainer: {
    team: 'CAD',
    email: 'Dev-PuD@max-boegl.de',
  },
} as const;

export default moduleConfig;
