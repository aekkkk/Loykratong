'use client';
import { useState } from 'react';
import Krathong from './Krathong';
import Reveal from './Reveal';
import { COLORS, chime } from '../lib/krathong';

export default function Maker() {
  const [color, setColor] = useState(COLORS[0]);
  const [wish, setWish] = useState('');
  const [floating, setFloating] = useState([]);
  const [shown, setShown] = useState(null);

  const launch = () => {
    const id = Date.now() + Math.random();
    const text = wish.trim() || 'ขอให้ทุกคนมีความสุข';
    setFloating((f) => [...f, { id, color, text, bottom: 14 + Math.random() * 60 }]);
    setShown(id); setTimeout(() => setShown((s) => (s === id ? null : s)), 3500);
    chime();
  };

  return (
    <>
      <Reveal className="maker">
        <div className="preview"><Krathong color={color} /></div>
        <div>
          <label htmlFor="wish">คำอธิษฐานของคุณ</label>
          <textarea id="wish" maxLength={80} value={wish} onChange={(e) => setWish(e.target.value)} placeholder="ขอให้ทุกคนมีความสุข สุขภาพแข็งแรง…" />
          <label>สีกลีบดอกบัว</label>
          <div className="swatches">
            {COLORS.map((c) => (
              <button key={c} type="button" className={c === color ? 'on' : ''} style={{ background: c, color: c }} aria-label={'สี ' + c} onClick={() => setColor(c)} />
            ))}
          </div>
          <br />
          <button className="btn" type="button" onClick={launch}>🪷 ลอยกระทง</button>
        </div>
      </Reveal>
      <Reveal id="pond">
        {floating.length === 0 && <div className="hint">กระทงของคุณจะลอยที่นี่ 🌙</div>}
        {floating.map((k) => (
          <div key={k.id} className={`pk ${shown === k.id ? 'show' : ''}`} style={{ bottom: k.bottom, animationDuration: '28s' }}
            onClick={() => setShown(shown === k.id ? null : k.id)}
            onAnimationEnd={(e) => { if (e.target === e.currentTarget) setFloating((f) => f.filter((x) => x.id !== k.id)); }}>
            <span className="ripple" /><div className="wish">“{k.text}”</div>
            <Krathong color={k.color} />
          </div>
        ))}
      </Reveal>
    </>
  );
}
