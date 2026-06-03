// Toolbox-Manifest (STUB) für die MB Planungs-Toolbox.
//
// Status: NOCH NICHT registriert und NICHT validiert. Dieses Werkzeug ist derzeit
// ein eigenständiges HTML (index.html). Zur Einbindung als `iframe`/`external-link`-
// Modul muss dieses Manifest gegen `@mb/types` (moduleManifestSchema, Zod) validiert
// und über die Toolbox-API registriert werden (z. B. `pnpm manifest:register`) —
// sobald die Toolbox-Plattform und Node/pnpm verfügbar sind.
//
// Datenklassifizierung: maintainer ist eine geteilte Team-Adresse (keine
// personenbezogene Einzeladresse). Werkzeug-/Klimadaten: C0/C1.

export const moduleConfig = {
  id: 'fassaden-konfigurator',
  name: 'Fassaden-Konfigurator',
  description:
    'EPW-gestütztes Werkzeug: Glasfassade mit variabler Auskragung in 3D, ' +
    'einfallende solare Last und Verschattung je Orientierung.',
  category: 'Konfiguration', // Planung | Konfiguration | Analyse | Backup | Sonstiges
  status: 'prototype', // prototype | beta | stable
  entryType: 'iframe', // iframe | external-link
  // TODO: nach Bereitstellung (GitHub Pages / interne URL) eintragen — muss HTTPS sein.
  entryUrl: 'https://TODO.intern.max-boegl.de/fassaden-konfigurator/',
  roles: ['planer'],
  maintainer: {
    team: 'CAD',
    email: 'Dev-PuD@max-boegl.de',
  },
} as const;

export default moduleConfig;
