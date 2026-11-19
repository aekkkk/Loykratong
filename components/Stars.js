'use client';
import { useEffect, useRef } from 'react';

export default function Stars() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d');
    let s = [], raf;
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
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); };
  }, []);
  return <canvas id="stars" ref={ref} />;
}
