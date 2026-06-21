# Meisterwerk SHTML-Regelwerk

## Ziel dieses Regelwerks

Dieses Dokument beschreibt die verbindliche Struktur für das Meisterwerk-Webprojekt.

Das Projekt soll als schnelle, saubere und erweiterbare SHTML-Webseite aufgebaut werden. Ziel ist eine conversionstarke Webseite für lokale Anfragen aus den Bereichen Entrümpelung, Haushaltsauflösung und Umzug.

Die Webseite soll später problemlos erweitert werden können mit:

- Leistungsseiten
- lokalen SEO-Seiten
- Blogartikeln
- Bildern und Medien
- wiederverwendbaren globalen Bausteinen
- sauberer Navigation
- globalem Header und Footer

## Technische Grundlage

Das Projekt verwendet:

- `.shtml` für alle Hauptseiten
- Server Side Includes für wiederverwendbare Bereiche
- normales HTML
- CSS
- JavaScript
- keine React-App
- kein Framework
- keine Datenbank

Wichtig: SHTML-Includes funktionieren nur auf einem Server, der Server Side Includes unterstützt, zum Beispiel klassisches Apache-Hosting. Lokal mit einfachem Live Server werden SSI-Includes oft nicht verarbeitet.

## Grundprinzip

Header und Footer werden nicht auf jeder Seite einzeln gepflegt.

Stattdessen gibt es globale Include-Dateien:

```text
/includes/header.shtml
/includes/footer.shtml
```

Jede Seite bindet diese Dateien ein.

Dadurch muss der Header oder Footer später nur einmal geändert werden, und alle Seiten übernehmen die Änderung automatisch.

## Empfohlene Projektstruktur

```text
meisterwerk/
├─ index.shtml
├─ entruempelung.shtml
├─ haushaltsaufloesung.shtml
├─ umzug.shtml
├─ kontakt.shtml
├─ impressum.shtml
├─ datenschutz.shtml
│
├─ blog/
│  ├─ index.shtml
│  ├─ entruempelung-ingolstadt.shtml
│  ├─ haushaltsaufloesung-kosten.shtml
│  └─ umzug-checkliste.shtml
│
├─ includes/
│  ├─ header.shtml
│  ├─ footer.shtml
│  ├─ navigation.shtml
│  ├─ cta-box.shtml
│  ├─ trust-section.shtml
│  └─ lead-form.shtml
│
├─ assets/
│  ├─ css/
│  │  ├─ style.css
│  │  ├─ responsive.css
│  │  └─ blog.css
│  │
│  ├─ js/
│  │  ├─ main.js
│  │  └─ form.js
│  │
│  ├─ img/
│  │  ├─ logo/
│  │  │  ├─ meisterwerk-logo.svg
│  │  │  └─ meisterwerk-logo.png
│  │  │
│  │  ├─ hero/
│  │  │  ├─ entruempelung-hero.webp
│  │  │  └─ umzug-hero.webp
│  │  │
│  │  ├─ services/
│  │  │  ├─ entruempelung.webp
│  │  │  ├─ haushaltsaufloesung.webp
│  │  │  └─ umzug.webp
│  │  │
│  │  └─ blog/
│  │     ├─ entruempelung-ingolstadt/
│  │     │  ├─ hero.webp
│  │     │  ├─ wohnung-vorher.webp
│  │     │  └─ wohnung-nachher.webp
│  │     │
│  │     └─ umzug-checkliste/
│  │        ├─ hero.webp
│  │        └─ kartons.webp
│  │
│  └─ icons/
│     ├─ phone.svg
│     ├─ check.svg
│     └─ location.svg
│
├─ content/
│  ├─ projektwissen.md
│  ├─ seitenstruktur.md
│  ├─ blog-themen.md
│  └─ seo-keywords.md
│
├─ templates/
│  ├─ page-template.shtml
│  └─ blog-template.shtml
│
├─ robots.txt
├─ sitemap.xml
└─ README.md
```

## Globale Includes

Alle wiederverwendbaren Bausteine liegen im Ordner:

```text
/includes/
```

Diese Dateien sind keine eigenen Seiten. Sie werden nur in andere Seiten eingebunden.

Wichtige Include-Dateien:

```text
/includes/header.shtml
/includes/footer.shtml
/includes/navigation.shtml
/includes/cta-box.shtml
/includes/trust-section.shtml
/includes/lead-form.shtml
```

## Header global einbinden

Der Header wird auf jeder Seite mit folgendem SSI-Befehl eingebunden:

