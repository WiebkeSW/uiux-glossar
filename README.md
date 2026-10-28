# Skillsprinters Glossar

Zwei durchsuchbare Glossare — UI/UX-Begriffe mit live bedienbaren Mini-Beispielen und alle Begriffe der Digitalisierungsmanager-Weiterbildung (Kurs_Glossar.pdf) — plus ein Karteikasten-Quiz über beide. React-App.

**Live:** https://wiebkesw.github.io/uiux-glossar/

## Funktionen

### UI/UX-Glossar
- Volltextsuche über Begriff, Erklärung, Kategorie und technische Stichwörter (z. B. „Radio Button“ findet „Tab / Reiter“)
- Filterbar nach 6 Kategorien: Layout & Navigation, Bausteine & Formulare, Feedback & Status, Interaktion, Design-Prinzipien, Daten & Prozess
- Jeder Begriff hat ein echtes, klickbares Mini-Beispiel (Tabs, Toggle, Drawer, Accordion, Drag & Drop, Cookie-Banner, Radio Button, …)

### Kursbegriffe
- 213 Begriffe aus allen Kursmodulen der Digitalisierungsmanager-Weiterbildung, ohne Modul-/Schwierigkeits-Kennzeichnung (rein inhaltlich)
- Bei Abkürzungen (API, RAG, KPI, …) steht die Langform direkt unter dem Begriff
- Quelle: `Kurs_Glossar.pdf`, Datensatz übernommen aus dem bestehenden Glossar-Millionenquiz

### Karteikasten-Quiz
- Flottes Multiple-Choice-Quiz über **beide** Glossare gemeinsam, 10 zufällige Begriffe pro Runde
- Eigene visuelle Identität: gelochte Karteikarte, Schreibmaschinen-Typografie, Antwort antippen → Stempel-Effekt ("Richtig!"/"Daneben"), Karte fliegt weg, nächste rutscht nach
- Abkürzungsfragen zeigen Kürzel + Langform, die 4 Antwortoptionen sind Erklärungen — Distraktoren stammen bewusst nur aus dem Konzeptbegriffs-Pool, nie aus anderen Abkürzungs-Definitionen
- Kein Spaced Repetition, keine Selbsteinschätzung, kein Badge, kein Streak — jede Runde ist in sich abgeschlossen

## Tech-Stack

React + Vite, keine weiteren Laufzeit-Abhängigkeiten. Die frühere reine HTML/CSS/JS-Version des UI/UX-Glossars liegt zu Referenzzwecken unter `legacy/`.

## Lokal starten

```bash
npm install
npm run dev
```

## Struktur

- `src/data/terms.js` — UI/UX-Glossar-Daten (Begriff, Erklärung, Kategorie, Mini-Demo-HTML)
- `src/data/courseTerms.js` — Kursbegriffe (Begriff, Erklärung, optional Langform bei Abkürzungen)
- `src/data/allTerms.js` — kombinierte Begriffsliste für das Quiz
- `src/GlossarView.jsx` — UI/UX Such-/Filter-Ansicht
- `src/CourseGlossarView.jsx` — Kursbegriffe Such-/Filter-Ansicht
- `src/KartenQuizView.jsx` — Karteikasten-Quiz (Rundenlogik, Kartenanimation, Stempel-Feedback)
- `src/quizEngine.js` — Rundenaufbau: Fragenauswahl, Distraktor-Logik
- `src/quizStyles.css` — eigenständige visuelle Welt des Quiz (Schreibtisch/Karteikarte/Stempel)
- `src/demoInteractions.js` — Event-Delegation für die interaktiven Mini-Demos
- `legacy/` — ursprüngliche Vanilla-JS-Version des UI/UX-Glossars (Referenz, nicht mehr aktiv genutzt)
