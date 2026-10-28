import { useMemo, useState } from 'react';
import { COURSE_TERMS } from './data/courseTerms.js';

export default function CourseGlossarView() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COURSE_TERMS;
    return COURSE_TERMS.filter((term) =>
      term.t.toLowerCase().includes(q) || term.d.toLowerCase().includes(q) || (term.long || '').toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <div className="controls">
        <div className="search-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            type="text"
            placeholder="Kursbegriff suchen … z. B. „RAG“, „Kanban“, „DSGVO“"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="count-line">{filtered.length} von {COURSE_TERMS.length} Begriffen</div>

      {filtered.length === 0 ? (
        <div className="empty">Kein Treffer. Versuch einen anderen Begriff.</div>
      ) : (
        <div className="grid">
          {filtered.map((term) => (
            <div className="term-card" key={term.id}>
              <div className="term-head">
                <span className="term-name">{term.t}</span>
              </div>
              {term.long && <div className="term-long-inline">{term.long}</div>}
              <div className="term-def">{term.d}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