```html
<!--#include virtual="/includes/header.shtml" -->
```

Wichtig: Es wird ein absoluter Pfad ab Website-Wurzel verwendet.

Richtig:

```html
<!--#include virtual="/includes/header.shtml" -->
```

Falsch:

```html
<!--#include file="../includes/header.shtml" -->
```

Der absolute Pfad funktioniert auch in Unterordnern wie `/blog/` sauber weiter.

## Footer global einbinden

Der Footer wird auf jeder Seite mit folgendem SSI-Befehl eingebunden:

```html
<!--#include virtual="/includes/footer.shtml" -->
```

Auch hier gilt: absolute Pfade verwenden.

## Head-Bereich bleibt pro Seite individuell

Der `<head>`-Bereich soll nicht vollständig global gemacht werden.

Grund: Jede Seite braucht eigene SEO-Daten.

Jede Seite benötigt individuell:

- Title
- Meta Description
- Canonical URL
- Open Graph Angaben, falls gewünscht
- individuelle strukturierte Daten, falls nötig

Deshalb gilt:

```text
<head> = pro Seite individuell
<header> = global
<footer> = global
```

## Beispiel für eine normale SHTML-Seite

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Meisterwerk – Entrümpelung & Umzug</title>
  <meta name="description" content="Meisterwerk unterstützt Sie bei Entrümpelung, Haushaltsauflösung und Umzug. Jetzt kostenlose Anfrage stellen.">

  <link rel="stylesheet" href="/assets/css/style.css">
  <link rel="stylesheet" href="/assets/css/responsive.css">
</head>

<body>

  <!--#include virtual="/includes/header.shtml" -->

  <main>
    <section class="hero">
      <div class="container">
        <h1>Entrümpelung und Umzug einfach erledigen lassen</h1>
        <p>Meisterwerk hilft schnell, zuverlässig und regional.</p>
        <a href="/kontakt.shtml" class="btn-primary">Kostenlose Anfrage stellen</a>
      </div>
    </section>
  </main>

  <!--#include virtual="/includes/footer.shtml" -->

  <script src="/assets/js/main.js"></script>
</body>
</html>
```

## Beispiel für /includes/header.shtml

```html
<header class="site-header">
  <div class="container header-inner">

    <a href="/index.shtml" class="logo" aria-label="Meisterwerk Startseite">
      <img src="/assets/img/logo/meisterwerk-logo.png" alt="Meisterwerk Logo">
    </a>

    <nav class="main-nav" aria-label="Hauptnavigation">
      <a href="/index.shtml">Start</a>
      <a href="/entruempelung.shtml">Entrümpelung</a>
      <a href="/haushaltsaufloesung.shtml">Haushaltsauflösung</a>
      <a href="/umzug.shtml">Umzug</a>
      <a href="/blog/index.shtml">Ratgeber</a>
      <a href="/kontakt.shtml">Kontakt</a>
    </nav>

    <a href="tel:+49XXXXXXXXXX" class="header-phone">
      Jetzt anrufen
    </a>

  </div>
</header>
```

## Beispiel für /includes/footer.shtml

```html
<footer class="site-footer">
  <div class="container footer-inner">

    <div class="footer-col">
      <strong>Meisterwerk</strong>
      <p>Entrümpelung, Haushaltsauflösung und Umzug aus einer Hand.</p>
    </div>

    <div class="footer-col">
      <strong>Leistungen</strong>
      <a href="/entruempelung.shtml">Entrümpelung</a>
      <a href="/haushaltsaufloesung.shtml">Haushaltsauflösung</a>
      <a href="/umzug.shtml">Umzug</a>
    </div>

    <div class="footer-col">
      <strong>Kontakt</strong>
      <a href="tel:+49XXXXXXXXXX">Jetzt anrufen</a>
      <a href="/kontakt.shtml">Anfrage stellen</a>
    </div>

    <div class="footer-col">
      <strong>Rechtliches</strong>
      <a href="/impressum.shtml">Impressum</a>
      <a href="/datenschutz.shtml">Datenschutz</a>
    </div>

  </div>
