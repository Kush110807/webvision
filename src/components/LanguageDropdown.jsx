import { useState } from 'react';
import { Languages } from 'lucide-react';
import { LANGUAGES } from '../data/languages.js';

// UI only: the original uses the external Bhashini plugin to translate the page.
export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const pick = (code) => { setLang(code); setOpen(false); };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      Language:
      <div className="bhashini-dropdown" title="Translate this page! (demo: no translation)">
        <button type="button" className="bhashini-dropdown-btn" aria-label="Language Translator" aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((o) => !o)}>
          <Languages size={28} color="#1D0A69" aria-hidden="true" />
        </button>
        {open && (
          <ul className="bhashini-dropdown-content" role="listbox" aria-label="Select language">
            {LANGUAGES.map((l) => (
              <li key={l.code} role="option" tabIndex={0} aria-selected={lang === l.code}
                onClick={() => pick(l.code)} onKeyDown={(e) => e.key === 'Enter' && pick(l.code)}>
                {l.name} {l.native && <span lang={l.code}>({l.native})</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
