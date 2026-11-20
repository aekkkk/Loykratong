// กระทงดอกบัวสไตล์สีน้ำ: ใบตองรอบฐาน กลีบบัวสองชั้น เทียน และธูป 3 ดอก
const BACK = [-56, -28, 0, 28, 56];
const FRONT = [-70, -38, 38, 70];
const LEAVES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const PETAL = 'M0 0C-10-12-9-30 0-42 9-30 10-12 0 0z';
const SHINE = 'M0-6C-4-14-3-26 0-34 3-26 4-14 0-6z';

export function KrathongDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <radialGradient id="kr-glow"><stop offset="0" stopColor="#fff3b8" stopOpacity=".95" /><stop offset=".35" stopColor="#ffcf5c" stopOpacity=".45" /><stop offset="1" stopColor="#ffb340" stopOpacity="0" /></radialGradient>
        <linearGradient id="kr-leaf" x1="0" x2="1"><stop offset="0" stopColor="#3f7d3c" /><stop offset="1" stopColor="#8cc46a" /></linearGradient>
        <linearGradient id="kr-candle" x1="0" x2="1"><stop offset="0" stopColor="#f6c443" /><stop offset=".45" stopColor="#ffe9a0" /><stop offset="1" stopColor="#e9ae2e" /></linearGradient>
        <g id="kr">
          <ellipse cx="60" cy="100" rx="50" ry="8" fill="#2b2a7a" opacity=".35" />
          {/* leaf rosette */}
          <g transform="translate(60 93) scale(1 .42)">
            {LEAVES.map((a) => (<path key={a} d="M0 0C12-9 34-12 52-3 34 6 12 8 0 0z" fill="url(#kr-leaf)" stroke="#d9f0c4" strokeOpacity=".5" strokeWidth="1.2" transform={`rotate(${a})`} />))}
          </g>
          {/* back petals */}
          <g transform="translate(60 86)">
            {BACK.map((a) => (<g key={a} transform={`rotate(${a * 0.6}) scale(.82)`}><path d={PETAL} fill="var(--p,#f7a8c4)" stroke="#fff" strokeOpacity=".7" /><path d={SHINE} fill="#fff" opacity=".35" /></g>))}
          </g>
          {/* incense + candle */}
          {[[68, 8], [72, 13], [76, 18]].map(([x, r]) => (<g key={x} transform={`rotate(${r} ${x} 80)`}><rect x={x - 1} y="30" width="2.2" height="50" rx="1" fill="#c8562a" /><circle cx={x + .1} cy="30" r="1.6" fill="#ffb15c" /></g>))}
          <rect x="54" y="44" width="11" height="34" rx="2.5" fill="url(#kr-candle)" />
          {/* front petals */}
          <g transform="translate(60 94)">
            {FRONT.map((a) => (<g key={a} transform={`rotate(${a}) scale(.95)`}><path d={PETAL} fill="var(--p,#f7a8c4)" stroke="#fff" strokeOpacity=".75" /><path d={SHINE} fill="#fff" opacity=".4" /></g>))}
            <g transform="scale(1.05)"><path d={PETAL} fill="var(--p,#f7a8c4)" stroke="#fff" strokeOpacity=".8" /><path d={SHINE} fill="#fff" opacity=".45" /></g>
          </g>
          {/* flame */}
          <circle cx="59.5" cy="32" r="22" fill="url(#kr-glow)" />
          <path className="flame" d="M59.5 18c7 9 7 17 0 26-7-9-7-17 0-26z" fill="#ffb627" />
          <path className="flame" d="M59.5 27c3.4 4.5 3.4 9 0 13-3.4-4-3.4-8.5 0-13z" fill="#fff8d6" />
        </g>
      </defs>
    </svg>
  );
}

export default function Krathong({ color }) {
  return (
    <svg viewBox="0 0 120 120" style={{ '--p': color }}>
      <use href="#kr" />
    </svg>
  );
}
