'use client';
import { useEffect, useState } from 'react';

// โคมลอยทรงสอบ (บนกว้าง ล่างแคบ) มีเปลวไฟด้านล่าง
export default function Lanterns() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(Array.from({ length: 12 }, () => ({
      left: 4 + Math.random() * 92, size: 16 + Math.random() * 30,
      dur: 26 + Math.random() * 26, delay: -Math.random() * 50, sway: 15 + Math.random() * 35,
    })));
  }, []);
  return (
    <div className="lanterns" aria-hidden="true">
      {items.map((l, i) => (
        <span key={i} className="lantern"
          style={{ left: l.left + '%', width: l.size, height: l.size * 1.25, animationDuration: l.dur + 's', animationDelay: l.delay + 's', '--sway': l.sway + 'px' }}>
          <i /><b />
        </span>
      ))}
    </div>
  );
}
