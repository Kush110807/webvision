import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StateSelectionPage from './StateSelectionPage.jsx';

// Keeps the original SARATHI clone accessible at /original for before/after comparison.
// The clone itself is untouched — only a small demo bar is added above it.
export default function OriginalSarathi() {
  return (
    <div>
      <div className="so-clone-bar">
        <span>
          You are viewing the <strong>original SARATHI clone (before)</strong> — an unofficial student prototype.
        </span>
        <Link to="/">
          <ArrowLeft size={14} aria-hidden="true" /> Back to SARATHI ONE home
        </Link>
      </div>
      <StateSelectionPage />
    </div>
  );
}
