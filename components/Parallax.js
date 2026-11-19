'use client';
import { useEffect, useRef } from 'react';

// ขยับตามการเลื่อนหน้า (ใช้กับพระจันทร์)
export default function Parallax({ speed = 0.25, className }) {
  const ref = useRef(null);
  useEffect(() => {
    let raf;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) ref.current.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    addEventListener('scroll', on, { passive: true });
    return () => { removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, [speed]);
  return <div ref={ref} className={className} />;
}
