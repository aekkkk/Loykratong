'use client';
import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import Krathong from './Krathong';

const TIMELINE = [
  ['พิธีโบราณที่ริมน้ำ', 'ผู้คนในแถบลุ่มน้ำตั้งแต่โบราณมีพิธีบูชาแม่น้ำและลอยประทีปโคมไฟ ขอบคุณน้ำที่หล่อเลี้ยงชีวิต'],
  ['พิธีจองเปรียงจากอินเดีย', 'เชื่อกันว่าได้รับอิทธิพลจากพิธี “จองเปรียง” ของศาสนาพราหมณ์–ฮินดู คือการลอยประทีปบูชาพระผู้เป็นเจ้าในเดือน ๑๒ ซึ่งเป็นช่วงน้ำหลาก'],
  ['ผสมผสานกับพุทธศาสนา', 'เมื่อพุทธศาสนาแพร่หลาย ความหมายขยายเป็นการบูชารอยพระพุทธบาทที่หาดทรายแม่น้ำนัมมทานที และพระจุฬามณีเจดีย์บนสวรรค์'],
  ['ตำนานนางนพมาศ', 'เล่าสืบมาในตำราท้าวศรีจุฬาลักษณ์ว่านางนพมาศสนมของพระร่วงสมัยสุโขทัยประดิษฐ์กระทงรูปดอกบัวถวายพระร่วง นักประวัติศาสตร์เห็นว่าตำรานี้เรียบเรียงขึ้นภายหลังสมัยสุโขทัย จึงถือเป็นตำนานมากกว่าหลักฐานทางประวัติศาสตร์'],
  ['จากพิธีหลวงสู่ประเพณีของประชาชน', 'พิธีลอยพระประทีปมีทั้งในราชสำนักและในหมู่ราษฎร ค่อยๆ แพร่หลายเป็นประเพณีที่คนทุกชนชั้นร่วมกันทำ'],
  ['ปัจจุบัน', 'ลอยกระทงเป็นเทศกาลที่ผู้คนทั่วไทยและนักท่องเที่ยวร่วมสนุก พร้อมกับการรณรงค์ใช้กระทงจากวัสดุธรรมชาติและลอยอย่างรักษ์โลก'],
];

const FACTS = [
  ['ทำไมวันเพ็ญเดือน ๑๒', 'ตรงกับปลายฤดูฝน น้ำเต็มตลิ่ง แม่น้ำลำคลองสูงและสงบ เหมาะกับการลอยกระทง และเป็นคืนจันทร์เต็มดวงที่สว่างที่สุด'],
  ['ทำไมเป็นรูปดอกบัว', 'ดอกบัวเป็นดอกไม้มงคลของพุทธศาสนา กระทงทรงดอกบัวจึงสื่อถึงการบูชาและความบริสุทธิ์'],
  ['ธูป เทียน ดอกไม้ แทนอะไร', 'ธูป ๓ ดอกแทนพระรัตนตรัย เทียนแทนแสงสว่างแห่งปัญญา ดอกไม้แทนการบูชา'],
];

export default function HistoryPanel({ mine, onClose, onClear }) {
  const [tab, setTab] = useState('story');
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose(); };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [onClose]);
  const list = [...mine].reverse();

  return (
    <div className="info-panel" role="dialog" aria-modal="true" aria-label="ประวัติ">
      <button className="info-close" onClick={onClose} aria-label="ปิด">✕</button>
      <div className="info-scroll">
        <section style={{ paddingBottom: 10 }}>
          <h2>ประวัติ</h2>
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={tab === 'story'} className={tab === 'story' ? 'on' : ''} onClick={() => setTab('story')}>📜 ประวัติลอยกระทง</button>
            <button role="tab" aria-selected={tab === 'mine'} className={tab === 'mine' ? 'on' : ''} onClick={() => setTab('mine')}>🪷 กระทงของฉัน ({mine.length})</button>
          </div>
        </section>

        {tab === 'story' && (
          <section style={{ paddingTop: 20 }}>
            <div className="timeline">
              {TIMELINE.map(([t, d], n) => (<Reveal key={t} className="tl" delay={n * 80}><h3>{t}</h3><p>{d}</p></Reveal>))}
            </div>
            <h2 style={{ marginTop: 56, fontSize: '1.5rem' }}>รู้ไว้ก่อนลอย</h2>
            <div className="grid" style={{ marginTop: 20 }}>
              {FACTS.map(([t, d], n) => (<Reveal key={t} className="card" delay={n * 100}><h3>{t}</h3><p>{d}</p></Reveal>))}
            </div>
          </section>
        )}

        {tab === 'mine' && (
          <section style={{ paddingTop: 20 }}>
            {list.length === 0 ? (
              <p className="sub">ยังไม่มีกระทง ลองกด “สร้างกระทง” แล้วอธิษฐานดูนะ 🌙</p>
            ) : (
              <>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))' }}>
                  {list.map((k) => (
                    <div key={k.id} className="card hist-card">
                      <div className="hist-kr"><Krathong color={k.color} /></div>
                      <p className="hist-wish">“{k.wish}”</p>
                      <small>— {k.name}</small>
                      <small className="hist-date">{k.ts ? new Date(k.ts).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }) : ''}</small>
                    </div>
                  ))}
                </div>
                <p style={{ textAlign: 'center', marginTop: 24 }}>
                  <button className="ghost" onClick={onClear}>ล้างประวัติกระทง</button>
                </p>
                <p className="sub" style={{ marginTop: 10, fontSize: '.85rem' }}>ประวัตินี้เก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น</p>
              </>
            )}
          </section>
        )}
        <div style={{ height: 60 }} />
      </div>
    </div>
  );
}
