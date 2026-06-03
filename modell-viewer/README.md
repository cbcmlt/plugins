# Modell-Viewer (STL)

Lokaler Browser-Viewer für **STL-Dateien** mit Geometrie-Analyse: 3D-Ansicht
(Orbit, Pan, Zoom, Reset), Rotation zum Ausrichten, **Oberfläche**, **Volumen**,
**Gesamtmaße**, **Material-/Gewichtsabschätzung** und **Skalierung**.

Single-File-HTML, ohne Build. Modelle werden **ausschließlich lokal im Browser**
verarbeitet und **nicht hochgeladen**.

## Nutzung

1. `index.html` in **Chrome** oder **Edge** öffnen (Doppelklick genügt, auch `file://`).
2. Eine `.stl`-Datei in das Upload-Feld ziehen (oder klicken und auswählen).

ASCII- und Binär-STL werden beide unterstützt.

## Bedienung

- **Maus**: Linksziehen = drehen (Orbit), Rechtsziehen = schwenken (Pan),
  Mausrad = zoomen. **Reset view** stellt die Standardansicht wieder her.
- **Unit**: angenommene Einheit (mm/cm/m) — STL ist einheitenlos.
- **Scale**: Skalierungsfaktor oder Ziel-Kantenlänge der längsten Kante.
  Maße ×s, Oberfläche ×s², Volumen &amp; Gewicht ×s³.
- **Rotation (X/Y/Z)**: korrigiert eine schlechte Import-Lage. „Z-up → Y-up"
  dreht typische CAD-Exporte aufrecht. Die angezeigten Gesamtmaße folgen der
  Orientierung; Oberfläche/Volumen bleiben unverändert.
- **Material**: Dichte-Voreinstellungen (Beton, Stahlbeton, Stahl, Aluminium) oder
  eigener Wert → Gewicht = Volumen × Dichte.
- **Display**: Wireframe, Gitter/Achsen und **Bounding box &amp; dimensions**
  (zeigt die Gesamtmaße im 3D-Bild) ein-/ausblenden.

## Analyse-Hinweise

- **Volumen/Gewicht** werden nur bei **wasserdichten** Netzen ausgewiesen. Bei
  offenen Netzen erscheint „open mesh".
- Werte stammen aus dem Netz → **kein zertifiziertes Messwerkzeug**.

## Beispiel

`beispiel/wuerfel.stl` — ein Würfel mit 100 mm Kantenlänge. Erwartete Werte
(Skalierung 1, Material Beton 2400 kg/m³):

| Größe        | Wert                       |
|--------------|----------------------------|
| Maße         | 100 × 100 × 100 mm         |
| Oberfläche   | 60 000 mm² (600 cm²)       |
| Volumen      | 1 000 000 mm³ (1 L)        |
| Gewicht      | 2,40 kg                    |

> Verifiziert: STL-Pfad und alle Kennzahlen wurden im Browser gegen diese
> Sollwerte geprüft; Skalierung (×s, ×s², ×s³) und Material-/Dichte-Verhältnis
> stimmen.

## Abhängigkeiten

| Bibliothek | Version | Zweck                            | Bezug        |
|------------|---------|----------------------------------|--------------|
| three      | 0.160.0 | Szene, OrbitControls, STLLoader  | CDN (unpkg)  |

## Datenschutz / Klassifizierung

Modelle können kunden-/projektbezogen sein (**≥ C2**). Verarbeitung erfolgt nur
lokal; es werden keine Daten gespeichert oder gesendet. Siehe `CLAUDE.md`.
