import nic from '../assets/images/logo.png';
import digital from '../assets/images/digital_logo_main.png';
import g20 from '../assets/images/g20-logo.png';

// Snapshot from the saved page (the original fetches it live from getOrgnCnt.do).
const ORGAN_COUNT_SNAPSHOT = '18250717';

export default function Footer() {
  return (
    <section className="footer_main" style={{ clear: 'both' }}>
      <div className="container">
        <div className="col-md-12 col-sm-12 text-center">
          <p style={{ color: '#fff', fontSize: 12, fontStyle: 'italic', margin: 0 }}>
            Best viewed in Google Chrome 140+, Microsoft Edge 140+, Mozilla Firefox 140+, and Opera 120+ browsers. Recommended screen resolution: 1366 * 768 or higher.
          </p>
        </div>
        <div className="row" style={{ clear: 'both' }}>
          <div className="col-md-10">
            <p>Designed, developed and hosted by</p>
            <div className="col-md-2" align="left"><div className="nic_logo"><a href="http://www.nic.in" target="_blank" rel="noreferrer"><img src={nic} alt="NIC" /></a></div></div>
            <div className="col-md-2" align="left"><div className="gov_logo"><a href="https://www.digitalindia.gov.in" target="_blank" rel="noreferrer"><img src={digital} alt="Digital India" /></a></div></div>
            <div className="col-md-6">
              <div className="alert alert-warning border border-danger rounded p-3 shadow-sm" role="alert">
                <h5 className="text-danger fw-bold">🛡️ Beware of Fraudulent Websites and Apps</h5>
                <p className="mb-2">Vehicle, Driving License, and eChallan related services can only be availed through the official platforms:</p>
                <ul className="mb-2">
                  <li>🌐 <a href="https://parivahan.gov.in/" target="_blank" rel="noreferrer" style={{ color: '#007BFF', fontWeight: 'bold' }}>https://parivahan.gov.in</a></li>
                  <li>📱 <strong>Nexgen mParivahan</strong> mobile app of the Ministry of Road Transport and Highways</li>
                </ul>
                <p className="mb-1">✅ <strong>Always use only the official website and mobile apps of the Ministry</strong></p>
                <p className="mb-0">❌ <strong>Do not click on suspicious links or use unknown apps.</strong></p>
              </div>
            </div>
            <div className="col-md-2" align="right">
              <ul className="list-unstyled"><li style={{ marginTop: 10, color: 'black' }}>Organ Donor Count : <span>{ORGAN_COUNT_SNAPSHOT}</span></li></ul>
            </div>
          </div>
          <div className="col-md-2" align="right"><div className="emblem-resize"><img src={g20} alt="G20" /></div></div>
        </div>
        <div className="bhashini-note"><h4>Correctness of the translation into the regional language lies with the respective State Transport Department.</h4></div>
      </div>
    </section>
  );
}
