import { useState } from 'react';
import Header from '../components/Header.jsx';
import Carousel from '../components/Carousel.jsx';
import MarqueeStrip from '../components/MarqueeStrip.jsx';
import StateSelector from '../components/StateSelector.jsx';
import MobileUpdateModal from '../components/MobileUpdateModal.jsx';
import Footer from '../components/Footer.jsx';

export default function StateSelectionPage() {
  const [modalOpen, setModalOpen] = useState(true); // original opens the popup on load
  const [fontSize, setFontSize] = useState(14);
  return (
    <div className="main" style={{ fontSize }}>
      <div className="container padding0px">
        <div className="header">
          <Header
            onDec={() => setFontSize((s) => (s - 2 >= 12 ? s - 2 : s))}
            onInc={() => setFontSize((s) => (s + 2 <= 24 ? s + 2 : s))}
            onReset={() => setFontSize(14)}
          />
        </div>
        <div className="width100p" />
        <div id="bdheight" className="content">
          <div className="col-md-12 padding0px">
            <Carousel />
            <MarqueeStrip />
            <section className="online-serv" style={{ padding: '25px 0px' }}>
              <div className="col-md-12">
                <div className="padding0px" align="center">
                  <h4>Online services in this portal are available only for the States listed below</h4>
                </div>
                <StateSelector />
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
      <MobileUpdateModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
