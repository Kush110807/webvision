import { Routes, Route, Navigate } from 'react-router-dom';
import { JourneyProvider } from './context/JourneyContext.jsx';
import Navbar from './components/one/Navbar.jsx';
import Footer from './components/one/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import DelhiDashboard from './pages/DelhiDashboard.jsx';
import LicenceJourney from './pages/LicenceJourney.jsx';
import ApplicationStatus from './pages/ApplicationStatus.jsx';
import OtherServices from './pages/OtherServices.jsx';
import StateSelection from './pages/StateSelection.jsx';
import OriginalSarathi from './pages/OriginalSarathi.jsx';
import NotFound from './pages/NotFound.jsx';

// Layout for the SARATHI ONE experience (navbar + footer).
// The original clone at /original renders standalone.
function OneLayout({ children }) {
  return (
    <div className="so-app">
      <a className="so-skip" href="#so-main">Skip to main content</a>
      <Navbar />
      <main id="so-main" tabIndex="-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <JourneyProvider>
      <Routes>
        <Route path="/" element={<OneLayout><LandingPage /></OneLayout>} />
        <Route path="/delhi" element={<OneLayout><DelhiDashboard /></OneLayout>} />
        <Route path="/journey" element={<OneLayout><LicenceJourney /></OneLayout>} />
        <Route path="/status" element={<OneLayout><ApplicationStatus /></OneLayout>} />
        <Route path="/services/:serviceId" element={<OneLayout><OtherServices /></OneLayout>} />
        <Route path="/state-selection" element={<OneLayout><StateSelection /></OneLayout>} />
        <Route path="/services" element={<Navigate to="/" replace />} />
        <Route path="/original" element={<OriginalSarathi />} />
        <Route path="*" element={<OneLayout><NotFound /></OneLayout>} />
      </Routes>
    </JourneyProvider>
  );
}
