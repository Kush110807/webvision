import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, BookmarkCheck } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext.jsx';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/delhi', label: 'Delhi Services', end: true },
  { to: '/journey', label: 'Learner’s Licence' },
  { to: '/status', label: 'Application Status' },
  { to: '/original', label: 'Original Clone' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef(null);
  useEffect(() => setOpen(false), [location.pathname]);
  const { journey } = useJourney();

  const hasProgress =
    Boolean(journey.stateCode || journey.serviceId) &&
    (journey.step > 1 || Object.values(journey.checklist || {}).some(Boolean));

  return (
    <header className="so-navbar" onKeyDown={(e) => {
      if (e.key === 'Escape' && open) { setOpen(false); toggleRef.current?.focus(); }
    }}>
      <div className="so-navbar-inner">
        <Link to="/" className="so-brand" onClick={() => setOpen(false)}>
          <span className="so-brand-mark"><Car size={20} aria-hidden="true" /></span>
          <span className="so-brand-text">
            <strong>SARATHI ONE</strong>
            <small>Student prototype · unofficial</small>
          </span>
        </Link>

        <button
          className="so-nav-toggle"
          type="button"
          ref={toggleRef}
          aria-controls="so-navigation"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav id="so-navigation" className={`so-nav-links${open ? ' is-open' : ''}`} aria-label="Main navigation">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={Boolean(l.end)}
              className={({ isActive }) => `so-nav-link${isActive ? ' is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          {hasProgress && (
            <Link to="/journey" className="so-nav-progress" onClick={() => setOpen(false)} title="You have saved progress">
              <BookmarkCheck size={15} aria-hidden="true" /> Saved
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
