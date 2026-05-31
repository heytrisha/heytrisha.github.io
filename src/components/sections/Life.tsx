'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValue, useMotionValueEvent, animate } from 'motion/react';

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

function getPolaroidTransform(index: number) {
  const rotation = ((index * 7) % 9) - 4;
  const yOffset = ((index * 13) % 41) - 20;
  const pinX = ((index * 3) % 17) - 8;
  const pinY = ((index * 5) % 13) - 6;
  return { rotation, yOffset, pinX, pinY };
}

function Polaroid({ data, index }: { data: PolaroidData; index: number }) {
  const { rotation, yOffset, pinX, pinY } = getPolaroidTransform(index);

  return (
    <div
      className="shrink-0"
      style={{
        transform: `rotate(${rotation}deg) translateY(${yOffset}px)`,
      }}
    >
      <div className="relative rounded-sm bg-white shadow-xl dark:bg-neutral-100" style={{ padding: '14px 14px 20px 14px' }}>
        {/* Pushpin - top down view */}
        <div
          className="absolute left-1/2 z-10"
          style={{
            top: `${12 + pinY}px`,
            transform: `translateX(calc(-50% + ${pinX}px))`,
          }}
        >
          <div className="h-8 w-8 rounded-full shadow-lg" style={{
            background: 'radial-gradient(circle at 35% 35%, #e85959, #a61e1e)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.35), inset 0 -1px 2px rgba(0,0,0,0.2)',
          }} />
        </div>

        <div
          className="aspect-[3/4] w-44 sm:w-52 md:w-60"
          style={{ backgroundColor: data.color }}
        />
        <p
          className="mt-2 text-center text-4xl text-neutral-900 lowercase"
          style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, letterSpacing: '-0.02em' }}
        >
          {data.caption.toLowerCase()}
        </p>
      </div>
    </div>
  );
}

// Variant 1: Scroll-driven infinite carousel
function ScrollCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const x = useMotionValue(-setWidth);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate set width after mount
  useEffect(() => {
    if (trackRef.current) {
      const width = trackRef.current.scrollWidth / 3;
      setSetWidth(width);
      x.set(-width);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!setWidth) return;

    const target = -setWidth - latest * setWidth;
    let wrapped = target;

    // Wrap seamlessly: jump from -2*setWidth to -setWidth
    if (wrapped < -2 * setWidth) {
      wrapped += setWidth;
    }

    x.set(wrapped);
  });

  const allItems = [...polaroids, ...polaroids, ...polaroids];

  return (
    <div ref={containerRef} className="relative" style={{ height: '250vh' }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-24 px-8"
          style={{ x }}
        >
          {allItems.map((item, i) => (
            <Polaroid key={i} data={item} index={i % 10} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Variant 2: Drag carousel with infinite wrap
function DragCarousel() {
  const [setWidth, setSetWidth] = useState(0);
  const x = useMotionValue(-setWidth);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.scrollWidth / 3;
        setSetWidth(width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Wrap position during drag
  useMotionValueEvent(x, 'change', (latest) => {
    if (!setWidth) return;

    if (latest < -2 * setWidth) {
      x.set(latest + setWidth);
    } else if (latest > -setWidth) {
      x.set(latest - setWidth);
    }
  });

  const handleDragEnd = (_: any, info: any) => {
    if (!setWidth) return;

    const velocity = info.velocity.x;
    const currentX = x.get();
    const targetX = currentX + velocity * 0.2;

    let wrapped = targetX;
    while (wrapped < -2 * setWidth) wrapped += setWidth;
    while (wrapped > -setWidth) wrapped -= setWidth;

    animate(x, wrapped, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });
  };

  const allItems = [...polaroids, ...polaroids, ...polaroids];

  return (
    <div className="overflow-hidden py-12">
      <motion.div
        ref={containerRef}
        drag="x"
        style={{ x }}
        className="flex cursor-grab gap-24 px-8 active:cursor-grabbing"
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        {allItems.map((item, i) => (
          <Polaroid key={i} data={item} index={i % 10} />
        ))}
      </motion.div>
    </div>
  );
}

export function Life() {
  return (
    <section id="life" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Life</h2>
          <p className="mt-3 text-muted-foreground">
            Moments beyond the screen
          </p>
        </div>
      </div>

      {/* Variant 1: Scroll-driven */}
      <div className="mx-auto max-w-6xl px-6 mb-4">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
          Scroll to explore
        </p>
      </div>
      <ScrollCarousel />

      {/* Variant 2: Drag */}
      <div className="mx-auto max-w-6xl px-6 mt-24 mb-4">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
          Drag to explore
        </p>
      </div>
      <DragCarousel />
    </section>
  );
}
