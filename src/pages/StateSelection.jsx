import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import StateSearch from '../components/one/StateSearch.jsx';
import NoticeBanner from '../components/one/NoticeBanner.jsx';
import { useJourney } from '../context/JourneyContext.jsx';
import { getServiceById } from '../data/services.js';
import { STATES } from '../data/states.js';
import { validateStateSelection } from '../utils/validation.js';

// PAGE 3 — State / UT selection (searchable), with validation.
export default function StateSelection() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { journey, setStateCode, setService } = useJourney();

  // Allow ?service=... to set the service; fall back to a saved or default selection.
  const serviceParam = params.get('service');
  const [serviceId] = useState(() => {
    if (serviceParam && getServiceById(serviceParam)) return serviceParam;
    return journey.serviceId || "learner's-licence";
  });
  const service = getServiceById(serviceId);

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
    setService(serviceId);
    setStateCode(code);
    navigate('/journey');
  };

  return (
    <div className="so-page">
      <div className="so-container so-container-narrow">
        <p className="so-breadcrumb">
          <Link to="/delhi">Dashboard</Link> <span aria-hidden="true">/</span> Select state
        </p>
        <h1 className="so-page-title">
          <MapPin size={26} aria-hidden="true" /> Select your State or Union Territory
        </h1>
        <p className="so-page-sub">
          Licence services in India are delivered by each state’s Transport Department. Choose the
          state or Union Territory where you will apply. <strong>Delhi</strong> is used for the main
          demonstration of this prototype.
        </p>

        <div className="so-card">
          <div className="so-service-context">
            <span>Selected service:</span>
            <strong>{service ? service.title : 'Learner’s Licence'}</strong>
            <Link to="/" className="so-link-quiet">change</Link>
          </div>

          <StateSearch value={code} onChange={(v) => { setCode(v); if (error) setError(null); }} />

          {error && (
            <div className="so-mt-sm">
              <NoticeBanner type="error" title="Selection required">{error}</NoticeBanner>
            </div>
          )}

          <div className="so-inline-actions so-mt">
            <button type="button" className="so-btn so-btn-primary" onClick={onContinue}>
              Continue <ArrowRight size={16} aria-hidden="true" />
            </button>
            <Link to="/" className="so-btn so-btn-ghost">
              <ArrowLeft size={15} aria-hidden="true" /> Back to dashboard
            </Link>
          </div>
        </div>

        <p className="so-fineprint so-mt">
          Note: selecting a state here does not connect you to that state’s government portal. In this
          prototype, state selection only personalises the guidance shown in the journey.
        </p>
      </div>
    </div>
  );
}
