import './globals.css';
import { KrathongDefs } from '../components/Krathong';
import Stars from '../components/Stars';
import Lanterns from '../components/Lanterns';
import MusicPlayer from '../components/MusicPlayer';

export const metadata = {
  title: 'ลอยกระทง – เทศกาลแห่งแสงเทียนและสายน้ำ',
  description: 'ประวัติประเพณีลอยกระทง และลอยกระทงออนไลน์ พร้อมเพลงลอยกระทง',
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Mali:wght@400;600;700&family=Sarabun:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <KrathongDefs />
        <Stars />
        <Lanterns />
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
