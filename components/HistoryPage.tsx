"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, Check, CircleHelp, Flame, Flower2, HandHeart, MapPin, Moon, Sparkles, Waves,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { DesignButton } from "@/components/ui/DesignButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge, CountBadge } from "@/components/ui/Badge";
import Krathong from "@/components/Krathong";
import AsciiRiver from "@/components/AsciiRiver";
import Credit from "@/components/Credit";
import ThemeSwitch from "@/components/ThemeSwitch";
import Countdown, { useCountdown } from "@/components/Countdown";
import { STORE_KEY } from "@/lib/krathong";

const MEANINGS = [
  { icon: HandHeart, t: "ขอบคุณพระแม่คงคา", d: "ขอบคุณที่ให้น้ำอุดมสมบูรณ์หล่อเลี้ยงชีวิตและการเพาะปลูกตลอดปี" },
  { icon: Waves, t: "ขอขมา", d: "ขออภัยที่ได้ใช้น้ำ ทิ้งของเสีย หรือทำให้แหล่งน้ำสกปรก" },
  { icon: Flame, t: "บูชารอยพระพุทธบาท", d: "ตามความเชื่อ ลอยเพื่อบูชารอยพระพุทธบาทที่หาดทรายแม่น้ำนัมมทานที" },
  { icon: Sparkles, t: "ลอยความทุกข์", d: "ตัดผมหรือเล็บใส่กระทง เพื่อให้เคราะห์ร้ายลอยตามน้ำไป และเริ่มต้นสิ่งใหม่ที่ดี" },
];

const TIMELINE = [
  ["พิธีโบราณที่ริมน้ำ", "ผู้คนในแถบลุ่มน้ำตั้งแต่โบราณมีพิธีบูชาแม่น้ำและลอยประทีปโคมไฟ ขอบคุณน้ำที่หล่อเลี้ยงชีวิต"],
  ["พิธีจองเปรียงจากอินเดีย", "เชื่อกันว่าได้รับอิทธิพลจากพิธี “จองเปรียง” ของศาสนาพราหมณ์–ฮินดู คือการลอยประทีปบูชาพระผู้เป็นเจ้าในเดือน ๑๒ ซึ่งเป็นช่วงน้ำหลาก"],
  ["ผสมผสานกับพุทธศาสนา", "เมื่อพุทธศาสนาแพร่หลาย ความหมายขยายเป็นการบูชารอยพระพุทธบาทที่หาดทรายแม่น้ำนัมมทานที และพระจุฬามณีเจดีย์บนสวรรค์"],
  ["ตำนานนางนพมาศ", "เล่าสืบมาในตำราท้าวศรีจุฬาลักษณ์ว่านางนพมาศสนมของพระร่วงสมัยสุโขทัยประดิษฐ์กระทงรูปดอกบัวถวายพระร่วง นักประวัติศาสตร์เห็นว่าตำรานี้เรียบเรียงขึ้นภายหลังสมัยสุโขทัย จึงถือเป็นตำนานมากกว่าหลักฐานทางประวัติศาสตร์"],
  ["จากพิธีหลวงสู่ประเพณีของประชาชน", "พิธีลอยพระประทีปมีทั้งในราชสำนักและในหมู่ราษฎร ค่อยๆ แพร่หลายเป็นประเพณีที่คนทุกชนชั้นร่วมกันทำ"],
  ["ปัจจุบัน", "ลอยกระทงเป็นเทศกาลที่ผู้คนทั่วไทยและนักท่องเที่ยวร่วมสนุก พร้อมกับการรณรงค์ใช้กระทงจากวัสดุธรรมชาติและลอยอย่างรักษ์โลก"],
];

const FACTS = [
  ["ทำไมต้องวันเพ็ญเดือน ๑๒", "ตรงกับปลายฤดูฝน น้ำเต็มตลิ่ง แม่น้ำลำคลองสูงและสงบ เหมาะกับการลอยกระทง และเป็นคืนจันทร์เต็มดวงที่สว่างที่สุด"],
  ["ทำไมกระทงเป็นรูปดอกบัว", "ดอกบัวเป็นดอกไม้มงคลของพุทธศาสนา กระทงทรงดอกบัวจึงสื่อถึงการบูชาและความบริสุทธิ์"],
  ["ธูป เทียน ดอกไม้ แทนอะไร", "ธูป ๓ ดอกแทนพระรัตนตรัย เทียนแทนแสงสว่างแห่งปัญญา ดอกไม้แทนการบูชา"],
];

