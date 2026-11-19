'use client';
import { useEffect, useRef } from 'react';

const PAL = ['#ffd166', '#ff6b9d', '#7fd6ff', '#c58bff', '#ff9f1c', '#fff4d6'];

// พลุบนท้องฟ้า
export default function Fireworks() {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = ref.current, x = c.getContext('2d');
    let parts = [], raf, last = performance.now(), next = 800;
    const size = () => { c.width = innerWidth; c.height = innerHeight; };
    size(); addEventListener('resize', size);
    const burst = () => {
      const cx = c.width * (0.1 + Math.random() * 0.8), cy = c.height * (0.08 + Math.random() * 0.3);
      const col = PAL[(Math.random() * PAL.length) | 0], n = 46;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * 6.283, v = 1.2 + Math.random() * 2.4;
        parts.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, col });
      }
    };
    const loop = (t) => {
      const dt = Math.min(t - last, 50); last = t; next -= dt;
      if (next <= 0) { burst(); next = 2200 + Math.random() * 2800; }
      x.clearRect(0, 0, c.width, c.height);
      parts = parts.filter((p) => p.life > 0);
      for (const p of parts) {
        p.x += p.vx * (dt / 16); p.y += p.vy * (dt / 16); p.vy += 0.018 * (dt / 16); p.vx *= 0.99; p.life -= 0.012 * (dt / 16);
        x.globalAlpha = Math.max(p.life, 0); x.fillStyle = p.col; x.shadowColor = p.col; x.shadowBlur = 8;
        x.beginPath(); x.arc(p.x, p.y, 2, 0, 6.283); x.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); };
  }, []);
  return <canvas ref={ref} className="fireworks" aria-hidden="true" />;
}
