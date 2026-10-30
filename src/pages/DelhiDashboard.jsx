import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileSignature, Car, RefreshCw, SearchCheck, FileX2, FileX, MapPin,
  PlusCircle, FileText, LogIn, Building2, Users, ArrowRight, RotateCcw,
  BookmarkCheck, ExternalLink, Handshake,
} from 'lucide-react';
import NoticeBanner from '../components/one/NoticeBanner.jsx';
import { useJourney } from '../context/JourneyContext.jsx';
import { getServiceById } from '../data/services.js';
import { STATES } from '../data/states.js';
import { PARIVAHAN_URL } from '../data/learnerLicence.js';

// Service tiles modelled on the SARATHI state services dashboard.
// `route` = working page in this prototype; `soon: true` = shown but not built yet.
const DASHBOARD_SERVICES = [
  { id: 'll', title: "Apply for Learner's Licence", icon: FileSignature, route: '/journey', serviceId: "learner's-licence", tag: 'Full guided demo' },
  { id: 'dl', title: 'Apply for Driving Licence', icon: Car, route: '/services/driving-licence', tag: 'Info page' },
  { id: 'renewal', title: 'Apply for Renewal of Driving Licence', icon: RefreshCw, route: '/services/licence-renewal', tag: 'Info page' },
  { id: 'status', title: 'Application Status', icon: SearchCheck, route: '/status', tag: 'Demo lookup' },
  { id: 'dup-ll', title: 'Duplicate Learner’s Licence', icon: FileX2, soon: true },
  { id: 'dup-dl', title: 'Duplicate Driving Licence', icon: FileX, soon: true },
  { id: 'address', title: 'Change of Address in Driving Licence', icon: MapPin, soon: true },
  { id: 'add-on', title: 'Add-on Class of Vehicle', icon: PlusCircle, soon: true },
  { id: 'extract', title: 'DL Extract', icon: FileText, soon: true },
  { id: 'login', title: 'Log In', icon: LogIn, soon: true },
  { id: 'rto', title: 'Find My RTO / Zonal Offices', icon: Building2, soon: true },
  { id: 'citizens', title: 'Services for Senior Citizens & Divyangjan', icon: Users, soon: true },
];

export default function DelhiDashboard() {
  const navigate = useNavigate();
  const { journey, startOver, setService } = useJourney();
  const [notice, setNotice] = useState(null);

  const savedService = getServiceById(journey.serviceId);
  const savedState = STATES.find((s) => s.code === journey.stateCode);
  const hasSaved = Boolean(savedService || journey.step > 1);

  const openTile = (tile) => {
    if (tile.soon) {
      setNotice(`“${tile.title}” is displayed for completeness but its workflow is not built in this prototype yet.`);
      return;
    }
    if (tile.serviceId) setService(tile.serviceId);
    navigate(tile.route);
  };

  return (
    <div className="so-page so-dashboard">
      <div className="so-container">
        {notice && (
          <NoticeBanner type="warning" title="Not in this prototype" onDismiss={() => setNotice(null)}>
            {notice}
          </NoticeBanner>
        )}

        {hasSaved && (
          <NoticeBanner type="success" title="Welcome back — your progress is saved">
            <p>
              You last worked on <strong>{savedService ? savedService.title : 'the Learner’s Licence journey'}</strong>
              {savedState ? <> for <strong>{savedState.name}</strong></> : <> for <strong>Delhi</strong></>}
              , at step {journey.step} of 6. Progress is stored only in this browser.
            </p>
            <div className="so-notice-actions">
              <button type="button" className="so-btn so-btn-primary so-btn-sm" onClick={() => navigate('/journey')}>
                <BookmarkCheck size={15} aria-hidden="true" /> Resume journey
              </button>
              <button type="button" className="so-btn so-btn-ghost so-btn-sm" onClick={startOver}>
                <RotateCcw size={14} aria-hidden="true" /> Start again
              </button>
            </div>
          </NoticeBanner>
        )}

        {/* Dashboard heading */}
        <section className="so-dash-head">
          <div>
            <p className="so-eyebrow">SARATHI ONE · unofficial student prototype</p>
            <h1>Delhi Transport Department</h1>
            <p className="so-dash-sub">
              Driving-licence related services for the Government of NCT of Delhi, presented as a
              demonstration dashboard. Delhi is the default state — no state selection is required.
            </p>
          </div>
          <div className="so-dash-head-actions">
            <Link to="/status" className="so-btn so-btn-outline">
              <SearchCheck size={16} aria-hidden="true" /> Application Status
            </Link>
            <button
              type="button"
              className="so-btn so-btn-ghost"
              onClick={() => setNotice('Grievances are handled only by official channels. Use parivahan.gov.in or your state RTO — this prototype cannot register grievances.')}
            >
              <Handshake size={16} aria-hidden="true" /> File Your Grievance
            </button>
          </div>
        </section>

        {/* Services grid */}
        <section className="so-section so-section-flush">
          <h2 className="so-section-title">Online services on this portal</h2>
          <div className="so-service-grid">
            {DASHBOARD_SERVICES.map((tile) => {
              const Icon = tile.icon;
              return (
                <button
                  key={tile.id}
                  type="button"
                  className={`so-service-tile${tile.soon ? ' is-soon' : ''}`}
                  onClick={() => openTile(tile)}
                  aria-label={tile.soon ? `${tile.title} (not available in this prototype)` : tile.title}
                >
                  <span className="so-tile-icon" aria-hidden="true"><Icon size={26} /></span>
                  <span className="so-tile-title">{tile.title}</span>
                  {tile.tag && <span className="so-badge">{tile.tag}</span>}
                  {tile.soon && <span className="so-badge so-badge-soon">Coming soon</span>}
                </button>
              );
            })}
          </div>
        </section>

        {/* Feature strip */}
        <section className="so-section">
          <div className="so-info-grid">
            <div className="so-card">
              <h3><FileSignature size={18} aria-hidden="true" /> Learner’s Licence — the fully built demo</h3>
              <p>
                A six-step guided preparation journey: introduction, eligibility, a preparation
                checklist, document guidance, a preparation summary, and a final step that takes you
                to the official SARATHI portal. Your progress saves automatically.
              </p>
              <button
                type="button"
                className="so-btn so-btn-primary so-btn-sm"
                onClick={() => { setService("learner's-licence"); navigate('/journey'); }}
              >
                Start the journey <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
            <div className="so-card">
              <h3><SearchCheck size={18} aria-hidden="true" /> Application Status — simulated lookup</h3>
              <p>
                Enter a sample reference number such as <strong>S1-DEMO-100001</strong> to see a
                simulated application timeline. All records are invented sample data — nothing is
                fetched from any government database.
              </p>
              <Link to="/status" className="so-btn so-btn-outline so-btn-sm">
                Try the demo lookup <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
            <div className="so-card so-card-warn">
              <h3>Official portals only for real work</h3>
              <p>
                This prototype never submits real applications and never asks for Aadhaar numbers,
                licence numbers, OTPs or document uploads. Real services run only on
                {' '}<a href={PARIVAHAN_URL} target="_blank" rel="noopener noreferrer">parivahan.gov.in <ExternalLink size={12} aria-hidden="true" /></a>
                {' '}and the official mParivahan app.
              </p>
              <Link to="/original" className="so-link-quiet">View the original SARATHI clone (before) →</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
