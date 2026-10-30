import { CheckCircle2, CircleDashed, AlertTriangle } from 'lucide-react';
import ProgressBar from '../components/one/ProgressBar.jsx';
import { ESSENTIAL_ITEMS } from '../data/learnerLicence.js';

// STEP 5 content — preparation summary. Pure presentational; the journey owns the data.
export default function PreparationSummary({ journey, checklistCount, totalItems, essentialDone, essentialPending, stateName, serviceName }) {
  const guidanceLine = essentialDone
    ? 'Your essential preparation items are complete. You are ready to continue to the official portal.'
    : 'Some essential items are still pending. You can continue, but finishing them first will save you a repeat visit.';

  return (
    <div className="so-summary">
      <div className="so-summary-stats">
        <div className="so-stat-card">
          <span className="so-stat-label">Selected service</span>
          <strong className="so-stat-value">{serviceName}</strong>
        </div>
        <div className="so-stat-card">
          <span className="so-stat-label">Selected state</span>
          <strong className="so-stat-value">{stateName}</strong>
        </div>
        <div className="so-stat-card">
          <span className="so-stat-label">Checklist progress</span>
          <strong className="so-stat-value">{checklistCount} of {totalItems} items</strong>
        </div>
        <div className="so-stat-card">
          <span className="so-stat-label">Current step</span>
          <strong className="so-stat-value">Step {journey.step} of 6</strong>
        </div>
      </div>

      <ProgressBar value={checklistCount} max={totalItems} label="Preparation progress" />

      <div className="so-summary-lists">
        <div className="so-card so-summary-done">
          <h3><CheckCircle2 size={18} aria-hidden="true" /> Completed items</h3>
          {checklistCount === 0 ? (
            <p className="so-empty">No checklist items ticked yet. Go back to Step 3 to tick the items you have prepared.</p>
          ) : (
            <p className="so-summary-note">{guidanceLine}</p>
          )}
        </div>
        <div className="so-card so-summary-pending">
          <h3><CircleDashed size={18} aria-hidden="true" /> Remaining items</h3>
          {essentialPending.length > 0 ? (
            <ul className="so-list">
              {essentialPending.map((i) => (
                <li key={i.id}><AlertTriangle size={14} aria-hidden="true" /> {i.label}</li>
              ))}
            </ul>
          ) : (
            <p className="so-summary-note">All essential items are ticked. </p>
          )}
        </div>
      </div>

      <div className="so-card so-mt">
        <h3>What happens on the next step?</h3>
        <p>
          Step 6 gives you the button to continue to the official SARATHI portal, where the actual
          Learner’s Licence application is submitted. This prototype cannot submit applications for you.
        </p>
      </div>
    </div>
  );
}
