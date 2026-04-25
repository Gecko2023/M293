# Styleguide – Brandis Shop

Design Direction: **Organic editorial · forest-ink palette**

---

## 0. Logo

Das Logo besteht aus zwei rein typografischen Elementen — kein Bildzeichen.

| Element | Text | Schrift | Gewicht | Grösse | Farbe | Besonderheit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `.logo-main` | `Brandis` | Playfair Display | 900 | `1.5rem` | `--clr-bark` (`#2c1f0f`) | `letter-spacing: -0.02em` |
| `.logo-sub` | `Shop` | Barlow | 500 | `0.7rem` | `--clr-moss` (`#3d5a2a`) | Grossbuchstaben, `letter-spacing: 0.1em`, unten bündig |

**Struktur:**

```html
<a href="#" class="logo">
  <span class="logo-main">Brandis</span><span class="logo-sub">Shop</span>
</a>
```

**Verwendungsregeln:**
- Das Logo erscheint ausschliesslich als verlinktes `<a>`-Element mit `aria-label="Brandis-Shop – Startseite"`
- Mindestgrösse: `logo-main` nicht unter `1.2rem` skalieren
- Kein Bildersatz, keine Outline, kein Schatten

---

## 1. Typografie

### Schriftfamilien

| Rolle | Schrift | Fallback | Einsatz |
| :--- | :--- | :--- | :--- |
| **Display** | Playfair Display | Georgia, serif | H1–H4, Logo, Preise, Sektions­titel |
| **Body** | Libre Baskerville | Georgia, serif | Fliesstext, Produkt­beschreibungen, Leseproben |
| **UI** | Barlow | sans-serif | Labels, Buttons, Navigation, Metainfos, Formulare |

Alle drei Schriften werden via Google Fonts eingebunden:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

---

### Schriftgrössen & Hierarchie

| Element | Grösse | Gewicht | Schriftfamilie |
| :--- | :--- | :--- | :--- |
| H1 (Hero) | `clamp(2.8rem, 7vw, 4.5rem)` | 900 | Display |
| H1 (Seiten­titel) | `clamp(2.4rem, 6vw, 3.8rem)` | 900 | Display |
| H2 | `clamp(1.5rem, 4vw, 2rem)` | 700 | Display |
| H3 | `1.05rem` | 700 | Display |
| Body (Basis) | `16px` (= 1rem) | 400 | Body |
| Body (Produkt­text) | `0.95rem` | 400 | Body |
| UI-Label | `0.72rem` | 600 | UI |
| UI-Kicker | `0.72rem` | 600, `letter-spacing: 0.18em`, Grossbuchstaben | UI |
| Button | `0.875rem` | 600, `letter-spacing: 0.04em`, Grossbuchstaben | UI |
| Meta / Muted | `0.78–0.9rem` | 400 | UI |

**Zeilenhöhen:**
- Fliesstext: `line-height: 1.7`
- Überschriften: `line-height: 1.15`

---

## 2. Farben

### Standard-Palette (Default-Theme)

| Token | Hex | Verwendung |
| :--- | :--- | :--- |
| `--clr-bark` | `#2c1f0f` | Überschriften, Logo |
| `--clr-ink` | `#1e1a14` | Fliesstext |
| `--clr-muted` | `#7a7060` | Meta­texte, Labels, Platzhalter |
| `--clr-accent` | `#c4722a` | CTA-Buttons, Preise, Hover, Links |
| `--clr-accent-dark` | `#9a5720` | Hover-Zustand des Akzents |
| `--clr-accent-light` | `rgba(196,114,42, 0.12)` | Focus-Ring, subtile Hintergründe |
| `--clr-accent-mid` | `rgba(196,114,42, 0.40)` | Schatten, Scrollbar |
| `--clr-parchment` | `#f5f0e8` | Seiten­hintergrund |
| `--clr-linen` | `#ede8dc` | Karten-/Abschnitts­hintergrund |
| `--clr-rule` | `#c8bfaa` | Trennlinien, Rahmen |
| `--clr-white` | `#ffffff` | Karten­hintergrund, Text auf dunklem Grund |
| `--clr-moss` | `#3d5a2a` | Woodwalkers-Primärfarbe |
| `--clr-tide` | `#1b3f6e` | Seawalkers-Primärfarbe |
| `--clr-gust` | `#4a4e6b` | Windwalkers-Primärfarbe |

