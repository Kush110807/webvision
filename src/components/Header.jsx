import ministryLogo from '../assets/images/ministry-nic-logo.png';
import parivahanLogo from '../assets/images/parivahan-logo.png';
import Clock from './Clock.jsx';
import LanguageDropdown from './LanguageDropdown.jsx';

const LOGIN = 'https://sarathi.parivahan.gov.in/sarathiservice/sarathilogin.do';

export default function Header({ onDec, onInc, onReset }) {
  const fontLink = (id, label, handler) => (
    <span className="font_increase">
      <a href="#" id={id} style={{ color: 'black' }} onClick={(e) => { e.preventDefault(); handler(); }}>{label}</a>
    </span>
  );
  return (
    <div className="sarathiheader_page">
      <div className="row">
        <div className="col-md-7 col-sm-12 col-xs-12">
          <div className="col-md-8 col-sm-12 col-xs-12">
            <div className="ministry_nic_logo padding0px mb_textcenter">
              <img src={ministryLogo} alt="Ministry of Road Transport and Highways, NIC" />
            </div>
          </div>
          <div className="col-md-4 col-sm-12 col-xs-12" style={{ textAlign: 'right' }}>
            <div className="ministry_nic_logo padding0px mb_textcenter">
              <img src={parivahanLogo} alt="Parivahan Sewa" />
            </div>
          </div>
        </div>
        <div className="col-md-2 col-sm-12 col-xs-12 mb_textcenter"><Clock /></div>
        <div className="col-md-1 col-sm-12 col-xs-12 mb_textcenter" style={{ position: "relative", zIndex: 3 }}><LanguageDropdown /></div>
        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 mb_textcenter" style={{ textAlign: 'center' }}>
          <div className="sarathi_login1">
            <ul className="list-unstyled" style={{ padding: '6px 0 0 0' }}>
              <li>
                {fontLink('decfont', <>A<sup>-</sup></>, onDec)}
                {fontLink('resetfont', 'A', onReset)}
                {fontLink('incfont', <>A<sup>+</sup></>, onInc)}
              </li>
              <li style={{ margin: '10px 0 0 0' }}>
                <a href={LOGIN} style={{ backgroundColor: '#3c763d', padding: '5px 16px', borderRadius: 5, color: '#fff', letterSpacing: '0.9px', fontSize: 13, textDecoration: 'none', display: 'none' }}>Login</a>
              </li>
            </ul>
          </div>
          <div className="sarathi_login">
            <ul className="list-unstyled" style={{ padding: '8px 0 0 0', textAlign: 'center' }}>
              <li>
                <a href={LOGIN} style={{ backgroundColor: '#3c763d', padding: '5px 23px', borderRadius: 5, color: '#fff', letterSpacing: '0.7px', fontSize: 14, textDecoration: 'none' }}>Login</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
