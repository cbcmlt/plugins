# MB Planungs-Toolbox — Plugin-Registry

Dieses Repository ist die **Registry** (der Katalog) der MB Planungs-Toolbox. Es enthält **keinen
App-Code** — pro Tool nur eine `plugin.json`. Die eigentlichen Apps liegen in **eigenen Repos** und
werden **unabhängig deployt** (GitHub Pages für statische Apps, interner Server/Container für
serverbasierte). Die Toolbox liest diese Registry, zeigt Kacheln und **öffnet die `url` in einem neuen
Tab** — sie hostet oder proxyt nichts.

```
cbcmlt-plugins/
├── plugin.template.json        ← Kopiervorlage für neue Einträge
├── fassaden-konfigurator/
│   └── plugin.json
├── modell-viewer/
│   └── plugin.json
└── tisch-konfigurator/
    └── plugin.json
```

## Vertrag: `plugin.json`

| Feld                 | Pflicht | Bedeutung |
|----------------------|:------:|-----------|
| `name`               | ✓ | Anzeigename der Kachel |
| `description`        | ✓ | Kurzbeschreibung |
| `url`                | ✓ | **Wo die App erreichbar ist** (Pages **oder** Server) — wird beim Klick geöffnet. Nur `https`. |
| `repo`               | ○ | Quell-Repo (`owner/name`) — für Tech-Auto-Erkennung (Fallback) und Version/Changelog |
| `tech`               | ○ | Was es ist → Badge. Fehlt es, erkennt die Toolbox den Typ aus `repo` (siehe unten). |
| `hosting`            | ○ | `static` (GitHub Pages) **oder** `server` (interner Host/Container/PaaS) |
| `category`           | ○ | Kategorie-Tab (Tabs werden dynamisch aus den vorkommenden Kategorien gebildet) |
| `roles`              | ○ | Sichtbarkeit, z. B. `["planer","entwickler"]`. **Leer/fehlend = für alle.** |
| `version`            | ○ | Anzeigeversion (SemVer) |
| `dataClassification` | ○ | R_86-Stufe (`C0`–`C3`); personenbezogene Daten ≥ `C2` |
| `maintainer`         | ○ | Ansprechpartner (E-Mail) |
| `iconEmoji`          | ○ | Emoji (Anzeige) |

> Die Datei muss **UTF-8 (ohne BOM)** und gültiges JSON sein.

## `tech`-Werte und Badge

| `tech`         | Badge   | Farbe   |
|----------------|---------|---------|
| `javascript` / `html` | `JS`     | Blau `#3178C6` |
| `python`       | `PY`     | Gelb `#F7C948` |
| `blazor`       | `BLAZOR` | Lila `#512BD4` |
| `react`        | `REACT`  | Cyan `#61DAFB` |
| `node`         | `NODE`   | Grün `#68A063` |
| `docker`       | `DOCKER` | Blau `#2496ED` |
| `yaml`         | `YAML`   | Grau `#6B6B6B` |
| (unbekannt)    | `?`      | Grau `#999999` |

## `hosting`: wo die App laufen muss

Der Tech-Typ bestimmt **nicht**, wie die Toolbox lädt (immer per `url`), sondern **wo** die App
gehostet werden muss:

| `hosting` | Geeignet für | Deployment |
|-----------|--------------|------------|
| `static`  | `javascript`, `html`, `blazor` (WASM, veröffentlicht) | **GitHub Pages** des App-Repos |
| `server`  | `python`, `node`, `docker`, `blazor` (Server) | Interner Server / Container / PaaS (z. B. Streamlit Cloud) → exponiert eine `url` |

> Beispiel Python: Die App läuft auf einem Server (nicht auf Pages — Pages kann kein Python
> ausführen), `plugin.json` setzt `"hosting": "server"` und `url` zeigt auf die Server-Adresse.

## Tech-Erkennung: Override vs. Auto-Detect

- **Maßgeblich** ist das `tech`-Feld in `plugin.json` (kein API-Aufruf, funktioniert auch für private
  oder nicht scannbare Repos, deterministisch).
- **Fehlt `tech`**, scannt die Toolbox die Dateien des in `repo` genannten App-Repos (Priorität):
  `*.csproj`/`*.razor` → `blazor` · `requirements.txt`/`*.py` → `python` ·
  `package.json` (mit React) → `react`, sonst → `node` · `docker-compose.yml` → `docker` ·
  `index.html` → `javascript` · `*.yaml`/`*.yml` → `yaml` · sonst → `unknown`.

## App hinzufügen

1. Ordner `<slug>/` anlegen (Slug = Kleinbuchstaben, Bindestriche).
2. `plugin.template.json` nach `<slug>/plugin.json` kopieren und ausfüllen.
3. `url` auf das Deployment der App zeigen lassen, `repo` auf das Quell-Repo.
4. Committen und pushen — die Toolbox zeigt die Kachel beim nächsten Sync (max. 5 Min Cache).

## App entfernen

Ordner löschen, committen, pushen.
