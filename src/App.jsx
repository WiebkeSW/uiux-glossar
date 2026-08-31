import { useEffect, useState } from 'react';
import GlossarView from './GlossarView.jsx';
import CourseGlossarView from './CourseGlossarView.jsx';
import KartenQuizView from './KartenQuizView.jsx';
import { installDemoInteractions } from './demoInteractions.js';

export default function App() {
  const [view, setView] = useState('glossar');

  useEffect(() => installDemoInteractions(), []);

  return (
    <div className="page">
      <header>
        <div className="title-block">
          <h1>Skillsprinters Glossar</h1>
          <p className="sub">UI/UX-Begriffe mit live bedienbaren Mini-Beispielen und alle Kursbegriffe der Digitalisierungsmanager-Weiterbildung — plus ein Karteikasten-Quiz über beide.</p>
        </div>
        <span className="pill"><span className="dot"></span>Wiebke Wick · wiebke.wick@wsb-service.com</span>
      </header>

      <div className="view-switch">
        <button className={view === 'glossar' ? 'active' : ''} onClick={() => setView('glossar')}>UI/UX</button>
        <button className={view === 'kurs' ? 'active' : ''} onClick={() => setView('kurs')}>Kursbegriffe</button>
        <button className={view === 'quiz' ? 'active' : ''} onClick={() => setView('quiz')}>Quiz</button>
      </div>

      {view === 'glossar' && <GlossarView />}
      {view === 'kurs' && <CourseGlossarView />}
      {view === 'quiz' && <KartenQuizView />}

      <footer>
        <span>Wiebke Wick</span>
        <span>Skillsprinters Glossar · zum Nachschlagen und Üben</span>
      </footer>
    </div>
  );
}