const STEPS = [
  ["ฐานกระทง", "ตัดต้นกล้วยเป็นแว่นหนาประมาณ 1–2 นิ้ว ใช้เป็นฐานลอยน้ำ"],
  ["ใบตอง", "พับใบตองเป็นกลีบแหลม เย็บด้วยไม้กลัดรอบฐาน ๒–๓ ชั้น"],
  ["ดอกไม้", "ประดับด้วยดอกบัว ดอกดาวเรือง กล้วยไม้ ให้สวยงาม"],
  ["ธูปเทียน", "ปักเทียน ๑ เล่ม และธูป ๓ ดอก ตรงกลาง"],
  ["อธิษฐาน", "จุดเทียน ธูป ตั้งจิตอธิษฐาน แล้วค่อยๆ วางลงน้ำ"],
];

const REGIONS = [
  ["เชียงใหม่ — ยี่เป็ง", "ภาคเหนือ", "ชาวล้านนาเรียก “ประเพณียี่เป็ง” (ยี่ = สอง, เป็ง = เพ็ญ) ปล่อยโคมลอยและประดับโคมไฟทั่วเมือง ขบวนแห่งดงามตระการตา"],
  ["สุโขทัย — เผาเทียนเล่นไฟ", "ภาคกลาง", "งานใหญ่ที่อุทยานประวัติศาสตร์สุโขทัย มีการแสดงแสงสีเสียงเล่าตำนานนางนพมาศ และขบวนแห่กระทงโบราณ"],
  ["ตาก — กระทงสาย", "ภาคเหนือตอนล่าง", "ชาวตากร้อยกระทงเล็กๆ ต่อกันเป็นสายยาว ลอยตามแม่น้ำปิง สว่างไสวสวยงามเป็นเอกลักษณ์"],
  ["หนองคาย — พญานาค", "ภาคอีสาน", "ลอยเรือไฟและกระทงริมโขง ผู้คนต่างเชื่อว่าพญานาคมาร่วมงาน"],
];

const TIPS = [
  "เลือกกระทงจากใบตอง ต้นกล้วย หรือวัสดุธรรมชาติที่ย่อยสลายได้",
  "หลีกเลี่ยงโฟม ตะปู ลวด ลวดเย็บกระดาษ และพลาสติก",
  "พิจารณาลอยกระทงร่วมกันเป็นกลุ่มเพื่อลดจำนวนกระทง",
  "ระวังไฟเทียนและพลุ ดูแลเด็กใกล้แหล่งน้ำ",
  "ทิ้งขยะให้ถูกที่ ไม่ทิ้งลงแม่น้ำ",
];

const NAV = [
  ["#meaning", "ความหมาย"],
  ["#history", "ประวัติ"],
  ["#how", "วิธีทำ"],
  ["#regions", "ทั่วไทย"],
  ["#mine", "กระทงของฉัน"],
];

type Mine = { id: string; color: string; name: string; wish: string; ts?: number };

