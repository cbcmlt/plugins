# Fassaden-Konfigurator (EPW-gestütztes Verschattungstool)

Interaktives Browser-Werkzeug zum Entwurf einer **Glasfassade mit variabler horizontaler Auskragung** (Verschattung). Es zeigt in **3D**, wie die Auskragung die Scheibe verschattet, und berechnet die **auf das Glas einfallende solare Last** (W/m²) für einen gewählten Zeitpunkt – auf Basis realer Standort-Klimadaten aus einer EnergyPlus-Weather-Datei (`.epw`).

> **Eigenständiges HTML-Tool** (kein Build, keine Abhängigkeiten zur Laufzeit außer Three.js per CDN). Vorgesehen zur späteren Einbindung in die **MB Planungs-Toolbox** als `iframe`/`external-link`-Modul – siehe [`module.config.ts`](./module.config.ts).

## Öffnen

- **Lokal:** `index.html` in **Chrome oder Edge** öffnen (Doppelklick oder per `file://`-Adresse). Three.js wird über eine Import-Map vom CDN geladen – funktioniert aus `file://` in Chrome/Edge (Firefox ist hier restriktiver).
- **Bereitgestellt (http/https):** Wird das Tool über einen Webserver / GitHub Pages ausgeliefert, lädt es die **mitgelieferte Beispieldatei** (Ingolstadt-Manching) automatisch.

## Bedienung

- **Wetterdaten:** Eine eigene `.epw` per Drag-&-Drop in das Feld ziehen. Ohne Datei rechnet das Tool mit einer **Klarhimmel-Schätzung** für Ingolstadt (klar gekennzeichnet).
- **Glas:** Breite, Höhe, Neigung.
- **Orientierung:** Azimut (0°=N, 90°=O, 180°=S, 270°=W) – dreht die gesamte Baugruppe um die Hochachse; die Sonne bleibt im Weltkoordinatensystem fix.
- **Auskragung:** Tiefe, Höhe über Glas, Dicke, seitlicher Überstand.
- **Zeit:** Tag im Jahr + Stunde.
- **Heatmap-Auflösung:** Niedrig / Mittel / Hoch (Anzahl Stützpunkte; Start = Niedrig).
- **Reset view:** setzt die Kameraperspektive zurück.
- **Ergebnisse:** Sonnenhöhe/-azimut, mittlere einfallende Last mit/ohne Auskragung, Reduktion durch die Auskragung, besonnter Flächenanteil, Außentemperatur.

## Physik (Kurzfassung)

Sonnenstand (Deklination + Zeitgleichung) → Plane-of-Array-Bestrahlung aus den EPW-Werten DNI/DHI/GHI → analytische Verschattung der Auskragung über den Profilwinkel; zusätzlich eine vereinfachte Himmels-Sichtfaktor-Reduktion des diffusen Anteils.

## Grenzen (wichtig)

**Vergleichs- und Frühentwurfs-Werkzeug**, kein zertifizierter Simulator. Vereinfachungen: isotroper Diffusanteil, keine Mehrfachreflexionen, einzelne horizontale Auskragung (keine seitlichen Finnen/Lamellen), einfallende Last **auf der Glasoberfläche** (keine Transmission durch die Verglasung / g-Wert). Für belastbare Energienachweise sind Werkzeuge wie EnergyPlus/Radiance heranzuziehen.

## Datenklassifizierung (R_86)

- Werkzeug-Code und Klimadaten: **C0/C1** – öffentliche Klimadaten (`.epw`) und technischer Code, **keine personenbezogenen Daten**.
- Die Beispieldatei `beispiel/DEU_BY_Ingolstadt.Manching.AF.108600_TMYx.epw` stammt von Climate.OneBuilding.org (öffentlich, **C0**).

## Bereitstellung / Übergabe

- **GitHub-Push noch ausstehend** (Zugang wird eingerichtet); anschließend privates Repository. Ein **interner Gitea-Spiegel** ist in Vorbereitung.
- Vor formaler Toolbox-Übergabe: `/entwicklungsprotokoll fassaden-konfigurator` ausführen (Schutzbedarf, OWASP, DSGVO, KI-Nachweis, Unterschriftenblock).

## Lizenz

Internes/proprietäres Werkzeug der Max Bögl – siehe [`LICENSE`](./LICENSE).