---

### Serien-Themes

Der Shop besitzt vier wählbare Themes, die per `data-theme`-Attribut am `<html>`-Element gesetzt werden.

#### Default (Warm Amber)
| Token | Wert |
| :--- | :--- |
| `--clr-accent` | `#c4722a` |
| `--clr-parchment` | `#f5f0e8` |
| `--clr-linen` | `#ede8dc` |

#### Woodwalkers (Chestnut Brown)
| Token | Wert |
| :--- | :--- |
| `--clr-accent` | `#8b4a1e` |
| `--clr-parchment` | `#edf2e5` |
| `--clr-linen` | `#dfe9d4` |
| `--clr-bark` | `#1b3010` |

#### Seawalkers (Seafoam Teal)
| Token | Wert |
| :--- | :--- |
| `--clr-accent` | `#2a9d8f` |
| `--clr-parchment` | `#e8eef6` |
| `--clr-linen` | `#d4deec` |
| `--clr-bark` | `#0d2040` |

#### Windwalkers (Amethyst Violet)
| Token | Wert |
| :--- | :--- |
| `--clr-accent` | `#7a6db0` |
| `--clr-parchment` | `#eeeef6` |
| `--clr-linen` | `#e0e0ee` |
| `--clr-bark` | `#1e1e35` |

---

## 3. Abstände (Spacing Scale)

| Token | Wert | Typischer Einsatz |
| :--- | :--- | :--- |
| `--space-xs` | `0.4rem` | Icon-Gaps, kleine Innen­abstände |
| `--space-sm` | `0.75rem` | Kompakte Abstände (z.B. Formular­felder) |
| `--space-md` | `1.25rem` | Standard­abstände zwischen Elementen |
| `--space-lg` | `2rem` | Abschnitte, Karten-Padding |
| `--space-xl` | `3.5rem` | Seiten­bereiche, Hero-Padding |
| `--space-2xl` | `6rem` | Grosse Sektions­abstände |

---

## 4. Eck­radien

| Token | Wert | Einsatz |
| :--- | :--- | :--- |
| `--radius-sm` | `4px` | Buttons, Inputs, Badges |
| `--radius-md` | `10px` | Karten, Modale, Tabellen |
| `--radius-lg` | `18px` | Grosse Karten, Featured Elemente |

---

## 5. Schatten

| Token | Wert | Einsatz |
| :--- | :--- | :--- |
| `--shadow-card` | `0 2px 12px rgba(44,31,15,0.10), 0 1px 3px rgba(44,31,15,0.06)` | Standard-Karten­schatten |
| `--shadow-hover` | `0 8px 32px rgba(44,31,15,0.18), 0 2px 8px rgba(44,31,15,0.10)` | Hover-Zustand von Karten |

---

## 6. Buttons

| Variante | Klasse | Hintergrund | Text | Einsatz |
| :--- | :--- | :--- | :--- | :--- |
| Primary | `.btn--primary` | `--clr-accent` | `--clr-white` | Haupt-CTAs (Kaufen, Bestellen, Senden) |
| Outline | `.btn--outline` | transparent | `--clr-accent` | Sekundäre Aktionen (Zurück, Mehr) |

Alle Buttons verwenden `font-family: Barlow`, `font-weight: 600`, `font-size: 0.875rem`, Grossbuchstaben und `letter-spacing: 0.04em`.

---

## 7. Layout

| Token | Wert |
| :--- | :--- |
| `--max-width` | `1200px` |
| `--nav-height` | `68px` |

**Breakpoints:**

| Name | Breite | Verhalten |
| :--- | :--- | :--- |
| Desktop | > 900px | Mehrspaltige Grids, Side-by-Side Layouts |
| Tablet | 600–900px | Reduzierte Spalten­anzahl |
| Mobile | < 600px | Einspaltig, gestapelte Layouts |
