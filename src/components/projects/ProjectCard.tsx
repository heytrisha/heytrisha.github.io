'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

interface Props {
  project: CollectionEntry<'projects'>;
  index: number;
  basePath: string;
  active: boolean;
  imageModule: ImageMetadata;
}

const colors = [
  '#5eead4',
  '#c4b5fd',
  '#fdba74',
  '#f9a8d4',
  '#7dd3fc',
  '#86efac',
];

export function ProjectCard({ project, index, basePath, active, imageModule }: Props) {
  const [hovered, setHovered] = useState(false);
  const color = colors[index % colors.length];
  const projectNumber = String(index + 1).padStart(2, '0');
  const isActive = active || hovered;

  return (
    <a
      href={`${basePath}/projects/${project.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block aspect-[3/4] overflow-hidden rounded-lg"
    >
      <motion.div
        animate={{ filter: isActive ? 'grayscale(0)' : 'grayscale(100%)' }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
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

      <motion.div
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{ background: `linear-gradient(to top, ${color} 0%, ${color} 6%, transparent 20%)` }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="absolute bottom-6 left-6">
        <span className="text-sm font-medium" style={{ color }}>
          {projectNumber}
        </span>
        <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">
          {project.data.title}
        </h3>
      </div>
    </a>
  );
}
