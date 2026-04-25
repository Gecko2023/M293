# Nutzwertanalyse: Vergleich der KI-Unterstützung

Im Rahmen des Projekts "Katja Brandis Webshop" wurden **Claude (Anthropic)**, **GitHub Copilot** und **Google Gemini** als KI-Assistenten eingesetzt. Die folgende Nutzwertanalyse (NWA) bewertet die Performance aller drei Tools basierend auf den spezifischen Projektanforderungen. Grundlage der Bewertung ist jeweils die generierte `index.html` jedes Tools.

---

## 1. Kriterienkatalog und Gewichtung

Die Auswahl der Kriterien basiert auf den offiziellen Bewertungsrichtlinien des Projekts (Sauberkeit des Codes, Responsivität ohne Frameworks und korrekte Semantik).

| Kriterium            | Beschreibung                                                                                                                    |   Gewichtung    |
|:---------------------|:--------------------------------------------------------------------------------------------------------------------------------|:---------------:|
| **Code-Qualität**    | Semantische HTML-Tags, Barrierefreiheit (ARIA-Attribute, Labels/IDs).                                                           |   30% (0.30)    |
| **Responsivität**    | Korrekte Umsetzung der Breakpoints (Desktop, Tablet, Mobile) laut Wireframe.                                                    |   20% (0.20)    |
| **Effizienz**        | Antwortgeschwindigkeit und Anzahl der notwendigen Korrekturschleifen.                                                           |   15% (0.15)    |
| **Vorgabentreue**    | Vollständige Umsetzung aller im Wireframe definierten Abschnitte und Strukturen.                                                |   15% (0.15)    |
| **Erklärungsgehalt** | Qualität der Kommentare und Erläuterung der technischen Entscheidungen.                                                         |   10% (0.10)    |
| **Design**           | Thematisch passendes Erscheinungsbild (Katja Brandis / Wandler-Welt); Kreativität bei nicht im Wireframe definierten Elementen. |   10% (0.10)    |
| **Gesamt**           |                                                                                                                                 | **100% (1.00)** |

---

## 2. Bewertungsskala (Punkte 1-10)

* **10 - 9:** Exzellent; fehlerfrei; Code direkt produktiv einsetzbar.
* **8 - 7:** Gut; geringfügige manuelle Anpassungen am CSS/HTML nötig.
* **6 - 5:** Befriedigend; Logik vorhanden, aber Designfehler oder unsaubere Semantik.
* **4 - 1:** Mangelhaft; Code fehlerhaft oder ignoriert zentrale Vorgaben (z. B. nutzt Frameworks).

---

## 3. Analyseergebnisse

| Kriterium          | Gewicht  | Punkte Claude | Nutzwert C | Punkte Copilot | Nutzwert CP | Punkte Gemini | Nutzwert G |
|:-------------------|:--------:|:-------------:|:----------:|:--------------:|:-----------:|:-------------:|:----------:|
| Code-Qualität      |   0.30   |       9       |    2.70    |       8        |    2.40     |       4       |    1.20    |
| Responsivität      |   0.20   |       8       |    1.60    |       7        |    1.40     |       5       |    1.00    |
| Effizienz          |   0.15   |       7       |    1.05    |       8        |    1.20     |       6       |    0.90    |
| Vorgabentreue      |   0.15   |       9       |    1.35    |       8        |    1.20     |      10       |    1.50    |
| Erklärungsgehalt   |   0.10   |       7       |    0.70    |       5        |    0.50     |       3       |    0.30    |
| Design             |   0.10   |      10       |    1.00    |       6        |    0.60     |       3       |    0.30    |
| **Summe (Gesamt)** | **1.00** |   **Ø 8.3**   |  **8.40**  |   **Ø 7.0**    |  **7.30**   |   **Ø 5.2**   |  **5.20**  |

*Berechnungsformel: Gewicht × Punkte = Nutzwert*

---

## 4. Fazit und Entscheidung

### Vergleich der Ergebnisse

* **Claude (8.40):** Claude produzierte die thematisch stärkste und semantisch vollständigste `index.html`. Alle im Wireframe definierten Abschnitte – Header, Neue-Produkte-Grid, Weltenkategorien und Newsletter-Footer – waren korrekt umgesetzt. Der HTML-Code nutzte konsequent semantische Elemente (`<article>`, `<blockquote>`, `<cite>`, `<aside>`) und vollständige ARIA-Attribute (`role="banner"`, `aria-labelledby`, `aria-hidden`, `aria-live`). Sektionen waren mit Kommentaren strukturiert. Das Design folgte einer durchdachten "Organic Editorial"-Ästhetik: warme Pergament-Palette, drei separate Serien-Farbthemen (Woodwalkers waldgrün, Seawalkers meerblau, Windwalkers veilchenviolett) und die Schrift Playfair Display für einen buchhandlungsartigen Charakter. Kreativ kamen ein animierter Hero-Bereich mit serienbezogenen Badges, eine Leserstimmen-Sektion im Stil literarischer Blockquotes sowie ein Autorinnen-Strip hinzu. Einziger Abzug: das Ergebnis erforderte mehrere Korrekturschleifen.

