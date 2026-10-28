// Rundenlogik für das Karteikasten-Quiz. Kein Spaced Repetition, keine Selbst-
// einschätzung — jede Runde zieht zufällige Begriffe aus dem gemeinsamen Pool
// (UI/UX + Kursbegriffe) und baut Multiple-Choice-Fragen mit 4 Optionen.
export const ROUND_SIZE = 10;

// Bunte Karteireiter-Farben, reihum vergeben — ein Begriff pro Farbe pro Runde,
// wie farbige Trennkarten in einem echten Karteikasten.
export const TAB_COLORS = ['#E8604C', '#1E8A8A', '#D9A22D', '#8B4B8F', '#2E86C9', '#4F9A4F'];

const QUESTION_TEMPLATES = [
  (t) => `Was bedeutet „${t}“?`,
  (t) => `Was ist „${t}“?`,
  (t) => `Wie lässt sich „${t}“ am besten beschreiben?`,
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr, n) {
  return shuffle(arr).slice(0, n);
}

export function buildRound(pool, size = ROUND_SIZE) {
  const chosen = pick(pool, Math.min(size, pool.length));
  return chosen.map((term, i) => {
    const isAbbr = !!term.long;
    const distractorSource = isAbbr ? pool.filter((t) => !t.long && t.id !== term.id) : pool.filter((t) => t.id !== term.id);
    const wrongTexts = pick(distractorSource, 3).map((t) => t.d);
    const options = shuffle([{ text: term.d, ok: true }, ...wrongTexts.map((text) => ({ text, ok: false }))]);
    const template = QUESTION_TEMPLATES[Math.floor(Math.random() * QUESTION_TEMPLATES.length)];
    return {
      id: term.id,
      abbr: isAbbr ? term.t : null,
      long: isAbbr ? term.long : null,
      question: isAbbr ? null : template(term.t),
      demo: term.demo || null,
      options,
      tab: TAB_COLORS[i % TAB_COLORS.length],
    };
  });
}
