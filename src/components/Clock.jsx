import { useEffect, useState } from 'react';

const fmt = () => {
  const now = new Date();
  const date = now.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
  const time = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: true });
  return { date, time };
};

export default function Clock() {
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 1000); return () => clearInterval(id); }, []);
  return (
    <ul className="list-unstyled sarathidate" style={{ paddingTop: 8, marginBottom: 0, textAlign: 'center' }}>
      <li>
        <div className="sarathidate_time padding0px" style={{ fontSize: 12 }}>
          <label className="margin0px bold" style={{ color: '#000', paddingBottom: 15, marginLeft: -7 }}>DATE:</label>{' '}
          <span className="red">{t.date}</span>&nbsp;&nbsp;&nbsp;
          <label style={{ color: '#000', letterSpacing: '0.5px' }}>TIME:</label>{' '}
          <span style={{ color: '#fff' }}>{t.time}</span>
        </div>
      </li>
    </ul>
  );
}