* **GitHub Copilot (7.30):** Copilot lieferte in einem einzigen Prompt eine gut strukturierte Seite mit allen Wireframe-Elementen. Besonders stark war die Barrierefreiheit: Skip-Link (`<a class="skip-link">`), korrektes `aria-expanded` am Burger-Button, `aria-live="polite"` auf dem Newsletter-Statusfeld und `<figure>` als semantischer Bild-Wrapper. Als kreative Ergänzung setzte Copilot den in den Wireframes separat definierten Produkt-Card-Prototypen als eigenständige Komponente um und ergänzte einen Hero-Bereich. Die Schriftwahl Fraunces und Manrope passt gut zur Buchhandlungs-Ästhetik. Das Design blieb insgesamt einfacher als bei Claude, war aber nicht thematisch stimmig.

* **Google Gemini (5.2):** Gemini deckte alle strukturellen Wireframe-Anforderungen in einem einzigen Prompt ab: Header, Neue-Produkte-Grid, Welten-Kategorien und Newsletter-Footer waren vorhanden. Die Vorgabentreue war damit grundsätzlich erfüllt. Es fehlte jedoch an thematischer Designarbeit: Es wurden keine eigenen Schriften eingebunden, keine serienspezifische Farbgebung kreativ ausgearbeitet und keine über den Wireframe hinausgehenden Ideen eingebracht. Die HTML-Semantik wies deutliche Schwächen auf – ARIA-Attribute fehlten vollständig, der Logo-Bereich war ein semantikloser `<div>`, und die Überschriften-Hierarchie war inkonsistent (`<h3>` direkt gefolgt von `<h4>`). Kommentare im Code waren nicht vorhanden.

### Finale Entscheidung

Ich habe mich für **Claude** entschieden, da der Nutzwert von **8.40** zeigt, dass dieses Tool die spezifischen Anforderungen an ein framework-freies, semantisch korrektes und vollständig barrierefreies Layout am präzisesten erfüllt hat. Besonders der Bereich Design und Kreativität hob Claude deutlich von den anderen Tools ab. GitHub Copilot ist eine starke Alternative – besonders für effiziente Erstentwicklung mit solidem Barrierefreiheits-Fundament. Google Gemini lieferte zwar die Wireframe-Struktur, benötigte aber erhebliche Nacharbeit in Semantik und Design.

---

## 5. Entwicklungsfortschritt des Claude-Webshops

Der folgende Abschnitt dokumentiert chronologisch, wie der Claude-Webshop Seite für Seite entstanden ist und welche Anpassungen dabei vorgenommen wurden.

---

### Phase 1 – Planung & Wireframes

Vor dem ersten KI-Einsatz habe ich das Projekt mit einem Git-Repository aufgesetzt und Wireframes sowie einen Styleguide mit Typografie für alle vier Seiten erstellt: Startseite, Produktübersicht, Kontakt & Team sowie Produkt-Detailseite. Jede Seite wurde in drei Breakpoints (Desktop, Tablet, Mobile) unterteilt und als HTML/CSS-Mockup in `Wireframes.md` festgehalten. Diese Wireframes dienten anschliessend als Grundlage für alle Prompts.

---

### Phase 2 – Vergleich der KI-Tools

Im ersten Entwicklungsschritt habe ich die drei KI-Tools mit dem Aufbau ihrer jeweiligen `index.html` beauftragt und anschliessend anhand der oben genannten Kriterien ausgewertet.

---

### Phase 3 – Hauptausbau: alle Seiten & Produkte

Darauf habe ich zusammen mit Claude die Webseite fertiggestellt. Der Ablauf war folgender:

1. Ausbau der index.html-Seite
2. Produktseite mit Platzhaltern für alle Bilder
3. Kontaktseite mit Formular
4. Produkt-Detailseiten mit Platzhaltern für Bilder, Beschreibung, Leseprobe und «In den Warenkorb»-Knopf (erste Beispiele mit Claude, danach habe ich ChatGPT-Codex 5.4 für den erweiterten Ausbau verwendet)
5. Bilder: heruntergeladen von der offiziellen [Webseite](https://katja-brandis.de/alle-buecher) und durch ChatGPT-Codex eingefügt
6. Warenkorb mit Zwischenspeicher im LocalStorage und Checkout-Seite mit einer Liste aller ausgewählten Produkte und Zahlungsformular

---
