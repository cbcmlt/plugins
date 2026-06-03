# CLAUDE.md — Fassaden-Konfigurator

Projektspezifische Hinweise. Die Konzern-Vorgaben aus `../CLAUDE.md` und
`../.claude/rules/` gelten zusätzlich und haben Vorrang.

## Zweck

Eigenständiges Browser-Werkzeug zum Entwurf einer Glasfassade mit variabler
horizontaler Auskragung (Verschattung). Zeigt in 3D die Verschattung des Glases
und berechnet die einfallende solare Last (W/m²) aus EnergyPlus-Wetterdaten
(`.epw`). **Single-File-HTML** (`index.html`), bewusst ohne Build-Schritt; einzige
Laufzeit-Abhängigkeit ist Three.js über eine CDN-Import-Map.

**Noch kein Toolbox-Modul.** Vorgesehen zur späteren Einbindung als
`iframe`/`external-link`-Modul (siehe `module.config.ts`); eine native Modul-
Variante (Vite/React + `@mb/module-sdk`) ist über den Skill
`migriere-zu-toolbox-modul` möglich, sobald die Toolbox-Plattform und Node/pnpm
verfügbar sind.

## Architektur

- **`index.html`** — gesamtes Tool. Klar getrennte Abschnitte im `<script>`:
  - Reine Berechnungsfunktionen (Sonnenstand, Solarlast/Verschattung, EPW-Parser)
    — UI-frei und deterministisch (Zeit kommt aus dem EPW-Record, kein `Date.now()`).
  - Three.js-Szene (Baugruppe = Glas + Auskragung + Wand, um die Hochachse drehbar).
  - UI-Verdrahtung der Steuerelemente.
- **`beispiel/`** — öffentliche Beispiel-`.epw` (Ingolstadt-Manching).

## Befehle

Kein Build nötig. `index.html` in **Chrome/Edge** öffnen (Three.js per CDN lädt
auch aus `file://`). Bei http(s)-Bereitstellung wird die Beispieldatei automatisch
geladen.

## Datenklassifizierung (R_86)

- **C0/C1** — öffentliche Klimadaten (`.epw`) und technischer Code, **keine
  personenbezogenen Daten**. Die Beispieldatei ist öffentlich (C0).
- Kämen künftig kundenbezogene Projekt- oder Standortdaten hinzu, steigt die
  Einstufung auf **mindestens C2** (dann Zugriffskontrolle/Verschlüsselung/
  Löschkonzept verbindlich).

## KI-Nutzung (R_76)

- KI-unterstützt erstellt. Ausgaben sind menschlich zu prüfen, bevor sie
  produktiv eingesetzt werden. Keine C2/C3-Inhalte in Prompts/Kontext.
- Kennzeichnung im Entwicklungsprotokoll (Kapitel 14) bei Übergabe.

## Konventionen

- Code-Kommentare auf Deutsch, Bezeichner auf Englisch. UI-Texte aktuell Englisch
  (Nutzervorgabe).
- Keine Secrets im Code; keine personenbezogenen Daten in Commits.
- Conventional Commits auf Deutsch (`feat:`, `fix:`, `docs:` …).

## Grenzen

Vergleichs-/Frühentwurfs-Werkzeug, **kein zertifizierter Simulator**: isotroper
Diffusanteil, keine Mehrfachreflexionen, einzelne horizontale Auskragung,
einfallende Last auf der Glasoberfläche (keine Transmission/g-Wert).
