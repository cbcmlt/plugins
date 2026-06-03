# CLAUDE.md — Tisch-Konfigurator

Projektspezifische Hinweise. Die Konzern-Vorgaben aus `../CLAUDE.md` und
`../.claude/rules/` gelten zusätzlich und haben Vorrang.

## Zweck

Eigenständige Web-App zum Konfigurieren eines Tisches (Form, Maße, Material,
Gestell, Kante) mit Live-Nettopreisberechnung. **Kein Toolbox-Modul** — keine
`@mb/*`-Abhängigkeiten, keine Plattform-API.

## Architektur

- **`src/domain/`** — reine, UI-freie Geschäftslogik. Hier liegen Stammdaten
  (`catalog.ts`), Typen (`types.ts`) sowie Geometrie, Validierung und
  Preisberechnung (`konfiguration.ts`). Diese Schicht ist die einzige Quelle
  der Wahrheit für Preise und zulässige Werte und ist vollständig getestet.
- **`src/components/`** — React-Komponenten. Sie halten Zustand und Darstellung,
  enthalten aber keine Geschäftsregeln (diese kommen aus `domain/`).
- Änderungen am Sortiment/Preis ausschließlich in `src/domain/catalog.ts`.

## Befehle

```bash
npm install
npm run dev        # http://localhost:5210
npm run typecheck  # vor jedem Commit grün halten
npm run lint
npm run test
npm run build
```

## Datenklassifizierung (R_86)

- **C0** — ausschließlich technische Produktdaten. **Keine personenbezogenen
  Daten** im Projekt. Sollten künftig Kundendaten (z. B. für Angebote)
  hinzukommen, steigt die Einstufung auf **mindestens C2**; dann sind
  Zugriffskontrolle, Verschlüsselung und ein Löschkonzept verbindlich.

## Konventionen

- Code-Kommentare/Doku auf Deutsch, Bezeichner auf Englisch.
- TypeScript `strict`; kein `any` ohne begründeten Kommentar.
- Eingabevalidierung über `validiere()` (Whitelist + Wertebereiche), Fail-Secure
  bei der Preisberechnung.
- Conventional Commits auf Deutsch (`feat:`, `fix:`, `docs:` …).
- Jeder Fix erhält einen begleitenden Regressionstest.
