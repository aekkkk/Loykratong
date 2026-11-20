// ไอคอนเส้น (SVG) ใช้แทน emoji ทั้งเว็บ
const P = {
  lotus: <><path d="M12 20c-4 0-7-2.5-8-6 2.5-.3 5 .6 8 3 3-2.4 5.5-3.3 8-3-1 3.5-4 6-8 6z" /><path d="M12 17c-2-2-3-4.5-3-7 0-2 1-4 3-6 2 2 3 4 3 6 0 2.5-1 5-3 7z" /><path d="M8.6 14.6C6.5 13.6 5 11.6 4.6 9c2.2 0 4 .8 5.2 2.2M15.4 14.6c2.1-1 3.6-3 4-5.6-2.2 0-4 .8-5.2 2.2" /></>,
  scroll: <><path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8" /><path d="M6 4a2 2 0 0 0-2 2v2h4V6a2 2 0 0 0-2-2z" /><path d="M8 20a2 2 0 0 1-2-2V8M10 9h6M10 13h6M10 17h3" /></>,
  hands: <><path d="M12 21V11l-2.5-6.5a1.4 1.4 0 0 0-2.6 1L8 11l-3 5 3 5" /><path d="M12 21V11l2.5-6.5a1.4 1.4 0 0 1 2.6 1L16 11l3 5-3 5" /></>,
  wave: <><path d="M2 8c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" /><path d="M2 13c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" /><path d="M2 18c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" /></>,
  candle: <><path d="M12 3c1.6 1.8 1.6 3.6 0 5-1.6-1.4-1.6-3.2 0-5z" /><rect x="9.5" y="10" width="5" height="10" rx="1" /><path d="M7 20h10" /></>,
  sparkle: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" /></>,
  lantern: <><path d="M7 4h10l-2 14H9z" /><path d="M10 18v2h4v-2M9.5 8h5M9 12h6" /></>,
  temple: <><path d="M12 2v3M8 9l4-4 4 4" /><path d="M4 13l8-5 8 5" /><path d="M6 12v8h12v-8M10 20v-4h4v4M3 20h18" /></>,
  boat: <><path d="M3 15h18l-3 5H6z" /><path d="M12 4v11M12 5l6 8h-6" /><circle cx="8" cy="10" r="1.2" /></>,
  naga: <><path d="M4 18c3 0 3-4 6-4s3 4 6 4 3-4 4-6" /><path d="M20 12c0-3-2-5-4-5-1.5 0-2.5 1-2.5 2.2" /><circle cx="17.5" cy="8.6" r=".6" /></>,
  leaf: <><path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15z" /><path d="M5 19L13 11" /></>,
  moon: <><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></>,
  music: <><path d="M9 18V5l11-2v13" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="17.5" cy="16" r="2.5" /></>,
  mute: <><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M17 9l4 6M21 9l-4 6" /></>,
  volume: <><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" /></>,
  close: <><path d="M6 6l12 12M18 6L6 18" /></>,
  party: <><path d="M4 20l4-12 8 8z" /><path d="M14 4l1 2M19 9l2-1M17 3v3M20 13l1 1" /></>,
};

export default function Icon({ name, size = '1.15em', className = '' }) {
  return (
    <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name]}
    </svg>
  );
}
