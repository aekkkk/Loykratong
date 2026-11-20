'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import Krathong from './Krathong';
import Countdown from './Countdown';
import AsciiArt from './AsciiArt';
import { STORE_KEY } from '../lib/krathong';

const meanings = [
  ['🙏', 'ขอบคุณพระแม่คงคา', 'ขอบคุณที่ให้น้ำอุดมสมบูรณ์หล่อเลี้ยงชีวิตและการเพาะปลูกตลอดปี'],
  ['🌊', 'ขอขมา', 'ขออภัยที่ได้ใช้น้ำ ทิ้งของเสีย หรือทำให้แหล่งน้ำสกปรก'],
  ['🪔', 'บูชารอยพระพุทธบาท', 'ตามความเชื่อ ลอยเพื่อบูชารอยพระพุทธบาทที่หาดทรายแม่น้ำนัมมทานที'],
  ['✨', 'ลอยความทุกข์', 'ตัดผมหรือเล็บใส่กระทง เพื่อให้เคราะห์ร้ายลอยตามน้ำไป และเริ่มต้นสิ่งใหม่ที่ดี'],
];
const steps = [
  ['ฐานกระทง', 'ตัดต้นกล้วยเป็นแว่นหนาประมาณ 1–2 นิ้ว ใช้เป็นฐานลอยน้ำ'],
  ['ใบตอง', 'พับใบตองเป็นกลีบแหลม เย็บด้วยไม้กลัดรอบฐาน ๒–๓ ชั้น'],
  ['ดอกไม้', 'ประดับด้วยดอกบัว ดอกดาวเรือง กล้วยไม้ ให้สวยงาม'],
  ['ธูปเทียน', 'ปักเทียน ๑ เล่ม และธูป ๓ ดอก ตรงกลาง'],
  ['อธิษฐาน', 'จุดเทียน ธูป ตั้งจิตอธิษฐาน แล้วค่อยๆ วางลงน้ำ'],
];
const regions = [
  ['🏮 เชียงใหม่ — ยี่เป็ง', 'ภาคเหนือ', 'ชาวล้านนาเรียก “ประเพณียี่เป็ง” (ยี่ = สอง, เป็ง = เพ็ญ) ปล่อยโคมลอยและประดับโคมไฟทั่วเมือง ขบวนแห่งดงามตระการตา'],
  ['🏯 สุโขทัย — เผาเทียนเล่นไฟ', 'ภาคกลาง', 'งานใหญ่ที่อุทยานประวัติศาสตร์สุโขทัย มีการแสดงแสงสีเสียงเล่าตำนานนางนพมาศ และขบวนแห่กระทงโบราณ'],
  ['🚣 ตาก — กระทงสาย', 'ภาคเหนือตอนล่าง', 'ชาวตากร้อยกระทงเล็กๆ ต่อกันเป็นสายยาว ลอยตามแม่น้ำปิง สว่างไสวสวยงามเป็นเอกลักษณ์'],
  ['🐉 หนองคาย — พญานาค', 'ภาคอีสาน', 'ลอยเรือไฟและกระทงริมโขง ผู้คนต่างเชื่อว่าพญานาคมาร่วมงาน'],
];
const tips = [
  'เลือกกระทงจากใบตอง ต้นกล้วย หรือวัสดุธรรมชาติที่ย่อยสลายได้',
  'หลีกเลี่ยงโฟม ตะปู ลวด ลวดเย็บกระดาษ และพลาสติก',
  'พิจารณาลอยกระทงร่วมกันเป็นกลุ่มเพื่อลดจำนวนกระทง',
  'ระวังไฟเทียนและพลุ ดูแลเด็กใกล้แหล่งน้ำ',
  'ทิ้งขยะให้ถูกที่ ไม่ทิ้งลงแม่น้ำ',
];
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

const Head = ({ title, sub }) => (<>
  <Reveal as="h2">{title}</Reveal>
  {sub && <Reveal as="p" className="sub">{sub}</Reveal>}
</>);

const GoBtn = () => <Link href="/float" className="btn go-btn">🪷 ไปลอยกระทง</Link>;

