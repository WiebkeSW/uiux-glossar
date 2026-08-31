import { useMemo, useState } from 'react';
import { ALL_TERMS, CATEGORIES, CAT_COLORS } from './data/terms.js';

export default function GlossarView() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('Alle');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_TERMS.filter((term) => {
      const matchesCat = activeCat === 'Alle' || term.c === activeCat;
      const kw = (term.kw || '').toLowerCase();
      const matchesQ = !q || term.t.toLowerCase().includes(q) || term.d.toLowerCase().includes(q) || term.c.toLowerCase().includes(q) || kw.includes(q);
      return matchesCat && matchesQ;
    });
  }, [query, activeCat]);

  return (
    <>
      <div className="controls">
        <div className="search-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            type="text"
            placeholder="Begriff suchen … z. B. „Drawer“, „Toggle“, „Skeleton“"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="chips">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`chip${c === activeCat ? ' active' : ''}`}
              style={CAT_COLORS[c] ? { '--cat': CAT_COLORS[c] } : undefined}
              onClick={() => setActiveCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="count-line">{filtered.length} von {ALL_TERMS.length} Begriffen</div>

      {filtered.length === 0 ? (
        <div className="empty">Kein Treffer. Versuch einen anderen Begriff.</div>
      ) : (
        <div className="grid">
          {filtered.map((term) => {
            const uid = term.id.replace(/[^a-zA-Z0-9]/g, '');
            const demo = term.demo.split('{{uid}}').join(uid);
            const catColor = CAT_COLORS[term.c];
            return (
              <div className="term-card" key={term.id} style={catColor ? { '--cat': catColor } : undefined}>
                <div className="term-head">
                  <span className="term-name">{term.t}</span>
                  <span className="cat-tag">{term.c}</span>
                </div>
                <div className="demo-stage" dangerouslySetInnerHTML={{ __html: demo }} />
                {term.note && <div className="demo-note">{term.note}</div>}
                <div className="term-def">{term.d}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
