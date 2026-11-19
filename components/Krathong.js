export function KrathongDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <g id="kr">
          <ellipse cx="60" cy="108" rx="52" ry="9" fill="#000" opacity=".25" />
          <ellipse cx="60" cy="92" rx="48" ry="14" fill="#e8d28a" />
          <ellipse cx="60" cy="88" rx="48" ry="12" fill="#f6e6a4" />
          <ellipse cx="60" cy="88" rx="34" ry="7" fill="none" stroke="#c9ad58" strokeWidth="1.5" />
          <path d="M14 88c8-20 20-26 46-26s38 6 46 26c-14-10-30-14-46-14S28 78 14 88z" fill="#3f9d5b" />
          <g fill="var(--p,#ff8fb8)" stroke="#fff" strokeOpacity=".55" strokeWidth="1">
            <path d="M60 78C44 66 40 46 60 30c20 16 16 36 0 48z" />
            <path d="M58 80C38 78 26 60 30 44c18 2 32 14 28 36z" />
            <path d="M62 80C82 78 94 60 90 44c-18 2-32 14-28 36z" />
            <path d="M54 82C36 88 18 78 14 62c16-4 32 4 40 20z" opacity=".9" />
            <path d="M66 82c18 6 36-4 40-20-16-4-32 4-40 20z" opacity=".9" />
          </g>
          <rect x="56" y="46" width="8" height="26" rx="2" fill="#fff4d6" />
          <rect x="50" y="52" width="2" height="26" fill="#a0522d" transform="rotate(-14 51 65)" />
          <rect x="68" y="52" width="2" height="26" fill="#a0522d" transform="rotate(14 69 65)" />
          <path className="flame" d="M60 24c7 8 7 15 0 20-7-5-7-12 0-20z" fill="#ffb627" />
          <path className="flame" d="M60 31c3 4 3 8 0 11-3-3-3-7 0-11z" fill="#fff6c9" />
          <circle cx="60" cy="34" r="16" fill="#ffd166" opacity=".16" />
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
