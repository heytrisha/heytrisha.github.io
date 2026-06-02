'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { LifeMoodboard } from './LifeMoodboard';
import { LifeMobile } from './LifeMobile';

export function Life() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isDev = import.meta.env.DEV;

  return (
    <section id="life" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Life
          </h2>
          <p className="mt-3 text-muted-foreground">
            Moments beyond the screen
          </p>
        </div>
        {isDesktop ? (
          <LifeMoodboard editor={isDev} />
        ) : (
          <LifeMobile />
        )}
      </div>
    </section>
  );
}
