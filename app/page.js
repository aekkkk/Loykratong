import { KrathongDefs } from '../components/Krathong';
import Stars from '../components/Stars';
import Lanterns from '../components/Lanterns';
import MusicPlayer from '../components/MusicPlayer';
import Scene from '../components/Scene';

export default function Home() {
  return (
    <>
      <KrathongDefs />
      <Stars />
      <Lanterns />
      <Scene />
      <MusicPlayer />
    </>
  );
}
