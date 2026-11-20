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
    <pre className="ascii" aria-label="ภาพกระทงดอกบัวแบบ ASCII art">
      <span className="fl">{FLAME[f % 3].join('\n')}</span>{'\n'}
      <span className="cd">{'              |=|'}</span>{'\n'}
      <span className="lt">{BODY}</span>{'\n'}
      <span className="wv">{w1}</span>{'\n'}
      <span className="wv dim">{w2}</span>
    </pre>
  );
}
