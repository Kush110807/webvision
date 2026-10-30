import { useState } from 'react';

const TEXT = 'Others can live when we agree to give. Take a simple step, donate your organs.There is no bar of age sex and color of organs donation. Come forward and take part in saving numerous lives by organ donation';

export default function MarqueeStrip() {
  const [paused, setPaused] = useState(false);
  return (
    <div style={{ backgroundColor: '#124dac', color: '#FFF', fontSize: 16, padding: '11px 0 1px 0', clear: 'both', letterSpacing: '0.7px', overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="marquee-track" style={{ animationPlayState: paused ? 'paused' : 'running' }}>{TEXT}</div>
    </div>
  );
}
