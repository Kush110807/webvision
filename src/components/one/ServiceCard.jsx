import { Link } from 'react-router-dom';
import { GraduationCap, Car, RefreshCw, SearchCheck, ArrowRight } from 'lucide-react';

const ICONS = {
  GraduationCap: GraduationCap,
  Car: Car,
  RefreshCw: RefreshCw,
  SearchCheck: SearchCheck,
};

// Card used on the Home and Services pages.
export default function ServiceCard({ service }) {
  const Icon = ICONS[service.icon] || Car;
  return (
    <article className="so-card so-service-card">
      <div className="so-card-head">
        <span className="so-card-icon" aria-hidden="true"><Icon size={22} /></span>
        <h3>{service.title}</h3>
      </div>
      <p>{service.short}</p>
      <div className="so-tags">
        {service.tags.map((t) => (
          <span key={t} className="so-tag">{t}</span>
        ))}
      </div>
      <Link to={service.route} className="so-card-link">
        {service.functional ? 'Start' : 'Learn more'} <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </article>
  );
}
