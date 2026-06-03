# Tisch-Konfigurator

Eigenständige Web-App zum Zusammenstellen eines Tisches: Form, Maße, Material,
Gestell und Kantenbearbeitung werden gewählt, der Nettopreis wird live berechnet.

> Standalone-Projekt (kein Toolbox-Modul). Keine externe API, keine Anbindung an
> die MB Planungs-Toolbox.

## Tech-Stack

| Bereich      | Technologie                |
| ------------ | -------------------------- |
| Build/Dev    | Vite 5                     |
| UI           | React 18                   |
| Sprache      | TypeScript 5 (strict)      |
| Styling      | Tailwind CSS 3             |
| Tests        | Vitest + Testing Library   |
| Linting      | ESLint 9 (flat) + Prettier |

## Voraussetzungen

- **Node.js ≥ 20** (LTS)
- npm (oder pnpm/yarn)

## Setup

```bash
npm install
npm run dev        # Dev-Server auf http://localhost:5210
```

## Befehle

| Befehl               | Zweck                                  |
| -------------------- | -------------------------------------- |
| `npm run dev`        | Entwicklungsserver mit Hot-Reload      |
| `npm run build`      | Typecheck + Produktions-Build (`dist`) |
| `npm run preview`    | Produktions-Build lokal ausliefern     |
| `npm run typecheck`  | TypeScript-Prüfung ohne Emit           |
| `npm run lint`       | ESLint                                 |
| `npm run format`     | Prettier (schreibend)                  |
| `npm run test`       | Vitest (einmalig)                      |
| `npm run test:watch` | Vitest im Watch-Modus                  |

## Projektstruktur

```
src/
├── domain/            Reine Geschäftslogik (ohne UI)
│   ├── types.ts       Domänentypen
│   ├── catalog.ts     Stammdaten (Materialien, Gestelle, Kanten, Grenzen)
│   └── konfiguration.ts  Geometrie, Validierung, Preisberechnung
├── components/        React-Komponenten
│   ├── Felder.tsx     Wiederverwendbare Formularfelder
│   ├── Konfigurator.tsx  Zustand + Formular
│   └── Zusammenfassung.tsx  Live-Preisaufstellung
├── styles/globals.css Tailwind + Farb-Token
├── App.tsx            Seitenlayout
└── main.tsx           Einstiegspunkt
```

Die Geschäftslogik in `src/domain/` ist UI-frei und vollständig durch
Unit-Tests abgedeckt (`src/__tests__/konfiguration.test.ts`).

## Sicherheit & Datenschutz

- **Datenklassifizierung (R_86): C0** — es werden ausschließlich technische
  Produktdaten verarbeitet, **keine personenbezogenen Daten**.
- **Eingabevalidierung** serverlos im Client: Typ, Ganzzahligkeit und
  Wertebereich aller Maße werden geprüft; Auswahlfelder folgen einem
  Whitelist-Ansatz (`src/domain/catalog.ts`).
- **Fail-Secure**: Ein Preis wird nur bei vollständig gültiger Konfiguration
  berechnet.
- Keine `eval`/`Function`-Nutzung, kein dynamisches `innerHTML` (per ESLint
  erzwungen).

## Anpassen des Katalogs

Materialien, Gestelle, Kanten und zulässige Maßgrenzen werden zentral in
`src/domain/catalog.ts` gepflegt. Änderungen dort wirken sich automatisch auf
Formular, Validierung und Preisberechnung aus.
