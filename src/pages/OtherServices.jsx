import { Link, useParams } from 'react-router-dom';
import { Car, RefreshCw, ExternalLink, ArrowLeft, Info } from 'lucide-react';
import NoticeBanner from '../components/one/NoticeBanner.jsx';
import { OFFICIAL_PORTAL_URL } from '../data/learnerLicence.js';

// Informational pages for Driving Licence and Licence Renewal.
// These explain the service and link to the official portal — no fake application workflow.
const CONTENT = {
  'driving-licence': {
    icon: Car,
    title: 'Driving Licence (Permanent)',
    intro:
      'A permanent Driving Licence is issued after you hold a Learner’s Licence for the minimum learning period and pass the driving test at your RTO. This page explains what is involved — the actual application is done only on the official portal.',
    points: [
      'You generally need a valid Learner’s Licence first, held for the minimum period prescribed for your vehicle category (commonly 30 days to 180 days — confirm for your state).',
      'The application typically needs age proof, address proof, the Learner’s Licence, photographs, a medical certificate in some cases, and the application fee.',
      'A driving test at the RTO checks your ability to drive the vehicle category you applied for.',
      'Rules, forms and fees vary by state — always confirm current requirements on the official portal or your RTO.',
    ],
  },
  'licence-renewal': {
    icon: RefreshCw,
    title: 'Renewal of Driving Licence',
    intro:
      'A Driving Licence is generally valid for 20 years or until the holder turns 50, whichever is earlier (for non-transport vehicles). Renewal is best started before expiry. This page explains the process; renewal itself happens on the official portal.',
    points: [
      'Renewal is usually possible from some months before expiry, and late renewal may attract additional fee — confirm the exact window for your state.',
      'Commonly required: the existing Driving Licence, age/address proof, photographs, Form 1 self-declaration of fitness, and Form 1A medical certificate in applicable cases (often required above certain ages or for transport vehicles).',
      'An expired licence that is very old may follow a different process (sometimes treated like a new application) — check with your RTO.',
      'Fees and documents vary by state; verify current requirements on the official portal.',
    ],
  },
};

export default function OtherServices() {
  const { serviceId } = useParams();
  const content = CONTENT[serviceId];

  if (!content) {
    return (
      <div className="so-page">
        <div className="so-container so-container-narrow">
          <div className="so-empty-state">
            <Info size={28} aria-hidden="true" />
            <h1>Service not found</h1>
            <p>There is no information page for “{serviceId}” in this prototype.</p>
            <Link to="/" className="so-btn so-btn-primary">Back to dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = content.icon;

  return (
    <div className="so-page">
      <div className="so-container so-container-narrow">
        <p className="so-breadcrumb"><Link to="/delhi">Dashboard</Link> <span aria-hidden="true">/</span> {content.title}</p>
        <h1 className="so-page-title"><Icon size={26} aria-hidden="true" /> {content.title}</h1>

        <NoticeBanner type="info" title="Informational page">
          This prototype does not simulate a real application for this service. Use the official
          portal to actually apply.
        </NoticeBanner>

        <div className="so-card so-mt">
          <p>{content.intro}</p>
          <h3>What it usually involves</h3>
          <ul className="so-list">
            {content.points.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
          <div className="so-official-box so-mt">
            <div className="so-official-info">
              <h3>Official SARATHI portal</h3>
              <p>Apply, pay fees and book slots only on the government site.</p>
            </div>
            <a href={OFFICIAL_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="so-btn so-btn-primary">
              Go to official portal <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="so-inline-actions so-mt">
            <Link to="/" className="so-btn so-btn-ghost"><ArrowLeft size={15} aria-hidden="true" /> Back to dashboard</Link>
            <Link to="/journey" className="so-btn so-btn-outline">Open Learner’s Licence journey</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
