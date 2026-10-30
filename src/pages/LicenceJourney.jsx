import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Info, GraduationCap, ShieldCheck, ListChecks,
  FileText, ClipboardList, ExternalLink, RotateCcw, BookmarkCheck, MapPin,
} from 'lucide-react';
import ProgressBar from '../components/one/ProgressBar.jsx';
import ChecklistItem from '../components/one/ChecklistItem.jsx';
import NoticeBanner from '../components/one/NoticeBanner.jsx';
import PreparationSummary from './PreparationSummary.jsx';
import { useJourney } from '../context/JourneyContext.jsx';
import { getServiceById } from '../data/services.js';
import { STATES } from '../data/states.js';
import {
  ELIGIBILITY_FACTS, ELIGIBILITY_CAVEAT, CHECKLIST_CATEGORIES, ESSENTIAL_ITEMS,
  VEHICLE_CATEGORIES, AGE_BANDS, PREPARATION_CHECKLIST, guidanceFor, OFFICIAL_PORTAL_URL,
} from '../data/learnerLicence.js';
import { validateApplicantDetails, hasEssentialChecklistItems } from '../utils/validation.js';

const STEPS = [
  { n: 1, title: 'Introduction', icon: Info },
  { n: 2, title: 'Basic Eligibility', icon: ShieldCheck },
  { n: 3, title: 'Documents Checklist', icon: ListChecks },
  { n: 4, title: 'Application Preparation', icon: FileText },
  { n: 5, title: 'Preparation Summary', icon: ClipboardList },
  { n: 6, title: 'Official Portal', icon: ExternalLink },
];

const TOTAL_ITEMS = CHECKLIST_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);

