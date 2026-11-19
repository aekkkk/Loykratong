'use client';
import { useEffect, useState } from 'react';
import Krathong from './Krathong';
import { COLORS } from '../lib/krathong';

export default function HeroRiver() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(Array.from({ length: 6 }, (_, i) => ({
      color: COLORS[i % COLORS.length],
      dur: 26 + Math.random() * 18, delay: -Math.random() * 40,
      bottom: 22 + Math.random() * 50, w: 48 + Math.random() * 34,
    })));
  }, []);
  return (
    <div className="river" aria-hidden="true">
      <svg className="wave" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0 60c100-40 200 40 300 0s200 40 300 0 200 40 300 0 200 40 300 0v60H0z" fill="#1c6aa8" /></svg>
      <svg className="wave b" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0 70c100 30 200-30 300 0s200 30 300 0 200-30 300 0 200 30 300 0v50H0z" fill="#0f4c81" /></svg>
      {items.map((it, i) => (
        <div key={i} className="float" style={{ animationDuration: it.dur + 's', animationDelay: it.delay + 's', bottom: it.bottom, width: it.w }}>
          <Krathong color={it.color} />
        </div>
      ))}
    </div>
  );
}
