'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface CursorProperties {
  name?: string;
  color?: string;
}

const SPRING_CONFIG = { stiffness: 250, damping: 30, mass: 0.5 };

export function Cursor({ name = 'me', color = '#7DD3FC' }: CursorProperties) {
  const isTouch = useMediaQuery('(pointer: coarse)');
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof globalThis.matchMedia === 'function'
      ? globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);
  const springX = useSpring(targetX, SPRING_CONFIG);
  const springY = useSpring(targetY, SPRING_CONFIG);

  useEffect(() => {
    if (isTouch) return;

    const motionQuery = globalThis.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    motionQuery.addEventListener('change', onMotionChange);

    document.documentElement.setAttribute('data-cursor-active', '');

    let frame = 0;
    const updatePosition = (clientX: number, clientY: number) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        if (reducedMotion) {
          targetX.set(clientX);
          targetY.set(clientY);
        } else {
          springX.jump(clientX);
          springY.jump(clientY);
        }
        frame = 0;
      });
    };

    const onMouseMove = (event: MouseEvent) => {
      setIsVisible(true);
      updatePosition(event.clientX, event.clientY);
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      motionQuery.removeEventListener('change', onMotionChange);
      document.documentElement.removeAttribute('data-cursor-active');
    };
  }, [isTouch, reducedMotion, targetX, targetY, springX, springY]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ x: springX, y: springY }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isPressed ? 0.85 : 1,
      }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
    >
      <svg
        width="20"
        height="22"
        viewBox="0 0 96 104"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block drop-shadow"
      >
        <path
          d="M0.86065 0.697766L95.7812 51.5907L50.3553 59.6832L34.4976 103.014L0.86065 0.697766Z"
          fill={color}
        />
      </svg>
      <span
        className="absolute top-5 left-4 rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white shadow-sm"
        style={{ backgroundColor: color }}
      >
        {name}
      </span>
    </motion.div>
  );
}
