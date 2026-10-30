import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SearchCheck, Info, CircleCheck, Loader, CircleAlert, Clock } from 'lucide-react';
import NoticeBanner from '../components/one/NoticeBanner.jsx';
import { findDemoApplication, SAMPLE_REFERENCES } from '../data/demoApplications.js';
import { validateReferenceNumber } from '../utils/validation.js';

const STATUS_ICON = {
  completed: CircleCheck,
  'in-progress': Loader,
  'action-required': CircleAlert,
  pending: Clock,
};

// PAGE 6 — Application status (simulated demo lookup only).
export default function ApplicationStatus() {
  const [ref, setRef] = useState('');
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const search = (value) => {
    const query = typeof value === 'string' ? value : ref;
    const err = validateReferenceNumber(query);
    if (err) {
      setError(err);
      setResult(null);
      return;
    }
    const app = findDemoApplication(query);
    if (!app) {
      setError(`No demo application matches “${query.trim()}”. Try one of the sample numbers below.`);
      setResult(null);
      return;
    }
    setError(null);
    setResult(app);
  };

  const useSample = (r) => {
    setRef(r);
    search(r);
  };

  return (
    <div className="so-page">
      <div className="so-container so-container-narrow">
        <p className="so-breadcrumb"><Link to="/delhi">Dashboard</Link> <span aria-hidden="true">/</span> Application Status</p>
        <h1 className="so-page-title"><SearchCheck size={26} aria-hidden="true" /> Application Status</h1>

        <NoticeBanner type="warning" title="Simulated demo only">
          Every application shown here is invented sample data stored in this website. Nothing is
          retrieved from any government database, and no real application can be tracked here.
        </NoticeBanner>

        <div className="so-card so-mt">
          <label className="so-field-label" htmlFor="so-ref">Application reference number</label>
          <div className="so-status-search">
            <input
              id="so-ref"
              aria-invalid={Boolean(error)}
              className="so-input"
              type="text"
              placeholder="e.g. S1-DEMO-100001"
              value={ref}
              onChange={(e) => { setRef(e.target.value); setResult(null); if (error) setError(null); }}
              onKeyDown={(e) => e.key === 'Enter' && search()}
            />
            <button type="button" className="so-btn so-btn-primary" onClick={() => search()}>
              <Search size={16} aria-hidden="true" /> Search
            </button>
          </div>

          {error && <div className="so-mt-sm"><NoticeBanner type="error" title="Lookup failed">{error}</NoticeBanner></div>}

          <div className="so-samples">
            <span>Sample numbers:</span>
            {SAMPLE_REFERENCES.map((r) => (
              <button key={r} type="button" className="so-chip" onClick={() => useSample(r)}>{r}</button>
            ))}
          </div>
        </div>

        {!result && !error && (
          <div className="so-card so-empty-state so-mt">
            <Info size={28} aria-hidden="true" />
            <p>Enter or click a sample reference number above to see a simulated application timeline.</p>
          </div>
        )}

        {result && (
          <div className="so-card so-mt" role="region" aria-label="Demo application result">
            <div className="so-status-head">
              <div>
                <h2>{result.service}</h2>
                <p className="so-status-meta">
                  Ref: <strong>{result.reference}</strong> · State: <strong>{result.state}</strong> ·
                  RTO: {result.rto} · Submitted: {result.submittedOn}
                </p>
                <p className="so-status-meta">Applicant: {result.applicant}</p>
              </div>
              <span className="so-badge so-badge-demo">Simulated record</span>
            </div>

            <ol className="so-timeline">
              {result.stages.map((s, i) => {
                const Icon = STATUS_ICON[s.status] || Clock;
                return (
                  <li key={i} className={`so-timeline-item is-${s.status}`}>
                    <span className="so-timeline-icon" aria-hidden="true"><Icon size={16} /></span>
                    <div>
                      <strong>{s.name}</strong>
                      <span className="so-timeline-date">{s.date} · {s.status.replace('-', ' ')}</span>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="so-fineprint">{result.note}</p>
            <button type="button" className="so-btn so-btn-ghost so-btn-sm so-mt-sm" onClick={() => setResult(null)}>
              Look up another number
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
