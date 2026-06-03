# CLAUDE.md — Modell-Viewer (STL)

Projektspezifische Hinweise. Die Konzern-Vorgaben aus `../../CLAUDE.md` und
`../../.claude/rules/` gelten zusätzlich und haben Vorrang.

## Zweck

Eigenständiges Browser-Werkzeug zum **Importieren und Begutachten von 3D-Modellen**
im **STL**-Format. Der Nutzer lädt eine Datei hoch (der Typ wird geprüft). Das
Modell wird in 3D dargestellt (Orbit drehen, **schwenken/Pan**, zoomen, Ansicht
zurücksetzen) und lässt sich um **X/Y/Z** rotieren, um eine schlechte Import-Lage
zu korrigieren. Ausgewertet werden **Oberfläche, Volumen, Gesamtmaße (L×B×H)**
sowie eine **Gewichtsabschätzung** über ein wählbares **Material** (Dichte). Das
Modell lässt sich **skalieren**; eine **Bounding-Box** mit Maßen ist einblendbar.

**Single-File-HTML** (`index.html`), bewusst ohne Build-Schritt. Einzige Laufzeit-
Abhängigkeit ist **Three.js** (`three@0.160.0`) über eine CDN-Import-Map
(Szene, `OrbitControls`, `STLLoader`).

**Noch kein Toolbox-Modul.** Vorgesehen zur späteren Einbindung als
`iframe`/`external-link`-Modul (siehe `module.config.ts`).

## Architektur

`index.html` — klar getrennte Abschnitte im `<script>`:
- **Reine Geometrie-Funktionen** (UI-frei, deterministisch):
  - `detectType()` — STL per Endung, Inhalts-Schnüffeln (`solid …`) als Rückfall.
  - `meshStats()` — Oberfläche (Σ Dreiecksflächen), Volumen (Σ vorzeichenbehaftete
    Tetraeder, Betrag) und Bounding-Box; `isWatertight()` als Heuristik (jede Kante
    genau zweimal). Volumen/Gewicht werden bei offenem Netz **nicht** ausgewiesen.
- **Three.js-Szene** — Renderer, Kamera, `OrbitControls` (`enablePan = true`),
  Licht, Boden/Gitter/Achsen, `fitCameraToObject()`.
- **Transform** — `applyTransform()` wendet Rotation (X/Y/Z, Grad) und Skalierung
  an und stellt das Modell auf den Boden; `updateBBoxHelper()` zeichnet optional die
  Bounding-Box mit Maßlabels. Oberfläche/Volumen sind rotationsunabhängig; die
  angezeigten Gesamtmaße folgen der aktuellen Welt-Bounding-Box.
- **Laden** — STL über `STLLoader.parse` (ASCII + binär, auch `file://`),
  fail-secure (bei Fehler bleibt das vorherige Modell erhalten).
- **UI-Verdrahtung** — Einheit, Skalierung (Faktor + Ziel-Kantenlänge), Rotation
  (Slider + „Z-up → Y-up" + Reset), Material/Dichte, Wireframe-/Gitter-/Bounding-
  Box-Schalter, Reset-View, Auswertungs-Panel.

`beispiel/` — mitgelieferte Beispieldatei (`wuerfel.stl`, öffentlich/synthetisch, C0).

## Befehle

Kein Build nötig. `index.html` direkt in **Chrome/Edge** öffnen (auch per
Doppelklick / `file://`). Eine `.stl`-Datei in das Upload-Feld ziehen. Wird die
Seite über http(s) bereitgestellt, lädt das Beispiel automatisch.

## Datenklassifizierung (R_86)

- **Verarbeitung ausschließlich lokal**: hochgeladene Modelle werden im Browser
  gelesen (`arrayBuffer`) und **nicht** übertragen. Die CDN liefert nur die
  Three.js-Bibliothek, **keine** Nutzerdaten.
- Hochgeladene Modelle können kunden-/projektbezogen sein → **mindestens C2**.
  Bei C2 gelten Zugriffskontrolle/Verschlüsselung/Löschkonzept der Betriebs-
  umgebung; das Werkzeug selbst speichert oder sendet nichts.
- Die mitgelieferte Beispieldatei ist öffentlich/synthetisch (**C0**).

## KI-Nutzung (R_76)

- KI-unterstützt erstellt. Ausgaben sind menschlich zu prüfen, bevor sie produktiv
  eingesetzt werden. Keine C2/C3-Inhalte in Prompts/Kontext.
- Kennzeichnung im Entwicklungsprotokoll (Kapitel 14) bei Übergabe.

## Konventionen

- Code-Kommentare auf Deutsch, Bezeichner auf Englisch. UI-Texte Englisch
  (wie beim Fassaden-Konfigurator).
- Keine Secrets im Code; keine personenbezogenen Daten in Commits.
- Fail-secure Parsing: bei Fehler kein Stacktrace an den Nutzer, vorheriges Modell
  bleibt erhalten.
- Conventional Commits auf Deutsch (`feat:`, `fix:`, `docs:` …).

## Grenzen

Begutachtungs-/Vergleichswerkzeug, **kein zertifiziertes CAD-Messwerkzeug**:
- Oberfläche und Volumen werden aus dem **Netz** berechnet.
- Volumen/Gewicht sind nur bei **wasserdichten** Netzen aussagekräftig.
- STL ist einheitenlos → Einheit wird angenommen (Standard mm).
- Nur STL. Keine STEP/RVT/IGES/IFC-Unterstützung, keine Cloud-Konvertierung.
