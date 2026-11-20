'use client';
import { useEffect, useState } from 'react';

// วันลอยกระทง (วันเพ็ญเดือน ๑๒) — โปรดตรวจสอบวันที่จริงในแต่ละปี
const DATES = ['2026-11-24', '2027-11-14', '2028-11-02'].map((d) => new Date(`${d}T18:00:00+07:00`));

export default function Countdown() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  let v = ['–', '–', '–', '–'], note = '';
  if (now) {
    const t = DATES.find((d) => d - now > -864e5) || DATES[DATES.length - 1];
    const ms = t - now;
    if (ms <= 0) {
      v = [0, 0, 0, 0]; note = 'วันนี้คือวันลอยกระทง!';
    } else {
      v = [Math.floor(ms / 864e5), Math.floor(ms / 36e5) % 24, Math.floor(ms / 6e4) % 60, Math.floor(ms / 1e3) % 60];
      note = 'นับถอยหลังสู่วันลอยกระทงครั้งถัดไป · ' + t.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  }
  const labels = ['วัน', 'ชั่วโมง', 'นาที', 'วินาที'];
  return (
    <>
      <div className="count">
        {v.map((n, i) => (<div key={i}><b>{n}</b><span>{labels[i]}</span></div>))}
      </div>
      <p id="countNote">{note}</p>
    </>
  );
}
