'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface PolaroidData {
  color: string;
  caption: string;
}

const polaroids: PolaroidData[] = [
  { color: '#FF6B6B', caption: 'Sunset vibes' },
  { color: '#4ECDC4', caption: 'Ocean breeze' },
  { color: '#45B7D1', caption: 'Sky gazing' },
  { color: '#96CEB4', caption: 'Nature walks' },
  { color: '#FFEAA7', caption: 'Golden hour' },
  { color: '#DDA0DD', caption: 'Lavender fields' },
  { color: '#98D8C8', caption: 'Morning coffee' },
  { color: '#F7DC6F', caption: 'Yellow mood' },
  { color: '#BB8FCE', caption: 'Purple rain' },
  { color: '#85C1E9', caption: 'Blue moments' },
];

// Spread across a 3-column x 4-row grid with random offsets
const positions = [
  { col: 0, row: 0, xOff: 10, yOff: 0, rotate: -8 },
  { col: 1, row: 0, xOff: -15, yOff: 30, rotate: 5 },
  { col: 2, row: 0, xOff: 5, yOff: 10, rotate: -3 },
  { col: 0, row: 1, xOff: -5, yOff: 20, rotate: 6 },
  { col: 1, row: 1, xOff: 20, yOff: -10, rotate: -5 },
  { col: 2, row: 1, xOff: -10, yOff: 25, rotate: 4 },
  { col: 0, row: 2, xOff: 15, yOff: 5, rotate: -6 },
  { col: 1, row: 2, xOff: -20, yOff: 15, rotate: 3 },
  { col: 2, row: 2, xOff: 0, yOff: -5, rotate: -4 },
  { col: 1, row: 3, xOff: 10, yOff: 0, rotate: 7 },
];

function Polaroid({ data, index }: { data: PolaroidData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const pos = positions[index % positions.length];

  const left = `${(pos.col / 3) * 100 + 16 + pos.xOff}%`;
  const top = `${(pos.row / 4) * 100 + 10 + pos.yOff}%`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      className="absolute w-44 sm:w-48"
      style={{
        left,
        top,
        transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
        zIndex: index,
      }}
    >
      <div className="relative rounded-sm bg-white shadow-xl dark:bg-neutral-100" style={{ padding: '14px 14px 20px 14px' }}>
        {/* Pushpin - top down view */}
        <div
          className="absolute left-1/2 z-10"
          style={{
            top: '8px',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="h-8 w-8 rounded-full shadow-lg" style={{
            background: 'radial-gradient(circle at 35% 35%, #e85959, #a61e1e)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.35), inset 0 -1px 2px rgba(0,0,0,0.2)',
          }} />
        </div>

        <div
          className="aspect-[3/4] w-full"
          style={{ backgroundColor: data.color }}
        />
        <p
          className="mt-2 text-center text-3xl text-neutral-900 lowercase"
          style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, letterSpacing: '-0.02em' }}
        >
          {data.caption.toLowerCase()}
        </p>
      </div>
    </motion.div>
  );
}

export function Life() {
  return (
    <section id="life" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Life</h2>
          <p className="mt-3 text-muted-foreground">
            Moments beyond the screen
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl" style={{ height: '1100px' }}>
          {polaroids.map((item, index) => (
            <Polaroid key={index} data={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
