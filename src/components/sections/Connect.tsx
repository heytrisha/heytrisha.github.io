'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { site } from '@/data/site';

const phrases = [
  "Let's build something",
  "Let's design together",
  "Let's make it real",
  "Let's connect",
];

export default function ConnectSlotMachine() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="connect" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="h-16 sm:h-20 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ y: 40, opacity: 0, rotateX: -40 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -40, opacity: 0, rotateX: 40 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="text-3xl font-bold tracking-tight sm:text-5xl"
              style={{ perspective: 500 }}
            >
              {phrases[index]}
            </motion.h2>
          </AnimatePresence>
        </div>

        <p className="mt-4 text-muted-foreground">
          Currently open for collaborations and new opportunities
        </p>

        <a
          href={`mailto:${site.email}`}
          className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Say hello
        </a>

        <div className="mt-10 flex items-center justify-center gap-8">
          {site.socials.github && (
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          )}
          {site.socials.linkedin && (
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
          )}
          {site.socials.behance && (
            <a
              href={site.socials.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Behance
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
