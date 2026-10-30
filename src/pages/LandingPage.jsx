import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, Compass, FileCheck2, MapPin, ShieldAlert, ShieldCheck } from 'lucide-react';
import Carousel from '../components/Carousel.jsx';
import MarqueeStrip from '../components/MarqueeStrip.jsx';
import StateSearch from '../components/one/StateSearch.jsx';
import NoticeBanner from '../components/one/NoticeBanner.jsx';
import { useJourney } from '../context/JourneyContext.jsx';
import { STATES } from '../data/states.js';
import { validateStateSelection } from '../utils/validation.js';

// WebVision redesign: prioritises the original site's state-first task.
// Existing validation, saved selection and Delhi demo routing are retained.
export default function LandingPage() {
  const navigate = useNavigate();
  const { journey, setStateCode } = useJourney();
  const [code, setCode] = useState(journey.stateCode || '');
  const [error, setError] = useState(null);
  const chosen = STATES.find((s) => s.code === code);

  const onContinue = () => {
    const err = validateStateSelection(code);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStateCode(code);
    navigate('/delhi');
  };

  return (
    <div className="so-page so-landing">
      <section className="so-landing-hero" aria-labelledby="so-landing-title">
        <div className="so-landing-hero-inner">
          <div className="so-landing-hero-copy">
            <span className="so-hero-overline"><span className="so-hero-overline-dot" /> A CLEARER START TO SARATHI SERVICES</span>
            <h1 id="so-landing-title">Your licence journey starts <em>with clarity.</em></h1>
            <p className="so-landing-lead">
              Select your State or Union Territory, understand the available services, and prepare for your next step — all in one simpler experience.
            </p>
            <div className="so-hero-trust" aria-label="Prototype highlights">
              <span><CheckCircle2 size={17} aria-hidden="true" /> No sign-in required</span>
              <span><ShieldCheck size={17} aria-hidden="true" /> No personal data collected</span>
            </div>
            <a className="so-hero-secondary" href="#so-announcements">
              Explore public notices <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="so-landing-state-panel" id="state-selection" aria-labelledby="so-state-panel-title">
            <div className="so-state-panel-heading">
              <span className="so-state-panel-icon"><MapPin size={21} aria-hidden="true" /></span>
              <span className="so-state-step">STEP 01 OF 02 · SELECT LOCATION</span>
            </div>
            <h2 id="so-state-panel-title">Where will you apply?</h2>
            <p>Choose the state where you intend to access licence services.</p>
            <StateSearch value={code} onChange={(v) => { setCode(v); setError(null); }} />
            {error && <div className="so-mt-sm" role="alert"><NoticeBanner type="error" title="Select a state first">{error}</NoticeBanner></div>}
            <button type="button" className="so-btn so-btn-primary so-btn-lg so-landing-continue" onClick={onContinue}>
              Explore available services <ArrowRight size={19} aria-hidden="true" />
            </button>
            <p className="so-state-panel-footnote">
              {chosen ? <><strong>{chosen.name} selected.</strong> </> : null}
              This student prototype demonstrates Delhi services for all selections; real state-specific services are available only through the official portal.
            </p>
          </div>
        </div>
      </section>

      <section className="so-landing-process" aria-label="How this redesign works">
        <div className="so-landing-process-inner">
          <div className="so-process-item"><span className="so-process-symbol"><MapPin size={19} aria-hidden="true" /></span><div><strong>Choose your state</strong><span>Find a clear starting point</span></div></div>
          <div className="so-process-divider" aria-hidden="true" />
          <div className="so-process-item"><span className="so-process-symbol"><Compass size={19} aria-hidden="true" /></span><div><strong>Explore services</strong><span>See the Delhi demo journey</span></div></div>
          <div className="so-process-divider" aria-hidden="true" />
          <div className="so-process-item"><span className="so-process-symbol"><FileCheck2 size={19} aria-hidden="true" /></span><div><strong>Prepare confidently</strong><span>Complete real tasks officially</span></div></div>
        </div>
      </section>

      <section className="so-landing-announcements" id="so-announcements" aria-labelledby="so-announcements-title">
        <div className="so-landing-section-heading">
          <div><span className="so-eyebrow">FROM THE ORIGINAL PUBLIC PORTAL</span><h2 id="so-announcements-title">Information &amp; announcements</h2>
          <p>Public informational banners retained for before-and-after comparison.</p></div>
          <a href="https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do" target="_blank" rel="noopener noreferrer" className="so-announcement-official">Visit official SARATHI <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="so-announcement-media"><Carousel /></div>
        <MarqueeStrip />
      </section>

      <aside className="so-landing-fraud" aria-label="Fraud awareness">
        <ShieldAlert size={21} aria-hidden="true" />
        <div><strong>Use official platforms for real applications.</strong><p>
          Beware of fraudulent websites or apps. This is an unofficial student redesign: it cannot submit forms, accept payments or verify applications. Never provide Aadhaar details, OTPs or documents here.
        </p></div>
      </aside>
    </div>
  );
}
