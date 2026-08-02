'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MoodboardDesktop } from './MoodboardDesktop';
import { MoodboardMobile } from './MoodboardMobile';
import type { MoodboardItem } from '@/data/moodboard/items';

interface LifeProperties {
  items: MoodboardItem[];
}

export function Life({ items }: LifeProperties) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isDevelopment = import.meta.env.DEV;

  return (
    <section id="life" tabIndex={-1} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Life</h2>
          <p className="text-muted-foreground mt-3">Moments beyond the screen</p>
        </div>
        {isDesktop ? (
          <MoodboardDesktop items={items} editor={isDevelopment} />
        ) : (
          <MoodboardMobile items={items} />
        )}
      </div>
    </section>
  );
}
