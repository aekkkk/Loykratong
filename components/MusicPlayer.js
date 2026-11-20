'use client';
import { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { DesignButton } from './ui/DesignButton';

/*
 * เพลงประกอบเว็บ (YouTube: CMEkHkX_dkg)
 * เบราว์เซอร์ทุกตัวห้ามเว็บเปิด "เสียง" เองก่อนผู้ใช้โต้ตอบ จึงทำแบบนี้:
 *   1) เปิดเว็บ -> เริ่มเล่นเพลงทันทีแบบปิดเสียง (อนุญาตให้ autoplay ได้)
 *   2) ผู้ใช้แตะ/คลิก/กดปุ่มใดๆ ครั้งแรก -> เปิดเสียงทันที (เพลงเล่นต่อจากเดิม)
 * ถ้า YouTube โหลดไม่ได้ จะใช้ไฟล์ public/assets/loykratong.mp3 หรือทำนองสังเคราะห์แทน
 */
const YT_ID = 'CMEkHkX_dkg';
const SRC = ['/assets/loykratong.mp3', '/assets/loykratong.ogg', '/assets/loykratong.m4a'];
const N = { C: 0, D: 2, E: 4, G: 7, A: 9, c: 12, d: 14 };
const MEL = [
  ['E', 1], ['E', .5], ['G', .5], ['A', 1], ['G', 1], ['E', .5], ['D', .5], ['C', 1], ['D', 1], ['E', 1],
  ['G', 1], ['G', .5], ['A', .5], ['c', 1], ['A', 1], ['G', .5], ['E', .5], ['D', 1], ['C', 2],
  ['A', 1], ['A', .5], ['c', .5], ['d', 1], ['c', 1], ['A', .5], ['G', .5], ['E', 1], ['G', 1], ['A', 1],
  ['c', .5], ['A', .5], ['G', 1], ['E', 1], ['D', 1], ['E', .5], ['D', .5], ['C', 1], ['C', 2],
];
const BASS = ['C', 'C', 'G', 'G', 'A', 'A', 'G', 'C'].map((n) => N[n] - 12);
const beat = 60 / 104;
const freq = (s) => 261.63 * Math.pow(2, s / 12);
const GESTURES = ['pointerdown', 'pointerup', 'click', 'keydown', 'touchend'];

export default function MusicPlayer() {
  const [on, setOn] = useState(false);        // ได้ยินเสียงอยู่หรือไม่
  const [needTap, setNeedTap] = useState(true); // ยังต้องให้ผู้ใช้แตะก่อน
  const r = useRef({ yt: null, ytOk: false, ytFailed: false, userOff: false, mode: 'yt', file: null, ctx: null, master: null, timer: null, nextT: 0, step: 0 });

  /* ---------- synth fallback ---------- */
  const note = (semi, t, dur, vol, type) => {
    const { ctx, master } = r.current;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'triangle'; o.frequency.value = freq(semi);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + .05);
  };
  const tick = () => {
    const s = r.current;
    while (s.nextT < s.ctx.currentTime + .6) {
      const [n, b] = MEL[s.step % MEL.length], dur = b * beat;
      note(N[n], s.nextT, Math.max(dur * 1.8, .5), .22);
      if (s.step % 2 === 0) note(BASS[(s.step >> 1) % BASS.length], s.nextT, beat * 1.6, .1, 'sine');
      s.nextT += dur; s.step++;
      if (s.step % MEL.length === 0) s.nextT += beat;
    }
  };
  const synthOn = () => {
    const s = r.current;
    if (!s.ctx) {
      s.ctx = new (window.AudioContext || window.webkitAudioContext)();
      s.master = s.ctx.createGain(); s.master.gain.value = .8; s.master.connect(s.ctx.destination);
    }
    s.ctx.resume(); s.nextT = s.ctx.currentTime + .1;
    clearInterval(s.timer); s.timer = setInterval(tick, 120); tick();
  };
  const synthOff = () => { const s = r.current; clearInterval(s.timer); s.ctx?.suspend(); };

  /* ---------- unified on/off ---------- */
  const soundOn = () => {
    const s = r.current;
    if (s.mode === 'yt' && s.ytOk) {
      s.yt.unMute(); s.yt.setVolume(80); s.yt.playVideo();
    } else if (s.mode === 'file' && s.file) {
      s.file.play().catch(() => {});
    } else if (s.mode === 'synth') {
      synthOn();
    } else {
      return false; // ยังโหลดไม่เสร็จ
    }
    setOn(true); setNeedTap(false);
    return true;
  };
  const soundOff = () => {
    const s = r.current;
    if (s.mode === 'yt' && s.ytOk) s.yt.pauseVideo();
    else if (s.mode === 'file') s.file?.pause();
    else synthOff();
    setOn(false);
  };

  useEffect(() => {
    const s = r.current;

    const useFallback = () => {
      if (s.mode !== 'yt') return;
      s.ytFailed = true;
      const a = new Audio(SRC[0]); a.loop = true;
      a.addEventListener('canplay', () => { if (s.mode === 'yt') { s.mode = 'file'; s.file = a; } }, { once: true });
      a.addEventListener('error', () => { if (s.mode === 'yt') s.mode = 'synth'; }, { once: true });
      setTimeout(() => { if (s.mode === 'yt') s.mode = 'synth'; }, 2500);
    };

    const mk = () => {
      s.yt = new window.YT.Player('yt-player', {
        videoId: YT_ID,
        playerVars: { autoplay: 1, mute: 1, loop: 1, playlist: YT_ID, playsinline: 1, controls: 0, rel: 0, disablekb: 1 },
        events: {
          onReady: () => {
            s.ytOk = true;
            s.yt.mute(); s.yt.playVideo(); // เริ่มเล่นแบบปิดเสียงทันที
            if (s.wantSound && !s.userOff) soundOn();
          },
          onStateChange: (ev) => { if (ev.data === 0) { s.yt.seekTo(0); s.yt.playVideo(); } },
          onError: useFallback,
        },
      });
    };
    if (window.YT?.Player) mk();
    else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); mk(); };
      const sc = document.createElement('script');
      sc.src = 'https://www.youtube.com/iframe_api';
      sc.onerror = useFallback;
      document.head.appendChild(sc);
    }
    const failTimer = setTimeout(() => { if (!s.ytOk) useFallback(); }, 6000);

    // การโต้ตอบครั้งแรก = เปิดเสียง
    const first = (ev) => {
      if (ev.target?.closest?.('#musicBtn')) return; // ปุ่มเพลงจัดการเอง
      if (s.userOff) return detach();
      s.wantSound = true;
      if (soundOn()) detach();
    };
    const detach = () => GESTURES.forEach((n) => removeEventListener(n, first, true));
    s.detach = detach;
    GESTURES.forEach((n) => addEventListener(n, first, true));

    return () => { clearTimeout(failTimer); detach(); clearInterval(s.timer); s.file?.pause(); s.ctx?.close(); try { s.yt?.destroy(); } catch {} };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const s = r.current;
    if (on) { s.userOff = true; soundOff(); }
    else { s.userOff = false; s.wantSound = true; if (soundOn()) s.detach?.(); }
  };

  return (
    <>
      <div id="yt-wrap" aria-hidden="true" style={{ position: 'fixed', right: 0, bottom: 0, width: 400, height: 225, opacity: 0, pointerEvents: 'none', zIndex: -1 }}><div id="yt-player" /></div>
      <div className="fixed right-4 bottom-4 z-[70] flex items-center gap-2">
        {needTap && !on && (
          <DesignButton variant="secondary" size="sm" className="tap-hint">
            <Volume2 aria-hidden="true" /> แตะเพื่อเปิดเพลง
          </DesignButton>
        )}
        <DesignButton id="musicBtn" variant="secondary" size="sm" aria-label={on ? 'ปิดเพลง' : 'เปิดเพลง'} title={on ? 'ปิดเพลง' : 'เปิดเพลง'} onClick={toggle} className="!px-2.5">
          {on ? <Music aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
        </DesignButton>
      </div>
    </>
  );
}
