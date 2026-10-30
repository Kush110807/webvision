import { useEffect, useState } from 'react';
import LicenceJourney from './features/licence/LicenceJourney.jsx';

const OFFICIAL_URL = 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do';

const ICON_PATHS = {
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  arrowUpRight: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
  steering: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2" /><path d="M3.7 9h16.6M10.6 13.4l-2.5 6.5m5.3-6.5 2.5 6.5" /></>,
  refresh: <><path d="M20 7v5h-5" /><path d="M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 12-2L20 12M4 12l2.4 5a7 7 0 0 0 12 0" /></>,
  clipboard: <><rect x="5" y="4" width="14" height="18" rx="2" /><path d="M9 4.5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5M9 12h6m-6 4h5" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
};

function Icon({ name, size = 22, className = '' }) {
  return <svg className={className} aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICON_PATHS[name]}</svg>;
}

const services = [
  { icon: 'book', eyebrow: 'START HERE', title: "Learner's Licence", copy: 'Understand the process, prepare your checklist, and know what comes next.', featured: true },
  { icon: 'steering', eyebrow: 'OFFICIAL SERVICE', title: 'Driving Licence', copy: 'Explore the next step after obtaining your learner’s licence.' },
  { icon: 'refresh', eyebrow: 'OFFICIAL SERVICE', title: 'Licence Renewal', copy: 'Find the official portal to check renewal options and state requirements.' },
  { icon: 'clipboard', eyebrow: 'OFFICIAL SERVICE', title: 'Application Status', copy: 'Check the status of an existing application on the government website.' },
];

export default function App() {
  const [view, setView] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = view === 'home' ? 'SARATHI ONE — Your licence journey, made simple' : 'Learner’s Licence Journey — SARATHI ONE';
    window.scrollTo(0, 0);
  }, [view]);

  const enterJourney = () => { setMenuOpen(false); setView('licence'); };
  const returnHome = () => { setView('home'); setMenuOpen(false); };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="prototype-notice" role="note">
        <Icon name="shield" size={15} />
        <span><strong>Unofficial student prototype</strong> — Not a government website. Do not enter personal information.</span>
      </div>
      <header className="site-header">
        <div className="container header-content">
          <button type="button" className="brand brand-button" onClick={returnHome} aria-label="SARATHI ONE, return to home">
            <span className="brand-symbol" aria-hidden="true"><span className="brand-symbol-inner" /></span>
            <span className="brand-wordmark">SARATHI<span>ONE</span></span>
          </button>
          <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-nav">
            <Icon name="menu" />
          </button>
          <nav id="primary-nav" className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
            {view === 'home' ? <>
              <a onClick={() => setMenuOpen(false)} href="#services">Services</a>
              <a onClick={() => setMenuOpen(false)} href="#how-it-works">How it works</a>
            </> : <button type="button" className="nav-return" onClick={returnHome}>Back to home</button>}
            <a className="nav-official" target="_blank" rel="noopener noreferrer" href={OFFICIAL_URL}>
              Official portal <Icon name="arrowUpRight" size={15} />
            </a>
          </nav>
        </div>
      </header>

      {view === 'licence' ? (
        <LicenceJourney onExit={returnHome} />
      ) : (
        <main id="main-content">
          <section className="hero-section" aria-labelledby="hero-title">
            <div className="container hero-grid">
              <div className="hero-content">
                <span className="eyebrow"><span className="eyebrow-dot" /> CLEARER. CALMER. SIMPLER.</span>
                <h1 id="hero-title">Your driving licence journey, <em>made simple.</em></h1>
                <p className="hero-intro">Less searching. More clarity. One thoughtful place to understand your next step and prepare before you visit the official portal.</p>
                <div className="hero-actions">
                  <button className="button button-primary button-large" type="button" onClick={enterJourney}>Start your journey <Icon name="arrow" size={19} /></button>
                  <a href="#how-it-works" className="button button-text">See how it works <Icon name="arrow" size={17} /></a>
                </div>
                <div className="hero-assurance"><Icon name="shield" size={17} /><span>No account needed. No personal details collected.</span></div>
              </div>
              <div className="hero-art" aria-label="Illustration of three simple preparation stages">
                <div className="art-orbit orbit-outer"/><div className="art-orbit orbit-inner"/>
                <div className="journey-preview">
                  <div className="preview-top"><span className="preview-brand-dot" /> PREPARATION GUIDE <span>01 / 03</span></div>
                  <div className="preview-symbol"><Icon name="book" size={29} /></div>
                  <h2>Ready for your next step?</h2>
                  <p>Everything you need to prepare, clearly organised.</p>
                  <div className="preview-progress-label"><span>Your journey</span><strong>Step by step</strong></div>
                  <div className="preview-track"><span /></div>
                  <div className="preview-checks"><span><Icon name="check" size={15} /> Choose your service</span><span><Icon name="check" size={15} /> Understand the process</span><span className="preview-pending">○ Prepare with confidence</span></div>
                  <span className="preview-bottom">Built for clarity, not complexity</span>
                </div>
                <div className="art-floating-tag"><Icon name="check" size={16} /> Focused on what matters</div>
              </div>
            </div>
          </section>

          <section className="service-section" id="services" aria-labelledby="services-title">
            <div className="container">
              <div className="section-top"><div><span className="section-kicker">EXPLORE SERVICES</span><h2 id="services-title">Where would you like to start?</h2><p>Choose a service. We'll make the next step easy to understand.</p></div><span className="section-number">01 / SERVICES</span></div>
              <div className="service-grid">
                {services.map((s) => <article className={`service-card ${s.featured ? 'service-card-featured' : ''}`} key={s.title}>
                  <div className="service-icon"><Icon name={s.icon} size={25} /></div>
                  <div className="service-eyebrow">{s.eyebrow}</div>
                  <h3>{s.title}</h3><p>{s.copy}</p>
                  {s.featured ? <button className="service-action" type="button" onClick={enterJourney}>Begin preparation <Icon name="arrow" size={18}/></button> : <a className="service-action" href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">Open official portal <Icon name="arrowUpRight" size={18}/></a>}
                </article>)}
              </div>
            </div>
          </section>

          <section className="how-section" id="how-it-works" aria-labelledby="how-heading">
            <div className="container how-layout"><div className="how-header"><span className="section-kicker">HOW IT WORKS</span><h2 id="how-heading">A simpler path forward.</h2><p>Just a few focused steps between uncertainty and being prepared.</p></div>
              <div className="how-steps">
                <div className="how-step"><span>01</span><div><h3>Choose your path</h3><p>Select Learner's Licence and tell us which state you'll use.</p></div></div>
                <div className="how-step"><span>02</span><div><h3>Know what to prepare</h3><p>See an easy-to-follow overview and a practical, general checklist.</p></div></div>
                <div className="how-step"><span>03</span><div><h3>Continue with confidence</h3><p>Review your preparation and visit SARATHI for the real application.</p></div></div>
              </div>
            </div>
          </section>
          <section className="bottom-cta-section"><div className="container bottom-cta"><div><span>PREPARE WITH CLARITY</span><h2>One clear first step changes everything.</h2></div><button className="button button-inverse" type="button" onClick={enterJourney}>Get started <Icon name="arrow" size={19}/></button></div></section>
        </main>
      )}
      <footer className="site-footer"><div className="container footer-content"><div className="footer-identity"><span className="footer-brand">SARATHI ONE</span><p>Independent student-built preparation experience. Not an official service.</p></div><a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">Visit official SARATHI <Icon name="arrowUpRight" size={15}/></a></div></footer>
    </div>
  );
}
