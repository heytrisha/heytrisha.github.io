'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { ProjectCard } from '@/components/projects/ProjectCard';

interface Props {
  projects: CollectionEntry<'projects'>[];
  basePath: string;
  images: Record<string, ImageMetadata>;
}

export function Work({ projects, basePath, images }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const update = () => setScrollActive(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!scrollActive || projects.length === 0) return;
    const newIndex = Math.min(
      projects.length - 1,
      Math.floor(latest * projects.length)
    );
    setActiveIndex(newIndex);
  });

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Work</h2>
          <p className="mt-3 text-muted-foreground">
            Selected projects and case studies
          </p>
        </div>
      </div>

      {projects.length > 0 ? (
        <div ref={containerRef} className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                basePath={basePath}
                active={scrollActive && index === activeIndex}
                imageModule={images[project.id]}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-xl border border-foreground/10 bg-card p-12 text-center">
            <p className="text-muted-foreground">Work coming soon</p>
          </div>
        </div>
      )}
    </section>
  );
}
