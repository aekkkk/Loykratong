// เอฟเฟกต์ภาพสีน้ำทั้งเว็บ: ลายกระดาษ คราบสี ขอบกระดาษขรุขระ และกิ่งใบไม้ที่มุมจอ
function Branch({ className }) {
  const leaves = [
    [30, 40, -30], [62, 30, 10], [92, 52, -20], [120, 40, 25], [150, 64, -15], [176, 54, 30], [204, 80, -10], [228, 74, 35],
  ];
  return (
    <svg className={`branch ${className}`} viewBox="0 0 280 200" aria-hidden="true">
      <path d="M-10 10C40 30 90 40 140 60s90 40 140 80" stroke="#8a7f8f" strokeWidth="3" fill="none" opacity=".7" />
      {leaves.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r + (i % 2 ? 160 : 20)})`} className="leaf-sway" style={{ animationDelay: `${-i * .6}s` }}>
          <path d="M0 0C10-12 32-14 50-4 32 8 10 10 0 0z" fill={i % 3 ? '#9fbf8f' : '#7da577'} opacity=".82" />
          <path d="M2 0C18-3 32-3 46-3" stroke="#e8f2dc" strokeOpacity=".7" fill="none" />
        </g>
      ))}
    </svg>
  );
}

export default function Watercolor() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="wc-rough"><feTurbulence type="fractalNoise" baseFrequency=".018" numOctaves="3" seed="4" /><feDisplacementMap in="SourceGraphic" scale="38" /></filter>
        <filter id="wc-grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .45  0 0 0 0 .55  0 0 0 .55 0" /></filter>
      </svg>
      <div className="wc-blooms" aria-hidden="true"><i /><i /><i /><i /></div>
      <svg className="wc-grain" aria-hidden="true"><rect width="100%" height="100%" filter="url(#wc-grain)" /></svg>
      <div className="wc-frame" aria-hidden="true" />
      <Branch className="tl" />
      <Branch className="br" />
    </>
  );
}
