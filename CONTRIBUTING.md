# Mitwirken — App zur Toolbox hinzufügen

Diese Registry ist ein **Katalog**. Sie enthält **keinen App-Code**, sondern pro App eine
`plugin.json`. Die Toolbox liest das daraus gebaute `index.json` und **öffnet die `url` in einem
neuen Tab** — sie hostet oder proxyt nichts.

## In 4 Schritten

1. **Ordner anlegen:** `<slug>/` (Slug = Kleinbuchstaben + Bindestriche, z. B. `mein-tool`).
2. **`plugin.json` erstellen:** `plugin.template.json` kopieren nach `<slug>/plugin.json` und ausfüllen.
3. **Pull Request öffnen** gegen `main`. Die CI (`.github/workflows/build-index.yml`) **validiert**
   deine `plugin.json` gegen [`plugin.schema.json`](plugin.schema.json). Schlägt die Validierung fehl,
   wird der PR rot — Fehlermeldung beachten.
4. **Merge:** Beim Push auf `main` baut die CI automatisch `index.json` neu. Die Toolbox zeigt die
   Kachel beim nächsten Sync (max. 5 Min Cache).

> `index.json` wird **automatisch** erzeugt — **niemals von Hand bearbeiten**.

## Pflichtfelder

`name`, `description`, `url` (nur `https`), `tech`. Alles Weitere ist optional (siehe
[README.md](README.md) für die vollständige Feldtabelle).

## Je nach App-Typ

### Statische App (JS/HTML, Blazor WASM) → `hosting: "static"`
Deploybar auf GitHub Pages (bzw. internem Static-Host).
```json
{ "tech": "javascript", "hosting": "static", "url": "https://cbcmlt.github.io/mein-tool/" }
```
- **Blazor WASM:** zuerst `dotnet publish` → den Inhalt von `wwwroot` veröffentlichen, `tech: "blazor"`.
  `<base href>` muss zum Pfad passen; eine `.nojekyll`-Datei nicht vergessen.
- **Vite/React:** `npm run build` → `dist/` veröffentlichen, `tech: "react"`.

### Server-App (Python/Streamlit, Node, Docker) → `hosting: "server"`
Läuft **nicht** auf statischen Pages — auf einem Host/Container deployen und die `url` auf die
Server-Adresse zeigen lassen.
```json
{ "tech": "python", "hosting": "server", "url": "https://tools.intern/mein-tool/" }
```

## Tech-Werte

`javascript` · `html` · `python` · `blazor` · `react` · `node` · `docker` · `yaml`
(unbekannt → Badge „?"). Vollständige Badge-Farben in der [README.md](README.md).

## Datenschutz (R_86)

`dataClassification` realistisch setzen (`C0`–`C3`). **Achtung:** Die Toolbox blendet Kacheln nur
nach `roles` aus — das ist **keine** Zugriffskontrolle. Apps mit `C2+`-Daten **müssen selbst**
authentifizieren (Entra ID). Rein per Link geöffnete Tools sollten `C0`/`C1` sein.

## Lokal prüfen (optional)

```bash
npm install -g ajv-cli ajv-formats
ajv validate -s plugin.schema.json -d "mein-tool/plugin.json" --strict=false -c ajv-formats
```

## App entfernen

Ordner löschen, committen, PR/merge — `index.json` wird automatisch neu gebaut.
