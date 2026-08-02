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
}

export function ProjectCard({ project, index, basePath, active, imageModule }: Properties) {
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
      className="group relative block aspect-[3/4] overflow-hidden rounded-lg"
    >
      <motion.div
        animate={{ filter: isActive ? 'grayscale(0)' : 'grayscale(100%)' }}
        transition={transition}
        className="absolute inset-0 size-full scale-[1.1]"
      >
        <img
          src={imageModule.src}
          alt={project.data.title}
          width={imageModule.width}
          height={imageModule.height}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="absolute bottom-6 left-6">
        <span className="text-muted-foreground text-sm font-medium">{projectNumber}</span>
        <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">
          {project.data.title}
        </h3>
      </div>
    </a>
  );
}
