// ตึกอิฐแดงสไตล์โคโลเนียล 3 ชั้น (วาดด้วย SVG ล้อตามภาพอ้างอิง)
const PALETTES = {
  night: { wall: '#a8432f', wall2: '#8f3626', roof: '#5e1f1f', trim: '#e8dfcc', base: '#cfc5b0', win: '#ffd98a', lit: true },
  old:   { wall: '#c27a5c', wall2: '#a8664b', roof: '#c9651f', trim: '#cdc7bb', base: '#bfb9ad', win: '#6f7d8c', lit: false },
  new:   { wall: '#b5432d', wall2: '#9c3624', roof: '#6f2323', trim: '#f1ebdd', base: '#e2dccd', win: '#9dbbdc', lit: false },
};

function rng(seed) { // deterministic -> no hydration mismatch
  let a = seed;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

export default function Building({ tone = 'night', className = '' }) {
  const P = PALETTES[tone];
  const r = rng(7);
  const cols = Array.from({ length: 25 }, (_, i) => 66 + i * 35.5);
  const floors = [{ y: 172, h: 38 }, { y: 236, h: 38 }];
  const dormers = [150, 232, 314, 396, 604, 686, 768, 850];
  const doors = [166, 487, 808];

  return (
    <svg className={`building ${className}`} viewBox="0 0 1000 372" role="img" aria-label="ตึกอิฐแดงสไตล์โคโลเนียล" preserveAspectRatio="xMidYMax meet">
      <defs>
        <pattern id={`brick-${tone}`} width="12" height="6" patternUnits="userSpaceOnUse">
          <rect width="12" height="6" fill={P.wall} />
          <path d="M0 .5H12M6 .5V3.5M0 3.5H12M0 3.5V6.5" stroke={P.wall2} strokeWidth=".6" fill="none" />
        </pattern>
      </defs>

      {/* roof */}
      <polygon points="14,160 126,66 874,66 986,160" fill={P.roof} />
      <polygon points="126,66 874,66 880,76 120,76" fill="#000" opacity=".18" />
      {Array.from({ length: 9 }, (_, i) => (<line key={i} x1={20 + i * 3} y1={160 - i * 10.4} x2={980 - i * 3} y2={160 - i * 10.4} stroke="#000" opacity=".12" />))}
      {/* dormers */}
      {dormers.map((x, i) => (
        <g key={x}>
          <polygon points={`${x - 13},118 ${x},102 ${x + 13},118`} fill={P.trim} />
          <rect x={x - 11} y="118" width="22" height="26" fill={P.trim} />
          <rect x={x - 7} y="121" width="14" height="22" rx="7" fill={P.win} className={P.lit ? 'win' : ''} style={P.lit ? { animationDelay: `${(i * 0.7) % 4}s` } : undefined} />
        </g>
      ))}

      {/* walls */}
      <rect x="40" y="160" width="920" height="198" fill={`url(#brick-${tone})`} />
      <rect x="40" y="160" width="920" height="8" fill={P.trim} />
      <rect x="40" y="218" width="920" height="4" fill={P.trim} />
      <rect x="40" y="280" width="920" height="6" fill={P.trim} />

      {/* base (ground floor) */}
      <rect x="40" y="286" width="920" height="70" fill={P.base} />
      {Array.from({ length: 8 }, (_, i) => (<line key={i} x1="40" x2="960" y1={292 + i * 8} y2={292 + i * 8} stroke="#000" opacity=".08" />))}
      <rect x="36" y="356" width="928" height="10" fill={P.wall2} />
      {Array.from({ length: 24 }, (_, i) => (<ellipse key={i} cx={78 + i * 36.5} cy="361" rx="7" ry="2.6" fill="#000" opacity=".35" />))}

      {/* upper windows */}
      {floors.map((f, fi) => cols.map((x, ci) => {
        const dim = P.lit && r() < 0.22;
        return (
          <g key={`${fi}-${ci}`}>
            <rect x={x - 8} y={f.y - 4} width="16" height={f.h + 8} fill={P.trim} />
            <rect x={x - 6} y={f.y} width="12" height={f.h} fill={P.win}
              className={P.lit && !dim ? 'win' : ''} opacity={dim ? 0.35 : 1}
              style={P.lit && !dim ? { animationDelay: `${(r() * 6).toFixed(2)}s` } : undefined} />
            <line x1={x} x2={x} y1={f.y} y2={f.y + f.h} stroke={P.trim} strokeWidth="1" />
            <line x1={x - 6} x2={x + 6} y1={f.y + f.h * 0.45} y2={f.y + f.h * 0.45} stroke={P.trim} strokeWidth="1" />
          </g>
        );
      }))}

      {/* ground windows (arched) */}
      {cols.filter((x) => !doors.some((d) => Math.abs(d - x) < 30)).map((x, ci) => {
        const dim = P.lit && r() < 0.25;
        return (
          <g key={`g${ci}`}>
            <path d={`M${x - 9} 344V306a9 9 0 0 1 18 0V344z`} fill={P.trim} />
            <path d={`M${x - 6} 342V308a6 6 0 0 1 12 0V342z`} fill={P.win}
              className={P.lit && !dim ? 'win' : ''} opacity={dim ? 0.35 : 1}
              style={P.lit && !dim ? { animationDelay: `${(r() * 6).toFixed(2)}s` } : undefined} />
          </g>
        );
      })}
      {doors.map((x) => (
        <g key={x}>
          <path d={`M${x - 17} 356V304a17 17 0 0 1 34 0V356z`} fill={P.trim} />
          <path d={`M${x - 13} 356V306a13 13 0 0 1 26 0V356z`} fill={P.lit ? '#ffcf70' : P.win} className={P.lit ? 'win' : ''} />
          <line x1={x} x2={x} y1="294" y2="356" stroke={P.trim} />
          <rect x={x - 22} y="356" width="44" height="3" fill={P.trim} />
        </g>
      ))}

      {/* central pediment */}
      <polygon points="418,162 500,106 582,162" fill={P.trim} />
      <polygon points="432,160 500,114 568,160" fill={P.wall} />
      <circle cx="500" cy="140" r="9" fill={P.trim} />
      <circle cx="500" cy="140" r="6" fill={P.win} className={P.lit ? 'win' : ''} />
      <rect x="448" y="160" width="104" height="6" fill={P.trim} />
    </svg>
  );
}
