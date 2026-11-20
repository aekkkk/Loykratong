// ต้นไม้ริมฝั่งสีครามอ่อน + เสาไฟสีทองและแสงสะท้อนบนน้ำ
const LAMPS = [6, 13, 21, 30, 70, 78, 86, 93];

export default function Shore() {
  return (
    <>
      <svg className="trees back" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60V38c20-14 40-16 60-6 14-16 40-20 58-4 20-12 44-10 60 2 16-14 40-14 56 0 20-10 40-8 54 4 20-18 46-18 64-2 16-8 30-6 44 4 18-16 44-18 62-2 20-10 40-10 56 2 18-14 42-16 60 0 16-10 38-8 52 4 20-16 48-18 66-2 18-8 34-6 48 4 18-14 42-14 58 0 18-12 40-12 56 0 14-8 30-6 46 2V60z" fill="#7c79c9" />
      </svg>
      <svg className="trees front" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60V46c14-10 30-12 44-2 12-12 32-14 46-2 10-6 22-6 30 2 14-12 36-12 48 0 10-6 20-4 28 2V60zM650 60V48c12-10 28-12 42-2 14-12 34-12 48 0 10-8 24-8 34 0 14-12 34-14 48-2 12-8 26-8 36 2 12-10 28-10 40 0 10-6 22-6 32 2V60z" fill="#5a58ad" />
      </svg>
      <div className="lamps" aria-hidden="true">
        {LAMPS.map((x, i) => <span key={x} style={{ left: x + '%', animationDelay: `${-i * .7}s` }} />)}
      </div>
      <div className="lamp-refs" aria-hidden="true">
        {LAMPS.map((x) => <span key={x} style={{ left: x + '%' }} />)}
      </div>
    </>
  );
}