export default function HistoryPage() {
  const [mine, setMine] = useState([]);
  useEffect(() => {
    try { setMine(JSON.parse(localStorage.getItem(STORE_KEY) || 'null')?.mine || []); } catch {}
  }, []);
  const onClear = () => {
    setMine([]);
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ mine: [], count: 0 })); } catch {}
  };
  const list = [...mine].reverse();

  return (
    <div className="page-scroll">
      <div className="info-scroll">
        <section style={{ textAlign: 'center', paddingBottom: 20 }}>
          <h1 className="page-title">ลอยกระทง</h1>
          <p className="sub">ประวัติและเรื่องราวของประเพณีแห่งแสงเทียนและสายน้ำ</p>
          <Countdown />
          <p style={{ marginTop: 18 }}><GoBtn /></p>
        </section>

        <section>
          <Head title="ลอยกระทงคืออะไร" sub="ประเพณีไทยที่จัดขึ้นในคืนวันเพ็ญเดือน ๑๒" />
          <Reveal as="p" className="lead">
            ลอยกระทงเป็นประเพณีที่คนไทยนำ “กระทง” ซึ่งประดิษฐ์จากวัสดุธรรมชาติ ตกแต่งด้วยดอกไม้ ธูป เทียน
            ไปลอยในแม่น้ำลำคลอง เพื่อขอบคุณและขอขมาพระแม่คงคา พร้อมอธิษฐานขอให้สิ่งไม่ดีลอยไปกับสายน้ำ
          </Reveal>
          <div className="grid">
            {meanings.map(([i, t, d], n) => (
              <Reveal key={t} className="card" delay={n * 120}><div className="ico">{i}</div><h3>{t}</h3><p>{d}</p></Reveal>
            ))}
          </div>
        </section>

        <section>
          <Head title="ประวัติความเป็นมา" sub="จากพิธีโบราณสู่เทศกาลที่คนทั้งโลกรู้จัก" />
          <div className="timeline">
            {TIMELINE.map(([t, d], n) => (<Reveal key={t} className="tl" delay={n * 80}><h3>{t}</h3><p>{d}</p></Reveal>))}
          </div>
        </section>

        <section>
          <Head title="รู้ไว้ก่อนลอย" />
          <div className="grid" style={{ marginTop: 20 }}>
            {FACTS.map(([t, d], n) => (<Reveal key={t} className="card" delay={n * 100}><h3>{t}</h3><p>{d}</p></Reveal>))}
          </div>
        </section>

        <section>
          <Head title="วิธีทำกระทงแบบดั้งเดิม" sub="ง่าย สวย และรักษ์โลก" />
          <ol className="steps">
            {steps.map(([t, d], n) => (<Reveal as="li" key={t} delay={n * 110}><b>{t}</b><br />{d}</Reveal>))}
          </ol>
        </section>

        <section>
          <Head title="ลอยกระทงทั่วไทย" sub="แต่ละภาคมีเอกลักษณ์ของตัวเอง" />
          <div className="grid">
            {regions.map(([t, r, d], n) => (
              <Reveal key={t} className="card region" delay={n * 120}><h3>{t}</h3><small>{r}</small><p>{d}</p></Reveal>
            ))}
          </div>
        </section>

        <section>
          <Head title="ลอยกระทงอย่างรักษ์โลก" sub="ให้สายน้ำยังสวยงามสำหรับปีต่อๆ ไป" />
          <ul className="tips">
            {tips.map((t, n) => (<Reveal as="li" key={t} delay={n * 90}>{t}</Reveal>))}
          </ul>
        </section>

        <section>
          <Head title="กระทงของฉัน" sub={`ประวัติกระทงที่คุณเคยลอย (${mine.length})`} />
          {list.length === 0 ? (
            <p className="sub">ยังไม่มีกระทง ลองกด “ไปลอยกระทง” แล้วอธิษฐานดูนะ 🌙</p>
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
              <p style={{ textAlign: 'center', marginTop: 24 }}><button className="ghost" onClick={onClear}>ล้างประวัติกระทง</button></p>
              <p className="sub" style={{ marginTop: 10, fontSize: '.85rem' }}>ประวัตินี้เก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น</p>
            </>
          )}
        </section>

        <p style={{ textAlign: 'center', padding: '10px 0 30px' }}><GoBtn /></p>

        <footer className="site-footer">
          <AsciiArt />
          <p className="ft-title">สุขสันต์วันลอยกระทง</p>
          <p className="ft-sub">ขอให้ความทุกข์ลอยไปกับสายน้ำ และความสุขสว่างไสวเหมือนแสงจันทร์วันเพ็ญ 🌕</p>
        </footer>
      </div>
    </div>
  );
}
