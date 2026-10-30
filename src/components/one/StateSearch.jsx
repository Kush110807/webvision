import { useId, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { STATES } from '../../data/states.js';

// Searchable state/UT picker: type to filter, click to select, clear to reset.
export default function StateSearch({ value, onChange }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const id = useId();
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const selected = STATES.find((s) => s.code === value) || null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STATES;
    return STATES.filter(
      (s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
    );
  }, [query]);

  const pick = (code) => {
    onChange(code);
    setOpen(false);
    setQuery('');
  };

  const clear = () => {
    onChange('');
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="so-state-search" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
      <label className="so-field-label" htmlFor={`${id}-input`}>
        Search and select your State or Union Territory
      </label>

      <div className="so-state-input-wrap">
        <Search size={16} aria-hidden="true" className="so-state-input-icon" />
        <input
          id={`${id}-input`}
          ref={inputRef}
          type="text"
          className="so-input"
          placeholder="Type to search, e.g. Delhi"
          value={open ? query : selected ? selected.name : ''}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            onChange('');
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault();
              setOpen(true);
              setActive((i) => Math.max(0, Math.min(results.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1))));
            }
            if (e.key === 'Enter' && open) {
              e.preventDefault();
              if (results[active]) pick(results[active].code);
            }
            if (e.key === 'Escape') { setOpen(false); setQuery(''); }

          }}
          aria-expanded={open}
          role="combobox"
          aria-autocomplete="list"
          aria-activedescendant={open && results[active] ? `${id}-${results[active].code}` : undefined}
          aria-controls={`${id}-list`}
          autoComplete="off"
        />
        {selected && !open && (
          <button type="button" className="so-state-clear" onClick={clear} aria-label="Clear selected state">
            <X size={15} />
          </button>
        )}
      </div>

      {open && (
        <ul id={`${id}-list`} className="so-state-list" role="listbox" aria-label="States and Union Territories">
          {results.length === 0 && (
            <li className="so-state-empty">No state or Union Territory matches “{query}”. Try another spelling.</li>
          )}
          {results.map((s, index) => (
            <li key={s.code} id={`${id}-${s.code}`} role="option" aria-selected={s.code === value}>
              <button
                type="button"
                tabIndex={-1}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(index)}
                className={`so-state-option${index === active ? ' is-selected' : ''}`}
                onClick={() => pick(s.code)}
              >
                <span>{s.name}</span>
                <span className="so-state-code">{s.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="so-selected-state" role="status">
          Selected: <strong>{selected.name}</strong> <span className="so-state-code">{selected.code}</span>
        </div>
      )}
    </div>
  );
}
