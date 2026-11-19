'use client';
import { useEffect, useRef, useState } from 'react';

/*
 * เพลงตอนเปิดเว็บ
 * 1) ถ้ามีไฟล์ public/assets/loykratong.mp3 (.ogg/.m4a) จะเล่นไฟล์นั้น
 * 2) ถ้าไม่มี จะสังเคราะห์ทำนองสไตล์เพลงลอยกระทงด้วย Web Audio
 * เบราว์เซอร์บล็อกเสียงอัตโนมัติ จึงพยายามเล่นทันทีที่เปิดเว็บ และเริ่มเมื่อผู้ใช้โต้ตอบครั้งแรก
 */
const YT_ID = 'CMEkHkX_dkg';
const SRC = ['/assets/loykratong.mp3', '/assets/loykratong.ogg', '/assets/loykratong.m4a'];
const N = { C: 0, D: 2, E: 4, G: 7, A: 9, c: 12, d: 14, e: 16 };
const MEL = [
  ['E', 1], ['E', .5], ['G', .5], ['A', 1], ['G', 1],
  ['E', .5], ['D', .5], ['C', 1], ['D', 1], ['E', 1],
  ['G', 1], ['G', .5], ['A', .5], ['c', 1], ['A', 1],
  ['G', .5], ['E', .5], ['D', 1], ['C', 2],
  ['A', 1], ['A', .5], ['c', .5], ['d', 1], ['c', 1],
  ['A', .5], ['G', .5], ['E', 1], ['G', 1], ['A', 1],
  ['c', .5], ['A', .5], ['G', 1], ['E', 1], ['D', 1],
  ['E', .5], ['D', .5], ['C', 1], ['C', 2],
];
const BASS = ['C', 'C', 'G', 'G', 'A', 'A', 'G', 'C'].map((n) => N[n] - 12);
const beat = 60 / 104;
const freq = (s) => 261.63 * Math.pow(2, s / 12);

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const e = useRef({ ctx: null, master: null, file: null, useFile: false, timer: null, nextT: 0, step: 0, ready: null, playing: false, yt: null, ytOk: false, userPaused: false, ytFailed: false });

  // probe for an audio file once
  useEffect(() => {
    const s = e.current;
    s.ready = new Promise((res) => {
      let i = 0;
      const next = () => {
        if (i >= SRC.length) return res(false);
        const a = new Audio(); a.loop = true; a.preload = 'auto';
        a.addEventListener('canplaythrough', () => { s.file = a; s.useFile = true; res(true); }, { once: true });
        a.addEventListener('error', () => { i++; next(); }, { once: true });
        a.src = SRC[i];
      };
      next(); setTimeout(() => res(false), 2500);
    });
    // YouTube player (เพลงหลัก) — ฝังผ่าน IFrame API
    const mk = () => {
      s.yt = new window.YT.Player('yt-player', {
        videoId: YT_ID, playerVars: { playsinline: 1, controls: 0, rel: 0 },
        events: {
          onReady: () => { s.ytOk = true; if (!s.userPaused) { s.playing = true; setPlaying(true); s.yt.playVideo(); } },
          onStateChange: (ev) => { if (ev.data === 0) { s.yt.seekTo(0); s.yt.playVideo(); } else if (ev.data === 1) setPlaying(true); else if (ev.data === 2) setPlaying(false); },
          onError: () => { s.ytOk = false; s.ytFailed = true; s.yt = null; if (s.playing) fallback(); },
        },
      });
    };
    if (window.YT?.Player) mk();
    else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); mk(); };
      const sc = document.createElement('script'); sc.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(sc);
    }
    // ไม่มีหน้า splash: พยายามเล่นทันที ถ้าเบราว์เซอร์บล็อก จะเริ่มเมื่อผู้ใช้โต้ตอบครั้งแรก
    const first = () => {
      if (s.userPaused) return;
      if (s.ytOk) { if (s.yt.getPlayerState?.() !== 1) s.yt.playVideo(); }
      else if (s.ytFailed && !s.playing) play();
    };
    const evs = ['pointerdown', 'keydown', 'touchstart', 'wheel'];
    evs.forEach((n) => addEventListener(n, first, { once: true, passive: true }));
    const failTimer = setTimeout(() => { if (!s.ytOk) s.ytFailed = true; }, 5000);
    return () => { clearTimeout(failTimer); evs.forEach((n) => removeEventListener(n, first)); clearInterval(s.timer); s.file?.pause(); s.ctx?.close(); try { s.yt?.destroy(); } catch {} };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ถ้า YouTube เล่นไม่ได้ ใช้ไฟล์เสียง/เพลงสังเคราะห์แทน
  const fallback = async () => {
    const s = e.current; await s.ready;
    if (s.useFile) { try { s.file.volume = .8; await s.file.play(); return; } catch { s.useFile = false; } }
    startSynth();
  };

  const note = (semi, t, dur, vol, type) => {
    const { ctx, master } = e.current;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'triangle'; o.frequency.value = freq(semi);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .02);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + .05);
    if (!type) {
      const o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o2.type = 'sine'; o2.frequency.value = freq(semi) * 2;
      g2.gain.setValueAtTime(0, t); g2.gain.linearRampToValueAtTime(vol * .35, t + .01);
      g2.gain.exponentialRampToValueAtTime(.0001, t + dur * .7);
      o2.connect(g2); g2.connect(master); o2.start(t); o2.stop(t + dur);
    }
  };

  const schedule = () => {
    const s = e.current;
    while (s.nextT < s.ctx.currentTime + .6) {
      const [n, b] = MEL[s.step % MEL.length], dur = b * beat;
      note(N[n], s.nextT, Math.max(dur * 1.8, .5), .22);
      if (s.step % 2 === 0) note(BASS[(s.step >> 1) % BASS.length], s.nextT, beat * 1.6, .1, 'sine');
      s.nextT += dur; s.step++;
      if (s.step % MEL.length === 0) s.nextT += beat;
    }
  };

  const startSynth = () => {
    const s = e.current;
    if (!s.ctx) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const master = ctx.createGain(); master.gain.value = .0001;
      const dl = ctx.createDelay(1), fb = ctx.createGain(), wet = ctx.createGain();
      dl.delayTime.value = .28; fb.gain.value = .35; wet.gain.value = .35;
      master.connect(ctx.destination); master.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(wet); wet.connect(ctx.destination);
      s.ctx = ctx; s.master = master;
    }
    s.ctx.resume();
    s.master.gain.cancelScheduledValues(s.ctx.currentTime);
    s.master.gain.setValueAtTime(s.master.gain.value, s.ctx.currentTime);
    s.master.gain.linearRampToValueAtTime(.9, s.ctx.currentTime + 1.5);
    s.nextT = s.ctx.currentTime + .1;
    clearInterval(s.timer); s.timer = setInterval(schedule, 120); schedule();
  };

  const stopSynth = () => {
    const s = e.current; if (!s.ctx) return;
    s.master.gain.cancelScheduledValues(s.ctx.currentTime);
    s.master.gain.setValueAtTime(s.master.gain.value, s.ctx.currentTime);
    s.master.gain.linearRampToValueAtTime(.0001, s.ctx.currentTime + .6);
    clearInterval(s.timer); setTimeout(() => s.ctx.suspend(), 700);
  };

  const play = async () => {
    const s = e.current; if (s.playing) return;
    s.userPaused = false; s.playing = true; setPlaying(true);
    if (s.ytOk) { s.yt.playVideo(); return; } // เรียกทันทีเพื่อคงสิทธิ์จากการแตะของผู้ใช้
    if (!s.yt || s.ytFailed) fallback(); // else: onReady จะเล่นเอง
  };
  const pause = () => {
    const s = e.current; if (!s.playing) return;
    s.userPaused = true; s.playing = false; setPlaying(false);
    if (s.ytOk) s.yt.pauseVideo();
    else if (s.useFile) s.file?.pause(); else stopSynth();
  };


  return (
    <>
      <div id="yt-wrap" aria-hidden="true"><div id="yt-player" /></div>
      <button id="musicBtn" className={playing ? 'playing' : ''} aria-label="เปิด/ปิดเพลง" title="เปิด/ปิดเพลง"
        onClick={() => (playing ? pause() : play())}>♪</button>
      <div id="nowPlaying" className={playing ? 'show' : ''}>🎶 เพลงลอยกระทง</div>
    </>
  );
}
