export const STORE_KEY = 'loykratong.v1';
export const COLORS = ['#ff8fb8', '#ffd166', '#c58bff', '#7fd6ff', '#ff7b54', '#ffffff'];

export function chime() {
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    const c = new C();
    const t = c.currentTime;
    [880, 1318.5, 1760].forEach((fr, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = fr;
      g.gain.setValueAtTime(0, t + i * 0.12);
      g.gain.linearRampToValueAtTime(0.12, t + i * 0.12 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.12 + 1.2);
      o.connect(g); g.connect(c.destination);
      o.start(t + i * 0.12); o.stop(t + i * 0.12 + 1.3);
    });
    setTimeout(() => c.close(), 2200);
  } catch (e) {}
}
