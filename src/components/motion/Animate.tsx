'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { animate, inView } from 'motion';

type Variant = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';

interface AnimateProperties {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
}

const variants: Record<Variant, { from: Record<string, string>; to: Record<string, string> }> = {
  'fade-up': {
    from: { opacity: '0', transform: 'translateY(30px)' },
    to: { opacity: '1', transform: 'translateY(0)' },
  },
  'fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  'slide-left': {
    from: { opacity: '0', transform: 'translateX(-40px)' },
    to: { opacity: '1', transform: 'translateX(0)' },
  },
  'slide-right': {
    from: { opacity: '0', transform: 'translateX(40px)' },
    to: { opacity: '1', transform: 'translateX(0)' },
  },
  'scale-up': {
    from: { opacity: '0', transform: 'scale(0.95)' },
    to: { opacity: '1', transform: 'scale(1)' },
  },
};

export function Animate({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  className = '',
}: AnimateProperties) {
  const reference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = reference.current;
    if (!element) return;

    const { from, to } = variants[variant];

    // Set initial state
    Object.assign(element.style, from);

    const stop = inView(element, () => {
      animate(element, { ...to } as Record<string, string | number>, {
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1],
      });
      // Trigger once, then unobserve
      return () => {};
    });

    return () => stop?.();
  }, [variant, delay, duration]);

  return (
    <div ref={reference} className={className}>
      {children}
    </div>
  );
}
