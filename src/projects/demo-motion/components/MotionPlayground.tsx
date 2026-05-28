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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const cells = Array.from({ length: 25 }, (_, i) => i);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">1. Staggered Grid Reveal</h2>
      <p className="text-sm text-muted-foreground">
        Cells animate in with staggered delays when they scroll into view.
      </p>
      <div
        ref={ref}
        className="grid grid-cols-5 gap-2 sm:gap-3"
      >
        {cells.map((i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-md bg-muted"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: i * 0.03,
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
      <p className="text-sm text-muted-foreground">
        Hover over the cards to see spring-based scale and color transitions.
      </p>
      <div className="flex flex-wrap gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.label}
            className={`flex h-32 w-32 items-center justify-center rounded-xl text-sm font-medium text-primary-foreground ${card.color}`}
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
      <p className="text-sm text-muted-foreground">
        Drag the box within its bounds — it snaps back smoothly on release.
      </p>
      <div className="relative h-64 w-full overflow-hidden rounded-xl border border-border bg-muted/30">
        <motion.div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-xl bg-primary shadow-lg active:cursor-grabbing"
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <section className="space-y-4" ref={containerRef}>
      <h2 className="text-xl font-semibold">4. Scroll-Driven Parallax</h2>
      <p className="text-sm text-muted-foreground">
        Three layers move at different speeds as you scroll past this section.
      </p>
      <div className="relative h-64 w-full overflow-hidden rounded-xl border border-border bg-muted/30">
        <motion.div
          className="absolute left-[15%] top-8 h-16 w-16 rounded-lg bg-chart-1"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute left-[45%] top-16 h-20 w-20 rounded-lg bg-chart-3"
          style={{ y: y2 }}
        />
        <motion.div
          className="absolute left-[75%] top-10 h-14 w-14 rounded-lg bg-chart-5"
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
      { duration: 0.2 }
    );

    await animate(
      scope.current.querySelector('.seq-1'),
      { opacity: 1, y: 0, scale: 1 },
      { duration: 0.5, ease: 'easeOut' }
    );

    await animate(
      scope.current.querySelector('.seq-2'),
      { opacity: 1, y: 0, scale: 1 },
      { duration: 0.5, ease: 'easeOut' }
    );

    await animate(
      scope.current.querySelector('.seq-3'),
      { opacity: 1, y: 0, scale: 1 },
      { duration: 0.5, ease: 'easeOut' }
    );

    setIsPlaying(false);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">5. Orchestrated Sequence</h2>
      <p className="text-sm text-muted-foreground">
        Click the button to trigger a choreographed multi-element animation
        sequence.
      </p>
      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <div ref={scope} className="mb-6 flex flex-wrap items-center gap-4">
          <motion.div
            className="seq-item seq-1 flex h-16 w-16 items-center justify-center rounded-lg bg-chart-2 text-xs font-bold text-background"
            initial={{ opacity: 1, y: 0, scale: 1 }}
          >
            1
          </motion.div>
          <motion.div
            className="seq-item seq-2 flex h-16 w-16 items-center justify-center rounded-lg bg-chart-4 text-xs font-bold text-background"
            initial={{ opacity: 1, y: 0, scale: 1 }}
          >
            2
          </motion.div>
          <motion.div
            className="seq-item seq-3 flex h-16 w-16 items-center justify-center rounded-lg bg-chart-1 text-xs font-bold text-background"
            initial={{ opacity: 1, y: 0, scale: 1 }}
          >
            3
          </motion.div>
        </div>
        <button
          onClick={runSequence}
          disabled={isPlaying}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPlaying ? 'Playing…' : 'Run Sequence'}
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Layout Expand / Collapse                                         */
/* ------------------------------------------------------------------ */
function LayoutExpandCards() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const items = [
    { id: 'a', title: 'Alpha', color: 'bg-chart-1' },
    { id: 'b', title: 'Beta', color: 'bg-chart-3' },
    { id: 'c', title: 'Gamma', color: 'bg-chart-5' },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">6. Layout Expand Cards</h2>
      <p className="text-sm text-muted-foreground">
        Click a card to see it smoothly expand while siblings reflow.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            className={`cursor-pointer rounded-xl p-6 text-sm font-medium text-background ${item.color}`}
            initial={{ borderRadius: 12 }}
            animate={{
              gridColumn: selectedId === item.id ? '1 / -1' : 'auto',
              height: selectedId === item.id ? 192 : 128,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <motion.h3 layout="position" className="text-lg font-bold">
              {item.title}
            </motion.h3>
            {selectedId === item.id && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-2 text-sm"
              >
                Expanded detail content appears here with layout-driven transitions.
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. SVG Path Draw                                                    */
/* ------------------------------------------------------------------ */
function SvgPathDraw() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="space-y-4" ref={ref}>
      <h2 className="text-xl font-semibold">7. SVG Path Draw</h2>
      <p className="text-sm text-muted-foreground">
        An SVG stroke animates from 0% to 100% length as it enters the viewport.
      </p>
      <div className="flex items-center justify-center rounded-xl border border-border bg-muted/30 p-8">
        <svg
          viewBox="0 0 200 100"
          className="h-24 w-full max-w-xs overflow-visible"
        >
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
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
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
      <h2 className="text-xl font-semibold">8. Magnetic Button</h2>
      <p className="text-sm text-muted-foreground">
        Move your cursor near the button — it subtly pulls toward you via spring physics.
      </p>
      <div className="flex h-40 items-center justify-center rounded-xl border border-border bg-muted/30">
        <motion.button
          ref={ref}
          style={{ x: springX, y: springY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground"
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
      <h2 className="text-xl font-semibold">9. Morphing Blob</h2>
      <p className="text-sm text-muted-foreground">
        A single shape continuously morphing its border-radius.
      </p>
      <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-muted/30">
        <motion.div
          className="h-32 w-32 bg-accent"
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
      <LayoutExpandCards />
      <SvgPathDraw />
      <MagneticButton />
      <MorphingBlob />
    </div>
  );
}
