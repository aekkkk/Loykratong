"use client";

import { useEffect, useRef, useState } from "react";

/*
 * ASCII art เต็มความกว้าง footer: ท้องฟ้า ดาว พระจันทร์ แม่น้ำ และกระทงลอยไปตามน้ำ
 * วาดเป็นตาราง (ตัวอักษร + สี) แล้วรวมตัวอักษรสีเดียวกันเป็น span
 */

type Cell = { c: string; k: string };

const SKY_ROWS = 4;
const KR_ROWS = 4; // แถวของกระทงที่อยู่เหนือน้ำ
const WATER_ROWS = 7;
const ROWS = SKY_ROWS + KR_ROWS + WATER_ROWS;

// กระทงขนาดเล็ก กว้าง 9 ตัวอักษร (แถวสุดท้ายแตะผิวน้ำ)
const FLAMES = ["    (    ", "    )    ", "   (     ", "     )   "];
const SPRITE: [string, string][] = [
  ["   |=|   ", "cd"],
  [" \\/ | \\/ ", "pt"],
  ["\\_\\_|_/_/", "pt"],
  [" \\_____/ ", "lf"],
];
const MOON = [" .-. ", "(   )", " `-' "];
const WAVE_SETS = ["~  ~~ ~~~  ~ ~~  ", "-~ -- ~-  ~- -~~ ", "~ .  ~~ . ~  . ~ ", ".  ~  .  ~ .  ~  "];

const COLORS: Record<string, string> = {
  fl: "text-amber-300",
  gl: "text-amber-300/70",
  cd: "text-neutral-300",
  pt: "text-pink-300",
  lf: "text-emerald-400",
  mn: "text-amber-200",
  st: "text-white/70",
  w0: "text-sky-300",
  w1: "text-sky-400/85",
  w2: "text-sky-400/65",
  w3: "text-sky-500/50",
  w4: "text-sky-500/35",
  sp: "",
};

type Boat = { x: number; v: number; phase: number };

function seeded(n: number) {
  let a = n;
  return () => { a = (a * 9301 + 49297) % 233280; return a / 233280; };
}

export default function AsciiRiver() {
  const box = useRef<HTMLDivElement>(null);
  const probe = useRef<HTMLSpanElement>(null);
  const [cols, setCols] = useState(0);
  const [t, setT] = useState(0);
  const boats = useRef<Boat[]>([]);
  const stars = useRef<{ x: number; y: number; p: number }[]>([]);

  // วัดจำนวนคอลัมน์จากความกว้างจริง
  useEffect(() => {
    const measure = () => {
      if (!box.current || !probe.current) return;
      const cw = probe.current.getBoundingClientRect().width / 10;
      const n = Math.max(40, Math.floor(box.current.clientWidth / cw));
      setCols(n);
      const r = seeded(n);
      const count = Math.max(3, Math.round(n / 32));
      boats.current = Array.from({ length: count }, (_, i) => ({ x: (i / count) * n + r() * 8, v: 0.18 + r() * 0.14, phase: r() * 10 }));
      stars.current = Array.from({ length: Math.round(n / 7) }, () => ({ x: Math.floor(r() * n), y: Math.floor(r() * (SKY_ROWS - 1)), p: Math.floor(r() * 6) }))
        .filter((s) => s.x < n - 15 || s.x > n - 5); // เว้นที่ให้พระจันทร์
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  // แอนิเมชัน
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const i = setInterval(() => setT((x) => x + 1), 140);
    return () => clearInterval(i);
  }, []);

  if (!cols) {
    return (
      <div ref={box} className="w-full overflow-hidden font-mono text-[12px] leading-[1.25]">
        <span ref={probe} className="invisible absolute">0123456789</span>
        <pre className="m-0" style={{ height: `${ROWS * 1.25}em` }} />
      </div>
    );
  }

  const grid: Cell[][] = Array.from({ length: ROWS }, () => Array.from({ length: cols }, () => ({ c: " ", k: "sp" })));
  const put = (x: number, y: number, c: string, k: string) => {
    const xi = Math.round(x);
    if (y < 0 || y >= ROWS || xi < 0 || xi >= cols || c === " ") return;
    grid[y][xi] = { c, k };
  };

  // ดาว
  for (const s of stars.current) {
    const ph = (Math.floor(t / 4) + s.p) % 6;
    put(s.x, s.y, ph < 3 ? "." : ph < 5 ? "+" : "*", "st");
  }
  // พระจันทร์
  MOON.forEach((line, y) => [...line].forEach((c, x) => put(cols - 12 + x, y, c, "mn")));

  // น้ำ
  for (let r = 0; r < WATER_ROWS; r++) {
    const y = SKY_ROWS + KR_ROWS + r;
    const pat = WAVE_SETS[r % WAVE_SETS.length];
    const dir = r % 2 ? -1 : 1;
    const speed = 1 + (r % 3);
    const shift = Math.floor((t * speed) / 2) * dir + r * 5;
    const k = `w${Math.min(r, 4)}`;
    for (let x = 0; x < cols; x++) {
      const c = pat[(((x + shift) % pat.length) + pat.length) % pat.length];
      put(x, y, c, k);
    }
  }

  // กระทง + แสงสะท้อน
  for (const b of boats.current) {
    const x0 = ((b.x + t * b.v) % (cols + 12)) - 10;
    const bob = Math.floor((t / 7 + b.phase) % 2);
    const top = SKY_ROWS + bob - 1;
    const flame = FLAMES[Math.floor(t / 2 + b.phase) % FLAMES.length];
    [...flame].forEach((c, i) => put(x0 + i, top, c, "fl"));
    SPRITE.forEach(([line, k], j) => [...line].forEach((c, i) => put(x0 + i, top + 1 + j, c, k)));
    // แสงเทียนสะท้อนบนน้ำ
    for (let r = 0; r < 3; r++) {
      if ((t + r + Math.floor(b.phase)) % 3 === 0) continue;
      put(x0 + 4 + (r % 2 ? 1 : -1) * ((t >> 2) % 2), SKY_ROWS + KR_ROWS + bob + r, r ? "'" : "|", "gl");
    }
  }

  return (
    <div ref={box} className="w-full overflow-hidden font-mono text-[12px] leading-[1.25] select-none" aria-hidden="true">
      <span ref={probe} className="invisible absolute">0123456789</span>
      <pre className="m-0 whitespace-pre">
        {grid.map((row, y) => {
          const segs: { k: string; s: string }[] = [];
          for (const cell of row) {
            const last = segs[segs.length - 1];
            if (last && last.k === cell.k) last.s += cell.c;
            else segs.push({ k: cell.k, s: cell.c });
          }
          return (
            <div key={y}>
              {segs.map((s, i) => (s.k === "sp" ? s.s : <span key={i} className={COLORS[s.k]}>{s.s}</span>))}
            </div>
          );
        })}
      </pre>
    </div>
  );
}
