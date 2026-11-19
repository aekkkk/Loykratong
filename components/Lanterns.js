'use client';
import { useEffect, useState } from 'react';

// โคมลอยที่ค่อยๆ ลอยขึ้นฟ้า
export default function Lanterns() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(Array.from({ length: 14 }, () => ({
      left: Math.random() * 100, size: 14 + Math.random() * 20,
      dur: 18 + Math.random() * 22, delay: -Math.random() * 40, sway: 20 + Math.random() * 40,
    })));
  }, []);
  return (
    <div className="lanterns" aria-hidden="true">
      {items.map((l, i) => (
        <span key={i} className="lantern"
          style={{ left: l.left + '%', width: l.size, height: l.size * 1.3, animationDuration: l.dur + 's', animationDelay: l.delay + 's', '--sway': l.sway + 'px' }} />
      ))}
    </div>
  );
}