</footer>
```

## Seitenstruktur

### Startseite

Datei:

```text
/index.shtml
```

Aufgabe:

Die Startseite soll Besucher schnell verstehen lassen, was Meisterwerk macht und warum sie eine Anfrage stellen sollten.

Empfohlene Sektionen:

- Header
- Hero mit starkem Nutzenversprechen
- Leistungen
- Warum Meisterwerk?
- Ablauf in 3 Schritten
- Vertrauenselemente
- FAQ
- Anfrageformular oder CTA
- Footer

### Leistungsseiten

Empfohlene Dateien:

```text
/entruempelung.shtml
/haushaltsaufloesung.shtml
/umzug.shtml
```

Jede Leistungsseite soll auf eine konkrete Suchintention optimiert werden.

Mögliche spätere SEO-Seiten:

```text
/entruempelung-ingolstadt.shtml
/haushaltsaufloesung-ingolstadt.shtml
/wohnungsaufloesung-ingolstadt.shtml
/kellerentruempelung-ingolstadt.shtml
/dachbodenentruempelung-ingolstadt.shtml
/umzug-ingolstadt.shtml
```

### Kontaktseite

Datei:

```text
/kontakt.shtml
```

Inhalte:

- kurze Einleitung
- Telefonnummer
- Anfrageformular
- Hinweis zur kostenlosen Anfrage
- Vertrauenselemente

### Rechtliche Seiten

Dateien:

```text
/impressum.shtml
/datenschutz.shtml
```

Diese Seiten müssen im Footer verlinkt sein.

## Blogstruktur

Blog-Übersicht:

```text
/blog.shtml
```

Die URL `/blog` ist die zentrale Blog-Übersichtsseite. Die Datei liegt als `blog.shtml` im Wurzelverzeichnis (nicht als `index.shtml` in einem Unterordner). Hier werden alle vorhandenen Blogartikel angezeigt.

Blogartikel liegen als einzelne `.shtml`-Dateien im `/blog/`-Ordner. Es werden keine Unterordner pro Artikel angelegt.

### Regel: Blog-Übersicht automatisch aktualisieren

Wenn ein neuer Blogartikel erstellt wird, muss die Blog-Übersichtsseite (`/blog/index.shtml`) automatisch mit aktualisiert werden. Der neue Artikel wird als Karte in die Übersicht eingefügt.

### Sortierung und Darstellung

Die Blog-Übersichtsseite bietet dem Besucher folgende Sortiermöglichkeiten:

- **Neueste zuerst** (chronologisch, neu nach alt) – Standardsortierung
- **Beliebteste zuerst** (nach Beliebtheit/Relevanz)
- **Kachelansicht** (kompakte Darstellung, Karten näher beieinander)

Alle Blogartikel müssen auf der Übersichtsseite sichtbar sein. Es werden keine Artikel ausgeblendet oder ausgelassen.

### Einzelne Blogartikel

Einzelne Blogartikel liegen unter:

```text
/blog/thema-des-artikels.shtml
```

Beispiele:

```text
/blog/entruempelung-ingolstadt.shtml
/blog/haushaltsaufloesung-kosten.shtml
/blog/umzug-checkliste.shtml
```

Jeder Blogartikel soll enthalten:

- genau eine H1
- mehrere H2-Abschnitte
- kurze Absätze
- interne Links zu passenden Leistungsseiten
- CTA-Box
- FAQ-Bereich
- passende Bilder mit Alt-Texten

## Template für Blogartikel

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Blogartikel Titel | Meisterwerk</title>
  <meta name="description" content="Kurze Meta Description für den Blogartikel.">

  <link rel="stylesheet" href="/assets/css/style.css">
  <link rel="stylesheet" href="/assets/css/blog.css">
</head>

<body>

  <!--#include virtual="/includes/header.shtml" -->

  <main class="blog-article">
    <article>
      <header class="blog-hero">
        <div class="container">
          <p class="blog-category">Ratgeber</p>
          <h1>Blogartikel Überschrift</h1>
          <p>Kurze Einleitung mit klarem Nutzen.</p>
        </div>
      </header>

      <section class="blog-content">
        <div class="container">
          <h2>Erster Abschnitt</h2>
          <p>Textinhalt.</p>

          <h2>Zweiter Abschnitt</h2>
          <p>Textinhalt.</p>

          <!--#include virtual="/includes/cta-box.shtml" -->

          <h2>Häufige Fragen</h2>
          <p>Antworten auf häufige Fragen.</p>
        </div>
      </section>
    </article>
  </main>

  <!--#include virtual="/includes/footer.shtml" -->

  <script src="/assets/js/main.js"></script>
</body>
</html>
```

## Bilder und Medien

Alle Bilder liegen unter:

```text
/assets/img/
```

Bilder werden nach Zweck sortiert:

```text
/assets/img/logo/
/assets/img/hero/
/assets/img/services/
/assets/img/blog/
```

Für Blogartikel bekommt jeder Artikel einen eigenen Bilderordner.

Beispiel:

```text
/assets/img/blog/entruempelung-ingolstadt/
├─ hero.webp
├─ wohnung-vorher.webp
└─ wohnung-nachher.webp
```

## Regeln für Bilddateien

Bilddateien sollen:

- keine Leerzeichen enthalten
- keine Umlaute enthalten
- komplett kleingeschrieben sein
- Wörter mit Bindestrich trennen
- bevorzugt als `.webp` gespeichert werden
- beschreibende Dateinamen haben

Gute Beispiele:

```text
entruempelung-ingolstadt-wohnung.webp
haushaltsaufloesung-vorher-nachher.webp
umzug-kartons-transport.webp
```

Schlechte Beispiele:

```text
Bild 1.jpg
IMG_3829.png
Wohnung Räumung neu.jpg
```

## URL- und Dateinamen-Regeln

Alle Seiten sollen kleingeschrieben werden.

Keine Leerzeichen verwenden.

Keine Umlaute verwenden:

```text
ä = ae
ö = oe
ü = ue
ß = ss
```

Richtig:

```text
haushaltsaufloesung.shtml
entruempelung-ingolstadt.shtml
umzug-checkliste.shtml
```

Falsch:

```text
Haushaltsauflösung.shtml
Entrümpelung Ingolstadt.shtml
Umzug_Checkliste.shtml
```

## CSS-Regeln

Globale Styles liegen in:

```text
/assets/css/style.css
```

Responsive Anpassungen liegen in:

```text
/assets/css/responsive.css
```

Blog-spezifische Styles liegen in:

```text
/assets/css/blog.css
```

CSS-Dateien werden absolut eingebunden:

```html
<link rel="stylesheet" href="/assets/css/style.css">
<link rel="stylesheet" href="/assets/css/responsive.css">
```

## JavaScript-Regeln

Globale Skripte liegen in:

```text
/assets/js/main.js
```

Formular-Skripte liegen in:

```text
/assets/js/form.js
```

JS-Dateien werden am Ende des Bodys eingebunden:

```html
<script src="/assets/js/main.js"></script>
```

## SEO-Regeln

Jede Seite braucht:

- genau eine H1
- klare H2-Struktur
- lokalen Bezug
- sprechenden Dateinamen
- individuellen Title
- individuelle Meta Description
- interne Links
- passende Bild-Alt-Texte
- sichtbaren CTA
- mobile Optimierung

## Conversion-Regeln

Jede wichtige Seite soll den Besucher zur Anfrage führen.

Wichtige CTAs:

```text
Kostenlose Anfrage stellen
Jetzt anrufen
Kostenlose Besichtigung anfragen
Unverbindliches Angebot erhalten
```

CTA-Bereiche sollen mehrfach auf langen Seiten erscheinen:

- im Hero
- nach den Leistungen
- nach dem Ablauf
- am Seitenende

## Wichtige Regel für KI-Arbeit in VS Code

Wenn mit ChatGPT, Claude oder einer anderen KI im VS-Code-Projekt gearbeitet wird, soll die KI dieses Regelwerk beachten.

Anweisung an die KI:

```text
Nutze dieses Regelwerk als verbindliche Projektgrundlage.
Erstelle keine React-App.
Nutze keine Frameworks.
Arbeite mit SHTML, CSS und JavaScript.
Header und Footer müssen global über SSI-Includes eingebunden werden.
Der Head-Bereich bleibt pro Seite individuell für SEO.
Nutze absolute Pfade ab Website-Wurzel.
Halte die Ordnerstruktur sauber ein.
```

## Zusammenfassung der wichtigsten Regeln

```text
1. Alle Seiten verwenden .shtml.
2. Header liegt global unter /includes/header.shtml.
3. Footer liegt global unter /includes/footer.shtml.
4. Header und Footer werden über SSI eingebunden.
5. Includes immer mit absolutem Pfad einbinden.
6. Der Head-Bereich bleibt pro Seite individuell.
7. Bilder liegen sauber sortiert unter /assets/img/.
8. CSS liegt unter /assets/css/.
9. JavaScript liegt unter /assets/js/.
10. Blogartikel liegen unter /blog/.
11. Dateinamen sind kleingeschrieben, ohne Leerzeichen und ohne Umlaute.
12. Jede Seite braucht eine klare SEO- und Conversion-Struktur.
```