function Section({ id, title, lead, children }: { id: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--color-border)] pt-12 pb-4">
      <h2 className="type-h3 m-0">{title}</h2>
      {lead && <p className="mt-2 mb-0 text-[var(--color-text-muted)]">{lead}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function HistoryPage() {
  const router = useRouter();
  const cd = useCountdown(60000);
  const [mine, setMine] = useState<Mine[]>([]);

  useEffect(() => {
    try { setMine(JSON.parse(localStorage.getItem(STORE_KEY) || "null")?.mine || []); } catch {}
  }, []);

  const clear = () => {
    setMine([]);
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ mine: [], count: 0 })); } catch {}
  };
  const go = () => router.push("/float");
  const list = [...mine].reverse();

  return (
    <div className="min-h-dvh">
      {/* header */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-canvas)_82%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1080px] items-center gap-6 px-5">
          <a href="#top" className="flex shrink-0 items-center gap-2.5 font-semibold whitespace-nowrap tracking-tight text-[var(--color-text)] no-underline">
            <span className="grid size-8 place-items-center rounded-[10px] bg-neutral-900 text-white home-dark:bg-neutral-100 home-dark:text-neutral-950">
              <Flower2 size={18} strokeWidth={1.8} aria-hidden="true" />
            </span>
            ลอยกระทง
          </a>
          <nav className="hidden items-center gap-5 md:flex" aria-label="สารบัญ">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} className="type-ui text-[var(--color-text-muted)] no-underline transition-colors hover:text-[var(--color-text)]">{label}</a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <ThemeSwitch className="origin-right scale-[.8]" />
            <span className="hidden sm:block"><DesignButton onClick={go}>ไปลอยกระทง <ArrowRight aria-hidden="true" /></DesignButton></span>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[680px] px-5">
        {/* hero */}
        <section className="pt-16 pb-12 sm:pt-24">
          <div className="flex flex-wrap items-center gap-2">
            {cd && (cd.today
              ? <StatusBadge status="ready">วันนี้คือวันลอยกระทง</StatusBadge>
              : <StatusBadge status="scheduled">อีก {cd.parts[0]} วัน</StatusBadge>)}
            {cd && <span className="type-ui text-[var(--color-text-muted)]">{cd.target.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" })}</span>}
          </div>
          <h1 className="type-h1 mt-6 mb-0">ลอยกระทง</h1>
          <p className="type-body-lg mt-4 mb-0 max-w-[56ch] text-[var(--color-text-paragraph)]">
            ประเพณีแห่งแสงเทียนและสายน้ำในคืนวันเพ็ญเดือน ๑๒ — ความหมาย ประวัติ วิธีทำกระทง
            และเรื่องราวจากทั่วไทย พร้อมลอยกระทงออนไลน์ของคุณเอง
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <DesignButton size="lg" onClick={go}><Flower2 aria-hidden="true" /> ไปลอยกระทง</DesignButton>
            <DesignButton size="lg" variant="secondary" onClick={() => document.getElementById("history")?.scrollIntoView({ behavior: "smooth" })}>อ่านประวัติ</DesignButton>
          </div>

          <Countdown className="mt-12" />

          <figure className="mt-12 mb-0">
            <div className="rounded-[var(--radius-card)] p-1 shadow-[var(--shadow-border)]">
              <div className="relative grid h-[260px] place-items-center overflow-hidden rounded-[16px] bg-gradient-to-b from-[#2b2f86] via-[#5d55bf] to-[#e3a2c8]">
                <div className="absolute top-6 left-8 size-14 rounded-full bg-[radial-gradient(circle_at_40%_38%,#fffbe0,#f5cf6c)] shadow-[0_0_60px_20px_rgba(255,220,150,.35)]" />
                <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-[#7d73d0] to-[#4a47a8]" />
                <div className="relative mt-16 w-[150px] [&_svg]:animate-[bob_3s_ease-in-out_infinite]"><Krathong color="#f7a8c4" /></div>
              </div>
            </div>
            <figcaption className="type-caption mt-3 text-center text-[var(--color-text-muted)]">กระทงดอกบัว ใบตอง เทียน และธูป ๓ ดอก</figcaption>
          </figure>
        </section>

        <Section id="meaning" title="ลอยกระทงคืออะไร" lead="คนไทยนำกระทงจากวัสดุธรรมชาติ ตกแต่งด้วยดอกไม้ ธูป เทียน ไปลอยในแม่น้ำลำคลอง ด้วยความหมาย 4 อย่าง">
          <Accordion type="single" collapsible defaultValue="m0">
            {MEANINGS.map(({ icon: Icon, t, d }, i) => (
              <AccordionItem key={t} value={`m${i}`}>
                <AccordionTrigger icon={<Icon size={18} />}>{t}</AccordionTrigger>
                <AccordionContent>{d}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <Section id="history" title="ประวัติความเป็นมา" lead="จากพิธีโบราณริมน้ำสู่เทศกาลที่คนทั้งโลกรู้จัก">
          <ol className="m-0 list-none p-0">
            {TIMELINE.map(([t, d], i) => (
              <li key={t} className="relative grid grid-cols-[28px_1fr] gap-4 pb-8 last:pb-0">
                <span className="type-caption relative z-[1] grid size-7 place-items-center rounded-full bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] shadow-[var(--shadow-border)] tabular-nums">{i + 1}</span>
                {i < TIMELINE.length - 1 && <span aria-hidden="true" className="absolute top-8 bottom-1 left-[13.5px] w-px bg-[var(--color-border)]" />}
                <div>
                  <h3 className="type-h5 m-0">{t}</h3>
                  <p className="mt-1 mb-0 text-[var(--color-text-paragraph)]">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="facts" title="รู้ไว้ก่อนลอย">
          <Accordion type="multiple">
            {FACTS.map(([t, d], i) => (
              <AccordionItem key={t} value={`f${i}`}>
                <AccordionTrigger icon={<CircleHelp size={18} />}>{t}</AccordionTrigger>
                <AccordionContent>{d}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <Section id="how" title="วิธีทำกระทงแบบดั้งเดิม" lead="ง่าย สวย และย่อยสลายได้">
          <ol className="m-0 grid list-none gap-3 p-0">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="flex gap-4 rounded-[var(--radius-panel)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-border)]">
                <span className="type-ui grid size-7 shrink-0 place-items-center rounded-full bg-neutral-900 font-semibold text-white tabular-nums home-dark:bg-neutral-100 home-dark:text-neutral-950">{i + 1}</span>
                <div>
                  <p className="m-0 font-medium">{t}</p>
                  <p className="type-ui mt-0.5 mb-0 text-[var(--color-text-muted)]">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="regions" title="ลอยกระทงทั่วไทย" lead="แต่ละภาคมีเอกลักษณ์ของตัวเอง">
          <Accordion type="single" collapsible defaultValue="r0">
            {REGIONS.map(([t, r, d], i) => (
              <AccordionItem key={t} value={`r${i}`}>
                <AccordionTrigger icon={<MapPin size={18} />}>{t}</AccordionTrigger>
                <AccordionContent>
                  <span className="type-caption mb-1 block text-[var(--color-text-muted)]">{r}</span>
                  {d}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <Section id="green" title="ลอยกระทงอย่างรักษ์โลก" lead="ให้สายน้ำยังสวยงามสำหรับปีต่อๆ ไป">
          <ul className="m-0 grid list-none gap-3 p-0">
            {TIPS.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-[5px] grid size-5 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--color-success)_14%,var(--color-surface))] text-[var(--color-success)]">
                  <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="text-[var(--color-text-paragraph)]">{t}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="mine" title="กระทงของฉัน" lead="ประวัติกระทงที่คุณเคยลอย เก็บไว้ในเบราว์เซอร์นี้เท่านั้น">
          {list.length === 0 ? (
            <div className="grid place-items-center rounded-[var(--radius-card)] bg-[var(--color-surface-muted)] shadow-[var(--shadow-border)]">
              <EmptyState
                icon={<div className="w-[84px]"><Krathong color="#f7a8c4" /></div>}
                title="ยังไม่มีกระทง"
                description="ลองไปลอยกระทง เขียนคำอธิษฐาน แล้วกลับมาดูประวัติของคุณที่นี่"
                actionLabel="ไปลอยกระทง"
                actionIcon={<Flower2 />}
                onAction={go}
                className="w-full !text-[var(--color-text)]"
              />
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center gap-2">
                <span className="type-ui text-[var(--color-text-muted)]">ทั้งหมด</span>
                <CountBadge count={list.length} label={`${list.length} กระทง`} />
              </div>
              <ul className="m-0 list-none divide-y divide-[var(--color-border)] border-y border-[var(--color-border)] p-0">
                {list.map((k) => (
                  <li key={k.id} className="flex items-center gap-4 py-3">
                    <div className="w-12 shrink-0"><Krathong color={k.color} /></div>
                    <div className="min-w-0 flex-1">
                      <p className="m-0 truncate">“{k.wish}”</p>
                      <p className="type-caption m-0 text-[var(--color-text-muted)]">
                        {k.name}{k.ts ? ` · ${new Date(k.ts).toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" })}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-end">
                <DesignButton variant="ghost" size="sm" onClick={clear}>ล้างประวัติ</DesignButton>
              </div>
            </>
          )}
        </Section>
      </main>

      <footer className="relative mt-20 overflow-hidden bg-gradient-to-b from-[#0a0f24] via-[#0d1532] to-[#0a1a33] text-white">
        <div className="mx-auto flex max-w-[680px] flex-col items-center gap-2 px-5 pt-14 text-center">
          <p className="type-h5 m-0 flex items-center gap-2"><Moon size={18} aria-hidden="true" /> สุขสันต์วันลอยกระทง</p>
          <Credit className="type-ui m-0 text-white/60" />
        </div>
        <div className="mt-6 pb-16">
          <AsciiRiver />
        </div>
      </footer>
    </div>
  );
}
