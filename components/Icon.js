import { Flower2, ScrollText, HandHeart, Waves, Flame, Sparkles, MapPin, Music, VolumeX, Volume2, X } from 'lucide-react';

// ไอคอนทั้งเว็บ ใช้ชุด Lucide (แทน emoji)
const MAP = {
  lotus: Flower2, scroll: ScrollText, hands: HandHeart, wave: Waves, candle: Flame, sparkle: Sparkles,
  pin: MapPin, music: Music, mute: VolumeX, volume: Volume2, close: X,
};

export default function Icon({ name, size = '1.15em', className = '' }) {
  const C = MAP[name];
  return C ? <C className={`icon ${className}`} width={size} height={size} strokeWidth={1.8} aria-hidden="true" /> : null;
}
