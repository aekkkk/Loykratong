import { Inter, Anuphan, Geist_Mono } from 'next/font/google';
import './globals.css';
import './scene.css';
import { KrathongDefs } from '../components/Krathong';
import MusicPlayer from '../components/MusicPlayer';
import Providers from '../components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const anuphan = Anuphan({ subsets: ['thai', 'latin'], variable: '--font-anuphan', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export const metadata = {
  title: 'ลอยกระทง – ประวัติและเรื่องราว',
  description: 'ประวัติประเพณีลอยกระทง และลอยกระทงออนไลน์ พร้อมเพลงลอยกระทง',
};

export const viewport = { width: 'device-width', initialScale: 1 };

// ตั้งธีมก่อนหน้าเว็บแสดงผล เพื่อไม่ให้กะพริบ
const themeScript = `(function(){try{var m=localStorage.getItem('theme')||'system';var d=m==='dark'||(m==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-home-theme',d?'dark':'light');}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="th" data-home-theme="light" className={`${inter.variable} ${anuphan.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <KrathongDefs />
        <Providers>
          {children}
          <MusicPlayer />
        </Providers>
      </body>
    </html>
  );
}