// PAGE 4 — Smart Licence Journey: the main USP. 6 guided steps with save & resume.
export default function LicenceJourney() {
  const navigate = useNavigate();
  const { journey, setStep, toggleChecklist, setApplicant, startOver, resumeNotice, dismissResumeNotice } = useJourney();
  const [stepError, setStepError] = useState(null);

  const service = getServiceById(journey.serviceId) || getServiceById("learner's-licence");
  const stateName = (STATES.find((s) => s.code === journey.stateCode) || { name: 'Delhi (default)' }).name;

  const step = Math.min(Math.max(journey.step || 1, 1), 6);

  const checklistCount = useMemo(
    () => CHECKLIST_CATEGORIES.flatMap((c) => c.items).filter((i) => journey.checklist[i.id]).length,
    [journey.checklist]
  );
  const essential = hasEssentialChecklistItems(ESSENTIAL_ITEMS, journey.checklist);

  const guidance = guidanceFor(journey.applicant);

  const goNext = () => {
    setStepError(null);
    if (step === 3 && !essential.done) {
      setStepError(
        'Please tick all Essential checklist items before continuing. You can still note the others for later.'
      );
      return;
    }
    if (step === 4) {
      const errs = validateApplicantDetails(journey.applicant);
      if (Object.keys(errs).length > 0) {
        setStepError('Please complete the required choices: ' + Object.values(errs).join(' '));
        return;
      }
    }
    if (step < 6) setStep(step + 1);
  };
  const goPrev = () => {
    setStepError(null);
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="so-page so-journey">
      <div className="so-container so-container-narrow">
        {/* Header row */}
        <div className="so-journey-head">
          <div>
            <p className="so-breadcrumb">
              <Link to="/delhi">Dashboard</Link> <span aria-hidden="true">/</span> {service.title}
            </p>
            <h1 className="so-page-title">
              <GraduationCap size={26} aria-hidden="true" /> Smart Licence Journey
            </h1>
            <p className="so-journey-context">
              Service: <strong>{service.title}</strong> · State: <strong>{stateName}</strong>{' '}
              <Link to="/state-selection" className="so-link-quiet">change state</Link>
            </p>
          </div>
          <div className="so-journey-saved">
            <BookmarkCheck size={15} aria-hidden="true" /> Saved automatically in this browser
          </div>
        </div>

        {resumeNotice === 'restored' && (
          <NoticeBanner type="info" title="Progress restored" onDismiss={dismissResumeNotice}>
            We restored your saved journey from this browser. Pick up where you left off.
          </NoticeBanner>
        )}

        {/* Step indicator */}
        <ol className="so-stepper" aria-label="Journey steps">
          {STEPS.map((s) => {
            const state = s.n === step ? 'current' : s.n < step ? 'done' : 'todo';
            return (
              <li key={s.n} className={`so-stepper-item is-${state}`}>
                <button
                  type="button"
                  onClick={() => { if (s.n < step) { setStepError(null); setStep(s.n); } }}
                  disabled={s.n > step}
                  aria-current={s.n === step ? 'step' : undefined}
                >
                  <span className="so-stepper-num" aria-hidden="true">{s.n}</span>
                  <span className="so-stepper-title">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <ProgressBar value={step} max={6} label={`Step ${step} of 6`} />

        {/* Step content */}
        <div className="so-card so-step-content">
          {step === 1 && (
            <section>
              <h2><Info size={20} aria-hidden="true" /> Step 1 — Introduction</h2>
              <p>
                A Learner’s Licence (LL) lets you legally learn to drive on Indian roads under
                supervision, and is the first step towards a permanent Driving Licence. Preparing
                correctly the first time avoids repeat RTO visits.
              </p>
              <p>This journey helps you get ready. Over six steps we will cover:</p>
              <ul className="so-list so-list-numbered">
                <li>The basic eligibility rules and how they differ by vehicle category.</li>
                <li>An interactive checklist of proofs, forms and test preparation.</li>
                <li>What to prepare before you open the official application form.</li>
                <li>A preparation summary showing what is done and what remains.</li>
                <li>A clear button to continue to the official SARATHI portal.</li>
              </ul>
              <NoticeBanner type="warning" title="Unofficial prototype">
                This is a student prototype for demonstration. It does not submit real applications,
                is not connected to any government database, and does not replace the official portal.
              </NoticeBanner>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2><ShieldCheck size={20} aria-hidden="true" /> Step 2 — Basic Eligibility</h2>
              <p>These are general rules published for Learner’s Licences in India:</p>
              <div className="so-fact-list">
                {ELIGIBILITY_FACTS.map((f) => (
                  <div key={f.id} className="so-fact">
                    <h4>{f.title}</h4>
                    <p>{f.body}</p>
                  </div>
                ))}
              </div>
              <NoticeBanner type="warning" title="Requirements vary">
                {ELIGIBILITY_CAVEAT}
              </NoticeBanner>
            </section>
          )}

          {step === 3 && (
            <section>
              <h2><ListChecks size={20} aria-hidden="true" /> Step 3 — Preparation Checklist</h2>
              <p>
                Tick each item you already have ready. This checklist tracks preparation only — it
                never asks for document numbers or uploads, and nothing you tick leaves your browser.
              </p>
              <ProgressBar value={checklistCount} max={TOTAL_ITEMS} label={`${checklistCount} of ${TOTAL_ITEMS} items ready`} />
              {CHECKLIST_CATEGORIES.map((cat) => (
                <div key={cat.id} className="so-check-group">
                  <h3 className="so-check-group-title">{cat.title}</h3>
                  <p className="so-check-group-note">{cat.note}</p>
                  {cat.items.map((item) => (
                    <ChecklistItem
                      key={item.id}
                      item={item}
                      checked={Boolean(journey.checklist[item.id])}
                      onToggle={toggleChecklist}
                    />
                  ))}
                </div>
              ))}
              {!essential.done && (
                <p className="so-fineprint">
                  Still pending ({essential.pending.length} essential):{' '}
                  {essential.pending.map((i) => i.label).join(', ')}
                </p>
              )}
            </section>
          )}

          {step === 4 && (
            <section>
              <h2><FileText size={20} aria-hidden="true" /> Step 4 — Application Preparation</h2>
              <p>
                Tell us two non-sensitive choices so we can tailor the guidance. We never ask for
                names, Aadhaar, licence numbers or contact details.
              </p>

              <div className="so-form-grid">
                <div className="so-field">
                  <label className="so-field-label" htmlFor="so-vehicle">Vehicle category *</label>
                  <select
                    id="so-vehicle"
                    className="so-input"
                    value={journey.applicant.vehicleCategory || ''}
                    onChange={(e) => setApplicant({ vehicleCategory: e.target.value })}
                  >
                    <option value="">— Select category —</option>
                    {VEHICLE_CATEGORIES.map((v) => (
                      <option key={v.id} value={v.id}>{v.label}</option>
                    ))}
                  </select>
                </div>
                <div className="so-field">
                  <label className="so-field-label" htmlFor="so-age">Your age group *</label>
                  <select
                    id="so-age"
                    className="so-input"
                    value={journey.applicant.ageBand || ''}
                    onChange={(e) => setApplicant({ ageBand: e.target.value })}
                  >
                    <option value="">— Select age group —</option>
                    {AGE_BANDS.map((a) => (
                      <option key={a.id} value={a.id}>{a.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="so-guidance">
                <h4>Tailored guidance for you</h4>
                <ul className="so-list">
                  {guidance.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </div>

              <h4>Before you open the official form, keep ready:</h4>
              <ul className="so-list">
                {PREPARATION_CHECKLIST.map((p, i) => <li key={i}>{p}</li>)}
              </ul>

              <label className={`so-check-item so-confirm${journey.applicant.confirmed ? ' is-checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={Boolean(journey.applicant.confirmed)}
                  onChange={(e) => setApplicant({ confirmed: e.target.checked })}
                />
                <span className="so-check-box" aria-hidden="true">{journey.applicant.confirmed ? '✓' : ''}</span>
                <span className="so-check-body">
                  <span className="so-check-label">
                    I will verify the final requirements on the official portal *
                  </span>
                  <span className="so-check-hint">
                    Rules, fees and accepted documents can change. The official portal is the source of truth.
                  </span>
                </span>
              </label>
            </section>
          )}

          {step === 5 && (
            <section>
              <h2><ClipboardList size={20} aria-hidden="true" /> Step 5 — Preparation Summary</h2>
              <PreparationSummary
                journey={journey}
                checklistCount={checklistCount}
                totalItems={TOTAL_ITEMS}
                essentialDone={essential.done}
                essentialPending={essential.pending}
                stateName={stateName}
                serviceName={service.title}
              />
            </section>
          )}

          {step === 6 && (
            <section>
              <h2><ExternalLink size={20} aria-hidden="true" /> Step 6 — Continue to the Official Portal</h2>
              <p>
                You have finished the preparation journey. Actual Learner’s Licence applications are
                submitted only through the official government SARATHI portal.
              </p>
              <NoticeBanner type="warning" title="This prototype cannot submit applications">
                On the official portal you will fill the real form, upload documents and pay the real
                fee. Have your proofs and photographs ready. Never share OTPs or document numbers on
                unofficial websites.
              </NoticeBanner>

              <div className="so-official-box">
                <div className="so-official-info">
                  <h3>Official SARATHI portal</h3>
                  <p>
                    sarathi.parivahan.gov.in — select Delhi (or your state) and start the Learner’s
                    Licence application.
                  </p>
                </div>
                <a href={OFFICIAL_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="so-btn so-btn-primary so-btn-lg">
                  Continue to official SARATHI portal <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>

              <div className="so-inline-actions so-mt">
                <button type="button" className="so-btn so-btn-ghost" onClick={() => { startOver(); navigate('/'); }}>
                  <RotateCcw size={14} aria-hidden="true" /> Start a new journey
                </button>
                <Link to="/status" className="so-btn so-btn-outline">Track a demo application</Link>
              </div>
            </section>
          )}
        </div>

        {stepError && (
          <div className="so-mt-sm">
            <NoticeBanner type="error" title="Cannot continue yet">{stepError}</NoticeBanner>
          </div>
        )}

        {/* Navigation */}
        <div className="so-step-nav">
          <button type="button" className="so-btn so-btn-ghost" onClick={goPrev} disabled={step === 1}>
            <ArrowLeft size={16} aria-hidden="true" /> Previous
          </button>
          {step < 6 ? (
            <button type="button" className="so-btn so-btn-primary" onClick={goNext}>
              Continue <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <span className="so-step-nav-end">Journey complete — you can revisit any step above.</span>
          )}
        </div>

        <p className="so-fineprint so-mt">
          <MapPin size={12} aria-hidden="true" /> Guidance is general; confirm vehicle-category rules,
          fees and accepted documents for {stateName} on the official portal.
        </p>
      </div>
    </div>
  );
}
