# Änderungshistorie

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.
Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/1.1.0/);
Versionierung nach [SemVer](https://semver.org/lang/de/).

## [0.1.0] – 2026-06-03

### Hinzugefügt
- Eigenständiges HTML-Werkzeug (`index.html`): 3D-Glasfassade mit variabler horizontaler Auskragung (Three.js per CDN).
- Sonnenstandsberechnung (Deklination + Zeitgleichung) und Plane-of-Array-Bestrahlung aus EPW-Werten (DNI/DHI/GHI).
- Analytische Verschattung der Auskragung (Profilwinkel) inkl. Diffus-Sichtfaktor-Reduktion.
- Einfallende solare Last je Orientierung als Heatmap auf dem Glas; Auflösung Niedrig/Mittel/Hoch (Start: Niedrig).
- Vollständig parametrische Glas- und Auskragungsmaße; Drehung der Baugruppe um die Hochachse (Orientierung).
- EPW per Drag-&-Drop; Klarhimmel-Schätzung als Rückfall ohne Datei.
- Weiß/Rot-Gestaltung in den Max-Bögl-Unternehmensfarben (`#E2001A`).
- Bemaßung der Gesamtmaße (Glas Breite×Höhe, Verschattung Breite×Tiefe) direkt im 3D.
- „Reset view"-Schaltfläche für die Standard-Kameraperspektive.
- Mitgelieferte Beispieldatei (Ingolstadt-Manching) mit Auto-Laden bei http(s)-Bereitstellung.
- Projektdokumentation (README, CLAUDE.md), Toolbox-Manifest-Stub (`module.config.ts`).

### Hinweise
- Vergleichs-/Frühentwurfs-Werkzeug, kein zertifizierter Simulator (isotroper Diffusanteil, keine Mehrfachreflexionen, einzelne Auskragung, einfallende Last auf der Glasoberfläche).
- KI-unterstützt erstellt (R_76) – Inhalte vor produktivem Einsatz menschlich prüfen.
