# UI/UX Glossar

Durchsuchbares UI/UX-Glossar mit live bedienbaren Mini-Beispielen zu jedem Begriff — als schnelle Referenz für App- und Dashboard-Arbeit.

**Live:** https://wiebkesw.github.io/uiux-glossar/

## Funktionen

- Volltextsuche über Begriff, Erklärung, Kategorie und technische Stichwörter (z. B. „Radio Button“ findet „Tab / Reiter“)
- Filterbar nach 6 Kategorien: Layout & Navigation, Bausteine & Formulare, Feedback & Status, Interaktion, Design-Prinzipien, Daten & Prozess
- Jeder Begriff hat ein echtes, klickbares Mini-Beispiel (Tabs, Toggle, Drawer, Accordion, Drag & Drop, Cookie-Banner, Radio Button, …)
- Responsives Kachel-Grid, hell/dunkel-Theme
- Keine Abhängigkeiten, kein Build-Schritt — reines HTML/CSS/JS

## Lokal öffnen

`index.html` direkt im Browser öffnen, oder mit einem einfachen lokalen Server:

```bash
npx serve .
```

## Struktur

- `index.html` — Seitenstruktur
- `style.css` — alle Styles inkl. Farbpalette (CSS-Variablen) und Dark-Mode
- `app.js` — Glossar-Daten, Rendering, Such-/Filterlogik, Interaktions-Handler für die Mini-Beispiele
