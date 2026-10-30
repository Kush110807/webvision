import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import b1 from '../assets/images/banner-english-on-portal-for-voluntary-updation-of-mobile-number-by-citizens.jpg';
import b2 from '../assets/images/bannerpic.jpg';
import b3 from '../assets/images/organbanner2.jpg';
import b4 from '../assets/images/oraganbanner1.jpg';

const SLIDES = [b1, b2, b3, b4]; // original images have empty alt text

export default function Carousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);
  const go = (d) => setI((c) => (c + d + SLIDES.length) % SLIDES.length);
  return (
    <div id="myCarousel" className="carousel slide">
      <div className="carousel-inner">
        {SLIDES.map((src, n) => (
          <div key={n} className={`item${n === i ? ' active' : ''}`}>
            <img src={src} alt="" style={{ width: '100%' }} />
          </div>
        ))}
      </div>
      <a className="left carousel-control" href="#myCarousel" onClick={(e) => { e.preventDefault(); go(-1); }}>
        <ChevronLeft className="cc-icon" size={24} /><span className="sr-only">Previous</span>
      </a>
      <a className="right carousel-control" href="#myCarousel" onClick={(e) => { e.preventDefault(); go(1); }}>
        <ChevronRight className="cc-icon" size={24} /><span className="sr-only">Next</span>
      </a>
    </div>
  );
}
