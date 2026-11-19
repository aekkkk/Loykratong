'use client';
import { useState } from 'react';
import Building from './Building';

// เลื่อนเปรียบเทียบ ก่อน/หลังการปรับปรุง
export default function Compare() {
  const [pos, setPos] = useState(50);
  return (
    <div className="compare">
      <div className="cmp-stage">
        <Building tone="old" />
        <div className="cmp-top" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Building tone="new" />
        </div>
        <div className="cmp-handle" style={{ left: pos + '%' }}><span>⟷</span></div>
        <span className="cmp-tag l">หลังการปรับปรุง</span>
        <span className="cmp-tag r">ก่อนการปรับปรุง</span>
      </div>
      <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="เลื่อนเปรียบเทียบก่อนและหลังการปรับปรุง" />
    </div>
  );
}
