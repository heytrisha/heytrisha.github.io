'use client';

import { useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';

const skills = [
  'User Research',
  'Visual Design',
  'Design Systems',
  'Prototyping',
  'Product Thinking',
];

function SkillItem({ skill, index, activeIndex }: { skill: string; index: number; activeIndex: number }) {
  const isActive = index === activeIndex;

  return (
    <motion.div
      initial={{
        opacity: 0.3,
        scale: 0.95,
        color: 'var(--muted-foreground)',
      }}
      animate={{
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.95,
        color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
      }}
      transition={{
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="py-8 text-4xl tracking-tight uppercase sm:text-5xl md:text-6xl lg:text-7xl"
      style={{ fontFamily: "'Geist Variable', sans-serif", fontWeight: 400 }}
    >
      {skill}
    </motion.div>
  );
}

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const newIndex = Math.min(
      skills.length - 1,
      Math.floor(latest * skills.length)
    );
    setActiveIndex(newIndex);
  });

  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills</h2>
          <p className="mt-3 text-muted-foreground">
            Core capabilities that drive my design practice
          </p>
        </div>

        <div ref={containerRef} className="flex flex-col items-center">
          {skills.map((skill, index) => (
            <SkillItem key={skill} skill={skill} index={index} activeIndex={activeIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}
