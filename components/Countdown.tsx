"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// วันลอยกระทง (วันเพ็ญเดือน ๑๒) เวลา 18:00 น.
const FESTIVALS = ["2026-11-24", "2027-11-14", "2028-11-02"].map((d) => new Date(`${d}T18:00:00+07:00`));
const UNITS = ["วัน", "ชั่วโมง", "นาที", "วินาที"];

export function useCountdown(intervalMs = 1000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(i);
  }, [intervalMs]);
  if (!now) return null;
  // ถือว่าเป็น "วันนี้" จนจบคืนนั้น (6 ชั่วโมงหลังเริ่ม)
  const target = FESTIVALS.find((d) => d.getTime() - now.getTime() > -6 * 36e5) ?? FESTIVALS[FESTIVALS.length - 1];
  const ms = Math.max(0, target.getTime() - now.getTime());
  return {
    target,
    today: ms === 0,
    parts: [Math.floor(ms / 864e5), Math.floor(ms / 36e5) % 24, Math.floor(ms / 6e4) % 60, Math.floor(ms / 1e3) % 60],
  };
}

const dateLabel = (d: Date) => d.toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export default function Countdown({ variant = "full", className }: { variant?: "full" | "compact"; className?: string }) {
  const cd = useCountdown();

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2 rounded-full bg-[var(--color-surface)]/80 px-3 py-1 text-[13px] text-[var(--color-text)] shadow-[var(--shadow-border)] backdrop-blur tabular-nums", className)} aria-live="off">
        {!cd ? "…" : cd.today ? "คืนนี้คือคืนลอยกระทง" : (
          <>
            <span className="text-[var(--color-text-muted)]">อีก</span>
            {cd.parts.map((n, i) => <span key={i}>{i ? String(n).padStart(2, "0") : n}<span className="ml-0.5 text-[var(--color-text-muted)]">{UNITS[i].slice(0, i === 0 ? 3 : 2)}</span></span>)}
          </>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-label={cd ? `อีก ${cd.parts[0]} วัน ${cd.parts[1]} ชั่วโมง ${cd.parts[2]} นาที ถึงวันลอยกระทง` : "นับถอยหลัง"}>
        {UNITS.map((u, i) => (
          <div key={u} className="rounded-[var(--radius-panel)] bg-[var(--color-surface)] px-2 py-4 text-center shadow-[var(--shadow-border)]">
            <div className="text-[clamp(1.75rem,6vw,2.5rem)] leading-none font-semibold tracking-[-0.03em] tabular-nums">
              {cd ? (i ? String(cd.parts[i]).padStart(2, "0") : cd.parts[i]) : "–"}
            </div>
            <div className="type-caption mt-2 text-[var(--color-text-muted)]">{u}</div>
          </div>
        ))}
      </div>
      <p className="type-ui mt-3 mb-0 text-center text-[var(--color-text-muted)]">
        {cd ? (cd.today ? "คืนนี้คือคืนลอยกระทง" : `ถึงคืนลอยกระทง ${dateLabel(cd.target)}`) : " "}
      </p>
    </div>
  );
}
