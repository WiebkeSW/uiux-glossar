import { useState } from 'react';
import './quizStyles.css';
import { LEARNABLE_TERMS } from './data/allTerms.js';
import { buildRound } from './quizEngine.js';

const LETTERS = 'ABCD';
const CONFETTI_COLORS = ['#E8604C', '#1E8A8A', '#D9A22D', '#8B4B8F', '#2E86C9', '#4F9A4F'];

function Confetti() {
  const pieces = Array.from({ length: 16 }, (_, i) => ({
    left: 8 + Math.random() * 84,
    delay: Math.random() * 0.12,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    rotate: Math.random() * 360,
  }));
  return (
    <div className="quiz-confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="quiz-confetti-piece"
          style={{ left: `${p.left}%`, background: p.color, animationDelay: `${p.delay}s`, transform: `rotate(${p.rotate}deg)` }}
        />
      ))}
    </div>
  );
}

export default function KartenQuizView() {
  const [round, setRound] = useState(null); // array of question cards
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null); // {correctIdx, pickedIdx}
  const [transition, setTransition] = useState(''); // '', 'leaving', 'entering'

  function start() {
    setRound(buildRound(LEARNABLE_TERMS));
    setIdx(0);
    setScore(0);
    setAnswered(null);
    setTransition('');
  }

  function onAnswer(optIdx) {
    if (answered) return;
    const q = round[idx];
    const correctIdx = q.options.findIndex((o) => o.ok);
    const isOk = optIdx === correctIdx;
    if (isOk) setScore((s) => s + 1);
    setAnswered({ correctIdx, pickedIdx: optIdx });
  }

  function next() {
    setTransition('leaving');
    setTimeout(() => {
      setIdx((i) => i + 1);
      setAnswered(null);
      setTransition('entering');
      requestAnimationFrame(() => requestAnimationFrame(() => setTransition('')));
    }, 220);
  }

  if (!round) {
    return (
      <div className="quiz-world">
        <div className="quiz-intro">
          <h2>Karteikasten-Quiz</h2>
          <p>10 zufällige Begriffe aus UI/UX und den Kursmodulen, vier Antworten zur Wahl. Antippen, stempeln, in Ruhe nachlesen, weiter wenn du bereit bist.</p>
          <button className="draw-btn" onClick={start}>🗂️ Karten ziehen</button>
        </div>
      </div>
    );
  }

  const done = idx >= round.length;
  const current = !done ? round[idx] : null;
  const uid = current ? current.id.replace(/[^a-zA-Z0-9]/g, '') + '-quiz' : '';
  const demoHtml = current?.demo ? current.demo.split('{{uid}}').join(uid) : null;
  const isCorrectAnswer = answered && answered.pickedIdx === answered.correctIdx;
  const isLast = idx === (round?.length ?? 0) - 1;

  return (
    <div className="quiz-world">
      <div className="quiz-label">Karteikasten-Quiz</div>
      <div className="quiz-stage">
        <div className="quiz-box-slot" />
        {done ? (
          <div className="quiz-card quiz-end-card">
            <div className="quiz-end-tally">{score} / {round.length}</div>
            <div className="quiz-end-sub">
              Kasten durchgestempelt. {score === round.length ? 'Alle Karten richtig — sauber!' : 'Nochmal ziehen und die restlichen Begriffe festigen.'}
            </div>
            <button className="quiz-again-btn" onClick={start}>Neue Runde ziehen</button>
          </div>
        ) : (
          <div className={`quiz-card${transition ? ' ' + transition : ''}`} style={{ '--tab': current.tab }}>
            <div className="quiz-tab" />
            {answered && (
              <div className={`quiz-stamp ${isCorrectAnswer ? 'ok' : 'no'}`}>
                {isCorrectAnswer ? 'Richtig!' : 'Daneben'}
              </div>
            )}
            {isCorrectAnswer && <Confetti />}

            <div className="quiz-card-left">
              <div className="quiz-progress-row">
                <span>Karte {idx + 1} / {round.length}</span>
                <span className="quiz-score">{score} richtig</span>
              </div>
              <div className="quiz-term-block">
                {current.abbr ? (
                  <>
                    <div className="quiz-term-abbr">{current.abbr}</div>
                    <div className="quiz-term-long">{current.long}</div>
                  </>
                ) : (
                  <div className="quiz-term-question">{current.question}</div>
                )}
              </div>
            </div>

            <div className="quiz-card-right">
              <div className="quiz-options">
                {current.options.map((o, n) => {
                  let cls = 'quiz-opt';
                  if (answered) {
                    if (n === answered.correctIdx) cls += ' correct';
                    else if (n === answered.pickedIdx) cls += ' wrong';
                  }
                  return (
                    <button key={n} className={cls} disabled={!!answered} onClick={() => onAnswer(n)}>
                      <span className="quiz-lbl">
                        {answered && n === answered.correctIdx ? '✓' : answered && n === answered.pickedIdx ? '✗' : `${LETTERS[n]})`}
                      </span>
                      <span>{o.text}</span>
                      {answered && n === answered.correctIdx && <span className="quiz-correct-tag">richtige Antwort</span>}
                    </button>
                  );
                })}
              </div>
              {answered && demoHtml && (
                <div className="quiz-demo-reveal demo-stage" dangerouslySetInnerHTML={{ __html: demoHtml }} />
              )}
              {answered && (
                <button className="quiz-next-btn" onClick={next}>{isLast ? 'Ergebnis ansehen →' : 'Weiter →'}</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
