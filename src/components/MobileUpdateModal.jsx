import { useEffect } from 'react';
import vahanQr from '../assets/images/qr-code-vahan.jpg';
import sarathiQr from '../assets/images/qr-code-sarathi.jpg';

export default function MobileUpdateModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div id="updatemobileno" className="modal fade in" role="dialog" aria-modal="true" aria-labelledby="headerupdatemobileno" onClick={onClose}>
      <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content english">
          <div className="modal-header" style={{ position: 'relative', padding: 15 }}>
            <button type="button" className="close" aria-label="Close" onClick={onClose} style={{ position: 'absolute', top: 15, right: 20, fontSize: 30 }}>
              <span aria-hidden="true" style={{ color: 'red' }}>×</span>
            </button>
            <h4 className="modal-title" id="headerupdatemobileno" style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', width: '100%', margin: 0 }}>Update Your Mobile Number</h4>
          </div>
          <div className="modal-body" style={{ padding: 20 }}>
            <p style={{ fontSize: 18 }}>
              Driving license holders and registered vehicle owners are advised to ensure their mobile numbers are updated in the <strong>Vahan</strong> and <strong>Sarathi</strong> portals. This helps keep records accurate and up to date. You can now update your mobile number online without visiting the RTO.
            </p>
            <p className="font-bold" style={{ fontSize: 18 }}>Scan or Click to Update Your Mobile Number:</p>
            <div className="qr-code-container">
              <div className="qr-item">
                <img src={vahanQr} className="qr-code-img" alt="Vahan QR Code" />
                <span className="english">Vahan</span><br />
                <a href="https://vahan.parivahan.gov.in/mobileupdate/" target="_blank" rel="noreferrer" className="link-button">https://vahan.parivahan.gov.in/mobileupdate/</a>
              </div>
              <div className="qr-item">
                <img src={sarathiQr} className="qr-code-img" alt="Sarathi QR Code" />
                <span className="english">Sarathi</span><br />
                <a href="https://sarathi.parivahan.gov.in/sarathiservice/mobNumUpdpub.do" target="_blank" rel="noreferrer" className="link-button">https://sarathi.parivahan.gov.in/sarathiservice/mobNumUpdpub.do</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
