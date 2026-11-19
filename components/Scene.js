'use client';
import { useCallback, useEffect, useState } from 'react';
import Building from './Building';
import Krathong from './Krathong';
import Fireworks from './Fireworks';
import Lotus from './Lotus';
import InfoPanel from './InfoPanel';
import HistoryPanel from './HistoryPanel';
import { COLORS, chime } from '../lib/krathong';

const LANES = [{ scale: 0.6, bright: 0.75 }, { scale: 0.8, bright: 0.9 }, { scale: 1, bright: 1 }];
const KEY = 'loykratong.v1';

function store(fn) { try { return fn(); } catch { return undefined; } }

export default function Scene() {
  const [ambient, setAmbient] = useState([]);
  const [mine, setMine] = useState([]);
  const [count, setCount] = useState(0);
  const [create, setCreate] = useState(false);
  const [info, setInfo] = useState(false);
  const [hist, setHist] = useState(true); // เปิดหน้าประวัติก่อนเมื่อเข้าเว็บ
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [shown, setShown] = useState(null);
  const closeInfo = useCallback(() => setInfo(false), []);
  const closeHist = useCallback(() => setHist(false), []);

  useEffect(() => {
    setAmbient(LANES.flatMap((l, li) => Array.from({ length: 5 }, (_, i) => {
      const dur = 60 + Math.random() * 40 + (2 - li) * 12;
      return { id: `a${li}-${i}`, lane: li, color: COLORS[(i + li) % COLORS.length], dur, delay: -Math.random() * dur, top: li === 2 ? 2 + Math.random() * 26 : 8 + Math.random() * 46 };
    })));
    const saved = store(() => JSON.parse(localStorage.getItem(KEY) || 'null'));
    if (saved) { setMine(saved.mine || []); setCount(saved.count || 0); }
  }, []);

  const persist = (m, c) => store(() => localStorage.setItem(KEY, JSON.stringify({ mine: m.slice(-30), count: c })));

  const launch = () => {
    const k = { id: 'm' + Date.now(), lane: 2, color, name: name.trim() || 'ผู้ไม่ประสงค์ออกนาม', wish: wish.trim() || 'ขอให้ทุกคนมีความสุข', ts: Date.now(), dur: 80, delay: -9, top: 2 + Math.random() * 26 };
    const m = [...mine, k].slice(-30), c = count + 1;
    setMine(m); setCount(c); persist(m, c);
    setCreate(false); setWish(''); setShown(k.id); setTimeout(() => setShown((s) => (s === k.id ? null : s)), 5000);
    chime();
  };

  useEffect(() => {
    if (!create) return;
    const k = (e) => { if (e.key === 'Escape') setCreate(false); };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [create]);

  const lanes = LANES.map((l, li) => ({
    ...l,
    items: [...ambient.filter((a) => a.lane === li), ...mine.slice(-10).filter((m) => m.lane === li).map((m) => ({ ...m, delay: m.id !== mine[mine.length - 1]?.id ? -Math.random() * 70 : m.delay }))],
  }));

  return (
    <div className="scene">
      <Fireworks />
      <div className="moon-s"><i /></div>
      <header className="scene-title">
        <h1>ลอยกระทงออนไลน์</h1>
        <p>ปล่อยคำอธิษฐานของคุณไปกับสายน้ำ</p>
      </header>
      <p className="counter">คุณลอยไปแล้ว <b>{count.toLocaleString('th-TH')}</b> กระทง</p>

      <div className="bld-wrap" aria-hidden="true">
        <Building tone="night" />
        <div className="bld-reflect"><div><Building tone="night" /></div></div>
      </div>
      <div className="shore" aria-hidden="true" />
      <div className="water" aria-hidden="true">
        <div className="moon-ref" />
        <div className="glint g1" /><div className="glint g2" /><div className="glint g3" />
      </div>

      <div className="lanes">
        {lanes.map((l, li) => (
          <div key={li} className="lane" style={{ zIndex: li + 3 }}>
            {l.items.map((it) => {
              const own = it.id.startsWith('m');
              return (
                <div key={it.id} className={`kr-item ${own ? 'own' : ''} ${shown === it.id ? 'show' : ''}`}
                  style={{ top: it.top + '%', width: 84 * l.scale, animationDuration: it.dur + 's', animationDelay: it.delay + 's', filter: `brightness(${l.bright})` }}
                  onClick={own ? () => setShown(shown === it.id ? null : it.id) : undefined}>
                  {own && <div className="bubble"><p>{it.wish}</p><b>— {it.name}</b></div>}
                  <Krathong color={it.color} />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <Lotus side="l" /><Lotus side="r" />
      <div className="fireflies" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (<span key={i} className="firefly" style={{ left: (8 + i * 12) + '%', bottom: (6 + (i * 37) % 22) + '%', animationDuration: (8 + (i % 4) * 1.5) + 's', animationDelay: -i * 1.3 + 's' }} />))}
      </div>

      <button className="btn create-btn" onClick={() => setCreate(true)}>🪷 สร้างกระทง</button>
      <button className="info-btn" onClick={() => setInfo(true)}>📖 เรื่องลอยกระทง</button>
      <button className="info-btn hist-btn" onClick={() => setHist(true)}>📜 ประวัติ</button>

      {create && (
        <div className="modal-bg" onClick={(e) => e.target === e.currentTarget && setCreate(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label="สร้างกระทง">
            <h3>สร้างกระทงของคุณ</h3>
            <div className="modal-prev"><Krathong color={color} /></div>
            <label htmlFor="nm">ชื่อ (ไม่บังคับ)</label>
            <input id="nm" maxLength={20} value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อของคุณ" />
            <label htmlFor="wish">คำอธิษฐาน</label>
            <textarea id="wish" maxLength={80} value={wish} onChange={(e) => setWish(e.target.value)} placeholder="ขอให้ทุกคนมีความสุข สุขภาพแข็งแรง…" />
            <label>สีกลีบดอกบัว</label>
            <div className="swatches">
              {COLORS.map((c) => (<button key={c} type="button" className={c === color ? 'on' : ''} style={{ background: c, color: c }} aria-label={'สี ' + c} onClick={() => setColor(c)} />))}
            </div>
            <div className="modal-actions">
              <button type="button" className="ghost" onClick={() => setCreate(false)}>ยกเลิก</button>
              <button type="button" className="btn" onClick={launch}>ลอยกระทง</button>
            </div>
          </div>
        </div>
      )}
      {info && <InfoPanel onClose={closeInfo} />}
      {hist && <HistoryPanel mine={mine} onClose={closeHist} onClear={() => { setMine([]); setCount(0); persist([], 0); }} />}
    </div>
  );
}
