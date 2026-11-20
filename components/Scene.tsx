"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowLeft, Flower2, X } from "lucide-react";
import Building from "@/components/Building";
import Krathong from "@/components/Krathong";
import Shore from "@/components/Shore";
import Stars from "@/components/Stars";
import Lanterns from "@/components/Lanterns";
import Credit from "@/components/Credit";
import { DesignButton } from "@/components/ui/DesignButton";
import { CountBadge } from "@/components/ui/Badge";
import { useToastStack } from "@/components/ui/ToastStack";
import dialog from "@/components/ui/success-dialog.module.css";
import { COLORS, STORE_KEY, chime } from "@/lib/krathong";
import { cn } from "@/lib/utils";

type Item = { id: string; lane: number; color: string; dur: number; delay: number; top: number; name?: string; wish?: string; ts?: number };

const LANES = [{ scale: 0.6, bright: 0.75 }, { scale: 0.8, bright: 0.9 }, { scale: 1, bright: 1 }];
const COLOR_NAMES = ["ชมพู", "พีช", "ม่วง", "ฟ้า", "เหลือง", "ขาว"];

function load(): { mine: Item[]; count: number } {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || "null") || { mine: [], count: 0 }; } catch { return { mine: [], count: 0 }; }
}
function save(mine: Item[], count: number) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ mine: mine.slice(-30), count })); } catch {}
}

