'use client';
import { useEffect, useState } from 'react';

const FLAMES = [
  ['      (  ', '     ) ) ', '    ( ( ) '],
  ['     )   ', '    ( ( (', '     ) )  '],
  ['      )  ', '     ( ) )', '    ) ( (  '],
];
const BODY = String.raw`
        ||
     .--||--.
   _/  \||/  \_
  /  .-'~~'-.  \
 (  ( ~ ~ ~ ~ )  )
  \ '-.______.-' /
   '-._______.-'`;
const WAVES = ['~~~~ ~~~~ ~~~~ ~~~~ ~~~~ ~~~~', '~~~~~ ~~~~ ~~~~ ~~~~ ~~~~ ~~~', '~~~ ~~~~ ~~~~ ~~~~ ~~~~ ~~~~~'];

export default function AsciiArt() {
  const [f, setF] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setF((x) => x + 1), 280);
    return () => clearInterval(i);
  }, []);
  const flame = FLAMES[f % FLAMES.length].map((l) => '   ' + l).join('\n');
  const wave = WAVES[f % WAVES.length];
  return (
    <pre className="ascii" aria-label="ภาพกระทงแบบ ASCII art">
      <span className="fl">{flame}</span>
      {BODY}
      {'\n'}
      <span className="wv">{wave}</span>
    </pre>
  );
}
