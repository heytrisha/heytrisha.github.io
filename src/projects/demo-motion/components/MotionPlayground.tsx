'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useAnimate,
  useMotionValue,
  useSpring,
} from 'motion/react';

/* ------------------------------------------------------------------ */
/*  Staggered Grid Reveal                                               */
/* ------------------------------------------------------------------ */
function StaggeredGrid() {
  const reference = useRef<HTMLDivElement>(null);
  const isInView = useInView(reference, { once: true, margin: '-50px' });

  const cells = Array.from({ length: 25 }, (_, index) => index);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">1. Staggered Grid Reveal</h2>
      <p className="text-muted-foreground text-sm">
        Cells animate in with staggered delays when they scroll into view.
      </p>
      <div ref={reference} className="grid grid-cols-5 gap-2 sm:gap-3">
        {cells.map((index) => (
          <motion.div
            key={index}
            className="bg-muted aspect-square rounded-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: index * 0.03,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Hover-Driven Spring Physics                                         */
/* ------------------------------------------------------------------ */
function SpringCards() {
  const cards = [
    { label: 'Spring A', color: 'bg-primary' },
    { label: 'Spring B', color: 'bg-secondary' },
    { label: 'Spring C', color: 'bg-accent' },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">2. Hover-Driven Spring Physics</h2>
      <p className="text-muted-foreground text-sm">
        Hover over the cards to see spring-based scale and color transitions.
      </p>
      <div className="flex flex-wrap gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.label}
            className={`text-primary-foreground flex h-32 w-32 items-center justify-center rounded-xl text-sm font-medium ${card.color}`}
            whileHover={{
              scale: 1.15,
              rotate: 3,
              backgroundColor: 'var(--muted)',
              color: 'var(--foreground)',
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
            }}
          >
            {card.label}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Gesture-Based Drag                                                  */
/* ------------------------------------------------------------------ */
function DraggableBox() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">3. Gesture-Based Drag</h2>
      <p className="text-muted-foreground text-sm">
        Drag the box within its bounds: it snaps back smoothly on release.
      </p>
      <div className="border-border bg-muted/30 relative h-64 w-full overflow-hidden rounded-xl border">
        <motion.div
          className="bg-primary absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-xl shadow-lg active:cursor-grabbing"
          drag
          dragConstraints={{
            left: -100,
            right: 100,
            top: -60,
            bottom: 60,
          }}
          dragElastic={0.2}
          dragSnapToOrigin
          whileDrag={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll-Driven Parallax                                              */
/* ------------------------------------------------------------------ */
function ParallaxLayers() {
  const containerReference = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerReference,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <section className="space-y-4" ref={containerReference}>
      <h2 className="text-xl font-semibold">4. Scroll-Driven Parallax</h2>
      <p className="text-muted-foreground text-sm">
        Three layers move at different speeds as you scroll past this section.
      </p>
      <div className="border-border bg-muted/30 relative h-64 w-full overflow-hidden rounded-xl border">
        <motion.div
          className="bg-chart-1 absolute top-8 left-[15%] h-16 w-16 rounded-lg"
          style={{ y: y1 }}
        />
        <motion.div
          className="bg-chart-3 absolute top-16 left-[45%] h-20 w-20 rounded-lg"
          style={{ y: y2 }}
        />
        <motion.div
          className="bg-chart-5 absolute top-10 left-[75%] h-14 w-14 rounded-lg"
          style={{ y: y3 }}
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Orchestrated Sequence                                               */
/* ------------------------------------------------------------------ */
function OrchestratedSequence() {
  const [scope, animate] = useAnimate();
  const [isPlaying, setIsPlaying] = useState(false);

  const runSequence = async () => {
    if (isPlaying) return;
    setIsPlaying(true);

    await animate(
      scope.current.querySelectorAll('.seq-item'),
      { opacity: 0, y: 20, scale: 0.8 },
      { duration: 0.2 },
    );

    await animate(
      scope.current.querySelector('.seq-1'),
      { opacity: 1, y: 0, scale: 1 },
      { duration: 0.5, ease: 'easeOut' },
    );

    await animate(
      scope.current.querySelector('.seq-2'),
      { opacity: 1, y: 0, scale: 1 },
      { duration: 0.5, ease: 'easeOut' },
    );

    await animate(
      scope.current.querySelector('.seq-3'),
      { opacity: 1, y: 0, scale: 1 },
      { duration: 0.5, ease: 'easeOut' },
    );

    setIsPlaying(false);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">5. Orchestrated Sequence</h2>
      <p className="text-muted-foreground text-sm">
        Click the button to trigger a choreographed multi-element animation sequence.
      </p>
      <div className="border-border bg-muted/30 rounded-xl border p-6">
        <div ref={scope} className="mb-6 flex flex-wrap items-center gap-4">
          <motion.div
            className="seq-item seq-1 bg-chart-2 text-background flex h-16 w-16 items-center justify-center rounded-lg text-xs font-bold"
            initial={{ opacity: 1, y: 0, scale: 1 }}
          >
            1
          </motion.div>
          <motion.div
            className="seq-item seq-2 bg-chart-4 text-background flex h-16 w-16 items-center justify-center rounded-lg text-xs font-bold"
            initial={{ opacity: 1, y: 0, scale: 1 }}
          >
            2
          </motion.div>
          <motion.div
            className="seq-item seq-3 bg-chart-1 text-background flex h-16 w-16 items-center justify-center rounded-lg text-xs font-bold"
            initial={{ opacity: 1, y: 0, scale: 1 }}
          >
            3
          </motion.div>
        </div>
        <button
          onClick={runSequence}
          disabled={isPlaying}
          className="bg-primary text-primary-foreground inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPlaying ? 'Playing…' : 'Run Sequence'}
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. SVG Path Draw                                                    */
/* ------------------------------------------------------------------ */
function SvgPathDraw() {
  const reference = useRef<HTMLDivElement>(null);
  const isInView = useInView(reference, { once: true, margin: '-100px' });

  return (
    <section className="space-y-4" ref={reference}>
      <h2 className="text-xl font-semibold">6. SVG Path Draw</h2>
      <p className="text-muted-foreground text-sm">
        An SVG stroke animates from 0% to 100% length as it enters the viewport.
      </p>
      <div className="border-border bg-muted/30 flex items-center justify-center rounded-xl border p-8">
        <svg viewBox="0 0 200 100" className="h-24 w-full max-w-xs overflow-visible">
          <motion.path
            d="M10,90 Q50,10 90,90 T170,90"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Magnetic Button                                                  */
/* ------------------------------------------------------------------ */
function MagneticButton() {
  const reference = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = reference.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">7. Magnetic Button</h2>
      <p className="text-muted-foreground text-sm">
        Move your cursor near the button: it subtly pulls toward you via spring physics.
      </p>
      <div className="border-border bg-muted/30 flex h-40 items-center justify-center rounded-xl border">
        <motion.button
          ref={reference}
          style={{ x: springX, y: springY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-primary text-primary-foreground inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold"
        >
          Magnetic
        </motion.button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Morphing Blob                                                    */
/* ------------------------------------------------------------------ */
function MorphingBlob() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">8. Morphing Blob</h2>
      <p className="text-muted-foreground text-sm">
        A single shape continuously morphing its border-radius.
      </p>
      <div className="border-border bg-muted/30 flex h-64 items-center justify-center rounded-xl border">
        <motion.div
          className="bg-accent h-32 w-32"
          animate={{
            borderRadius: [
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 60% 70% 40% / 50% 60% 30% 60%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Playground Shell                                                    */
/* ------------------------------------------------------------------ */
export default function MotionPlayground() {
  return (
    <div className="space-y-16 pb-24">
      <StaggeredGrid />
      <SpringCards />
      <DraggableBox />
      <ParallaxLayers />
      <OrchestratedSequence />
      <SvgPathDraw />
      <MagneticButton />
      <MorphingBlob />
    </div>
  );
}