export default function Scene() {
  const router = useRouter();
  const toast = useToastStack();
  const [ambient, setAmbient] = useState<Item[]>([]);
  const [mine, setMine] = useState<Item[]>([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [shown, setShown] = useState<string | null>(null);

  useEffect(() => {
    setAmbient(LANES.flatMap((_, li) => Array.from({ length: 5 }, (_, i) => {
      const dur = 60 + Math.random() * 40 + (2 - li) * 12;
      return { id: `a${li}-${i}`, lane: li, color: COLORS[(i + li) % COLORS.length], dur, delay: -Math.random() * dur, top: li === 2 ? 2 + Math.random() * 26 : 8 + Math.random() * 46 };
    })));
    const saved = load();
    // กระทงที่เคยลอยไว้: สุ่มตำแหน่งครั้งเดียวตอนโหลด
    setMine((saved.mine || []).map((m) => ({ ...m, delay: -Math.random() * (m.dur || 80) })));
    setCount(saved.count || 0);
  }, []);

  const launch = () => {
    const k: Item = {
      id: "m" + Date.now(), lane: 2, color,
      name: name.trim() || "ผู้ไม่ประสงค์ออกนาม", wish: wish.trim() || "ขอให้ทุกคนมีความสุข",
      ts: Date.now(), dur: 80, delay: -9, top: 2 + Math.random() * 26,
    };
    const m = [...mine, k].slice(-30), c = count + 1;
    setMine(m); setCount(c); save(m, c);
    setOpen(false); setWish("");
    setShown(k.id); setTimeout(() => setShown((s) => (s === k.id ? null : s)), 5000);
    chime();
    toast.add({ type: "success", title: "ลอยกระทงแล้ว", description: `“${k.wish}”` });
  };

  const visibleMine = mine.slice(-10);

  return (
    <div className="scene" data-home-theme="dark">
      <Stars />
      <Lanterns />
      <div className="moon-s"><i /></div>
      <div className="clouds" aria-hidden="true"><span className="c1" /><span className="c2" /><span className="c3" /><span className="c4" /></div>
      <div className="horizon-glow" aria-hidden="true" />

      <header className="scene-title">
        <h1>ลอยกระทงออนไลน์</h1>
        <p>ปล่อยคำอธิษฐานของคุณไปกับสายน้ำ</p>
      </header>

      <div className="scene-back">
        <DesignButton variant="secondary" size="sm" onClick={() => router.push("/")}>
          <ArrowLeft aria-hidden="true" /> ประวัติและเรื่องราว
        </DesignButton>
      </div>
      <div className="counter flex items-center gap-2 rounded-full bg-[var(--color-surface)]/80 py-1 pr-1 pl-3 text-[13px] text-[var(--color-text)] shadow-[var(--shadow-border)] backdrop-blur">
        คุณลอยไปแล้ว <CountBadge count={count} max={999} variant="emphasis" label={`${count} กระทง`} /> กระทง
      </div>

      <div className="bld-wrap" aria-hidden="true">
        <Building tone="dusk" />
        <div className="bld-reflect"><div><Building tone="dusk" /></div></div>
      </div>
      <Shore />
      <div className="water" aria-hidden="true">
        <div className="moon-ref" />
        <div className="glint" /><div className="glint g2" /><div className="glint g3" />
      </div>

      <div className="lanes">
        {LANES.map((l, li) => (
          <div key={li} className="lane" style={{ zIndex: li + 3 }}>
            {[...ambient.filter((a) => a.lane === li), ...visibleMine.filter((m) => m.lane === li)].map((it) => {
              const own = it.id.startsWith("m");
              return (
                <div
                  key={it.id}
                  className={cn("kr-item", own && "own", shown === it.id && "show")}
                  style={{ top: it.top + "%", width: 84 * l.scale, animationDuration: it.dur + "s", animationDelay: it.delay + "s", filter: `brightness(${l.bright})` }}
                  onClick={own ? () => setShown(shown === it.id ? null : it.id) : undefined}
                >
                  {own && <div className="bubble"><p className="m-0">{it.wish}</p><b>— {it.name}</b></div>}
                  <Krathong color={it.color} />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="scene-bar">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger render={<DesignButton size="lg" />}>
            <Flower2 aria-hidden="true" /> สร้างกระทง
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className={dialog.backdrop} />
            <Dialog.Popup className={cn(dialog.popup, "!w-[min(460px,calc(100vw-32px))]")}>
              <Dialog.Close className={dialog.close} aria-label="ปิด"><X size={18} aria-hidden="true" /></Dialog.Close>
              <div className="px-6 pt-7 pb-6">
                <Dialog.Title className="m-0 text-[20px] leading-[1.3] font-semibold tracking-[-0.02em]">สร้างกระทงของคุณ</Dialog.Title>
                <Dialog.Description className="mt-1 mb-0 text-[14px] text-[var(--color-text-muted)]">เลือกสี เขียนคำอธิษฐาน แล้วปล่อยให้ลอยไปกับสายน้ำ</Dialog.Description>

                <div className="mt-5 grid place-items-center rounded-[14px] bg-[var(--color-surface-muted)] py-4 shadow-[var(--shadow-border)]">
                  <div className="w-[120px] [&_svg]:animate-[bob_3.2s_ease-in-out_infinite]"><Krathong color={color} /></div>
                </div>

                <fieldset className="mt-5 border-0 p-0">
                  <legend className="type-ui mb-2 font-medium">สีกลีบบัว</legend>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map((c, i) => (
                      <button
                        key={c}
                        type="button"
                        aria-label={COLOR_NAMES[i]}
                        aria-pressed={c === color}
                        onClick={() => setColor(c)}
                        className="size-8 cursor-pointer rounded-full border-0 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)] outline-offset-2 transition-transform aria-pressed:outline-2 aria-pressed:outline-[var(--color-accent)] motion-safe:active:scale-95"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </fieldset>

                <label className="type-ui mt-5 mb-1.5 block font-medium" htmlFor="kr-name">ชื่อ <span className="font-normal text-[var(--color-text-muted)]">(ไม่บังคับ)</span></label>
                <input
                  id="kr-name" maxLength={20} value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อของคุณ"
                  className="h-10 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[15px] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)] focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-accent)_25%,transparent)]"
                />
                <label className="type-ui mt-4 mb-1.5 block font-medium" htmlFor="kr-wish">คำอธิษฐาน</label>
                <textarea
                  id="kr-wish" maxLength={80} rows={3} value={wish} onChange={(e) => setWish(e.target.value)} placeholder="ขอให้ทุกคนมีความสุข สุขภาพแข็งแรง…"
                  className="w-full resize-none rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[15px] leading-relaxed text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)] focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-accent)_25%,transparent)]"
                />
                <p className="type-caption mt-1 mb-0 text-right text-[var(--color-text-muted)] tabular-nums">{wish.length}/80</p>
              </div>
              <footer className={dialog.footer}>
                <Dialog.Close className={dialog.cancel}>ยกเลิก</Dialog.Close>
                <DesignButton onClick={launch}><Flower2 aria-hidden="true" /> ลอยกระทง</DesignButton>
              </footer>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
        <Credit className="scene-credit" />
      </div>
    </div>
  );
}
