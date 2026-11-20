'use client';
import { useEffect, useState } from 'react';

// กระทงดอกบัวแบบ ASCII art (สมมาตรซ้าย-ขวา) เปลวเทียนและคลื่นน้ำขยับได้
const SWAP = { '/': '\\', '\\': '/', '(': ')', ')': '(' };
const mirror = (left, mid) => left + mid + [...left].reverse().map((c) => SWAP[c] || c).join('');

const BODY = [
  ['         _    |', '='],
  ['        / \\  .|', '='],
  ['   _   /   \\/ |', '='],
  ['  / \\_/    /  |', '='],
  ['  \\   \\   /   |', '='],
  ['   \\   \\ /    |', '='],
  [' ___\\___V_____|', '_'],
  [' \\~~~~~~~~~~~~~', '~'],
  ["  '-.__________", '_'],
].map(([l, m]) => mirror(l, m)).join('\n');

const FLAME = [
  ['               (', '              ) )', '              (_)'],
  ['               )', '              ( (', '              (_)'],
  ['              ( )', '               ) ', '              (_)'],
];
const WAVE = '~~~~   ~~~~~~~~   ~~~~~~   ~~~~~~~~   ';

export default function AsciiArt() {
  const [f, setF] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setF((x) => x + 1), 320);
    return () => clearInterval(i);
  }, []);
  const w1 = (WAVE + WAVE).slice(f % WAVE.length, (f % WAVE.length) + 31);
  const w2 = (WAVE + WAVE).slice((WAVE.length - (f % WAVE.length)) % WAVE.length + 7).slice(0, 31);
  return (
    <pre className="m-0 inline-block text-left font-mono text-[11px] leading-[1.3] text-neutral-400 sm:text-[12.5px]" aria-label="ภาพกระทงดอกบัวแบบ ASCII art">
      <span className="text-amber-500">{FLAME[f % 3].join('\n')}</span>{'\n'}
      <span className="text-neutral-500">{'              |=|'}</span>{'\n'}
      <span className="text-pink-400">{BODY}</span>{'\n'}
      <span className="text-sky-400">{w1}</span>{'\n'}
      <span className="text-sky-400/50">{w2}</span>
    </pre>
  );
}
