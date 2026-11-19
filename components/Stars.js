'use client';
import { useEffect, useRef } from 'react';

export default function Stars() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d');
    let s = [], raf, meteors = [];
    const size = () => {
      c.width = innerWidth; c.height = innerHeight;
      s = Array.from({ length: Math.floor((innerWidth * innerHeight) / 6500) }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        r: Math.random() * 1.4 + 0.2, p: Math.random() * 6.28, v: 0.4 + Math.random() * 1.2,
      }));
    };
    size();
    addEventListener('resize', size);
    const draw = (t) => {
      x.clearRect(0, 0, c.width, c.height);
      for (const o of s) {
        x.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin((t / 1000) * o.v + o.p));
        x.fillStyle = '#fff'; x.beginPath(); x.arc(o.x, o.y, o.r, 0, 6.28); x.fill();
      }
      if (Math.random() < 0.004 && meteors.length < 2) meteors.push({ x: Math.random() * c.width, y: Math.random() * c.height * 0.4, vx: 6 + Math.random() * 4, vy: 3 + Math.random() * 2, life: 1 });
      meteors = meteors.filter((m) => m.life > 0);
      for (const m of meteors) {
        const g = x.createLinearGradient(m.x, m.y, m.x - m.vx * 9, m.y - m.vy * 9);
        g.addColorStop(0, `rgba(255,240,200,${m.life})`); g.addColorStop(1, 'rgba(255,240,200,0)');
        x.globalAlpha = 1; x.strokeStyle = g; x.lineWidth = 2; x.beginPath(); x.moveTo(m.x, m.y); x.lineTo(m.x - m.vx * 9, m.y - m.vy * 9); x.stroke();
        m.x += m.vx; m.y += m.vy; m.life -= 0.012;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); };
  }, []);
  return <canvas id="stars" ref={ref} />;
}
