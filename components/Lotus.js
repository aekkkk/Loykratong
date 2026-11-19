// ดอกบัวและใบบัวมุมจอ
export default function Lotus({ side = 'l' }) {
  return (
    <svg className={`corner ${side}`} viewBox="0 0 260 200" aria-hidden="true">
      <ellipse cx="60" cy="176" rx="62" ry="16" fill="#2f7d4a" /><ellipse cx="60" cy="172" rx="58" ry="13" fill="#3f9d5b" />
      <ellipse cx="190" cy="186" rx="48" ry="12" fill="#2f7d4a" /><ellipse cx="190" cy="183" rx="44" ry="10" fill="#3f9d5b" />
      <g className="sway">
        <path d="M110 190C108 150 112 120 116 96" stroke="#2f7d4a" strokeWidth="4" fill="none" />
        <g transform="translate(116 96)" fill="#ff8fb8" stroke="#fff" strokeOpacity=".55">
          <path d="M0 0C-18-10-22-34 0-52 22-34 18-10 0 0z" />
          <path d="M-2 2C-26 0-40-20-34-38-14-36 0-22-2 2z" opacity=".9" />
          <path d="M2 2C26 0 40-20 34-38 14-36 0-22 2 2z" opacity=".9" />
          <path d="M-4 4C-24 14-44 8-50-8-30-12-10-6-4 4z" opacity=".8" />
          <path d="M4 4C24 14 44 8 50-8 30-12 10-6 4 4z" opacity=".8" />
        </g>
      </g>
      <g className="sway slow"><path d="M170 190C170 160 172 140 176 124" stroke="#2f7d4a" strokeWidth="3" fill="none" />
        <path d="M176 124c-8-10-8-22 0-32 8 10 8 22 0 32z" fill="#ffd3e4" /></g>
    </svg>
  );
}
