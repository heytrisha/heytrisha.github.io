'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Properties {
  project: CollectionEntry<'projects'>;
  index: number;
  basePath: string;
  active: boolean;
  imageModule: ImageMetadata;
  flip?: boolean;
}

export function ProjectCard({
  project,
  index,
  basePath,
  active,
  imageModule,
  flip = false,
}: Properties) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const projectNumber = String(index + 1).padStart(2, '0');
  const isActive = active || hovered;
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const };

  return (
    <a
      href={`${basePath}/projects/${project.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group border-foreground/10 bg-card focus-visible:ring-ring grid grid-cols-1 gap-6 rounded-xl border p-4 transition-colors focus-visible:ring-2 focus-visible:outline-none sm:p-5 md:grid-cols-2 md:items-center md:gap-10 md:p-6"
    >
      <motion.div
        animate={{ filter: isActive ? 'grayscale(0)' : 'grayscale(100%)' }}
        transition={transition}
        className={`overflow-hidden rounded-lg ${flip ? 'md:order-2' : ''}`}
      >
        <img
          src={imageModule.src}
          alt={project.data.title}
          width={imageModule.width}
          height={imageModule.height}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] size-full object-cover"
        />
      </motion.div>

      <div className={flip ? 'md:order-1' : ''}>
        <span className="text-muted-foreground text-sm font-medium">{projectNumber}</span>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {project.data.title}
        </h3>
        <p className="text-muted-foreground mt-3 max-w-[65ch] leading-relaxed">
          {project.data.description}
        </p>
        {project.data.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Project tags">
            {project.data.tags.map((tag) => (
              <li
                key={tag}
                className="border-foreground/10 bg-muted rounded-full border px-3 py-1 text-xs font-medium"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
          View case study
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </a>
  );
}
