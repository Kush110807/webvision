import { Link } from 'react-router-dom';
import { Car, ShieldAlert, ExternalLink } from 'lucide-react';
import { PARIVAHAN_URL } from '../../data/learnerLicence.js';

// SARATHI ONE footer — clearly marks the project as an unofficial student prototype.
export default function Footer() {
  return (
    <footer className="so-footer">
      <div className="so-footer-inner">
        <div className="so-footer-col so-footer-brand-col">
          <div className="so-brand so-brand-footer">
            <span className="so-brand-mark"><Car size={18} aria-hidden="true" /></span>
            <span className="so-brand-text">
              <strong>SARATHI ONE</strong>
              <small>Your Licence Journey, Simplified</small>
            </span>
          </div>
          <p className="so-footer-note">
            An unofficial student prototype built for WebVision 2.0 (MAIT). It is not affiliated with,
            endorsed by, or connected to the Government of India, the Ministry of Road Transport and
            Highways, NIC, or any State Transport Department.
          </p>
        </div>

        <div className="so-footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/journey">Smart Licence Journey</Link></li>
            <li><Link to="/status">Application Status (demo)</Link></li>
            <li><Link to="/original">Original SARATHI clone</Link></li>
          </ul>
        </div>

        <div className="so-footer-col">
          <h4>Official resources</h4>
          <ul>
            <li>
              <a href={PARIVAHAN_URL} target="_blank" rel="noopener noreferrer">
                parivahan.gov.in <ExternalLink size={13} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do" target="_blank" rel="noopener noreferrer">
                sarathi.parivahan.gov.in <ExternalLink size={13} aria-hidden="true" />
              </a>
            </li>
          </ul>
          <div className="so-footer-warn">
            <ShieldAlert size={16} aria-hidden="true" />
            <p>
              Real applications, fees and documents are handled only on official government websites
              and apps. Never share Aadhaar numbers, OTPs or document numbers with unofficial sites.
            </p>
          </div>
        </div>
      </div>

      <div className="so-footer-bottom">
        <p>Prototype build — all application data shown here is simulated sample data for demonstration only.</p>
      </div>
    </footer>
  );
}
