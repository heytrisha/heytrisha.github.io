'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { MoodboardItemRenderer } from '@/components/moodboard/Registry';
import { moodboardItems } from '@/data/lifeData';
import {
  defaultPositions,
  type ItemOffset,
} from '@/data/lifePositions';

interface DragState {
  mode: 'move' | 'rotate';
  index: number;
  startMouseX: number;
  startMouseY: number;
  startOffsetX: number;
  startOffsetY: number;
  startRotation: number;
}

const STORAGE_KEY = 'life-moodboard-positions';

function loadOffsets(): ItemOffset[] {
  if (typeof window === 'undefined') return defaultPositions;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPositions;
    const parsed = JSON.parse(raw);
    if (
      Array.isArray(parsed) &&
      parsed.length === defaultPositions.length &&
      parsed.every(
        (o: unknown) =>
          typeof o === 'object' &&
          o !== null &&
          'x' in o &&
          'y' in o &&
          'rotate' in o
      )
    ) {
      return parsed as ItemOffset[];
    }
  } catch {
    // ignore malformed storage
  }
  return defaultPositions;
}

function findItemIndex(target: HTMLElement): number | null {
  let el: HTMLElement | null = target;
  while (el) {
    const idx = el.dataset.itemIndex;
    if (idx !== undefined) {
      const n = parseInt(idx, 10);
      if (!Number.isNaN(n)) return n;
    }
    el = el.parentElement;
  }
  return null;
}

interface LifeMoodboardProps {
  editor?: boolean;
}

export function LifeMoodboard({ editor = false }: LifeMoodboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<ItemOffset[]>(loadOffsets);
  const offsetsRef = useRef(offsets);
  offsetsRef.current = offsets;
  const dragStateRef = useRef<DragState | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [copyFeedback, setCopyFeedback] = useState(false);
  const [resetFeedback, setResetFeedback] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!editor) return;
      const container = containerRef.current;
      if (!container) return;

      const index = findItemIndex(e.target as HTMLElement);
      if (index === null) return;

      e.preventDefault();
      container.setPointerCapture(e.pointerId);
      setActiveIndex(index);

      const current = offsetsRef.current[index];
      const target = e.target as HTMLElement;
      const isRotate = target.closest('[data-rotate-handle]') !== null;

      if (isRotate) {
        dragStateRef.current = {
          mode: 'rotate',
          index,
          startMouseX: e.clientX,
          startMouseY: e.clientY,
          startOffsetX: current.x,
          startOffsetY: current.y,
          startRotation: current.rotate,
        };
      } else {
        dragStateRef.current = {
          mode: 'move',
          index,
          startMouseX: e.clientX,
          startMouseY: e.clientY,
          startOffsetX: current.x,
          startOffsetY: current.y,
          startRotation: current.rotate,
        };
      }
    },
    [editor]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!editor) return;
      const ds = dragStateRef.current;
      if (!ds) return;

      if (ds.mode === 'move') {
        const dx = e.clientX - ds.startMouseX;
        const dy = e.clientY - ds.startMouseY;
        setOffsets((prev) => {
          const next = [...prev];
          next[ds.index] = {
            ...next[ds.index],
            x: ds.startOffsetX + dx,
            y: ds.startOffsetY + dy,
          };
          return next;
        });
      } else if (ds.mode === 'rotate') {
        const dx = e.clientX - ds.startMouseX;
        const rotationDelta = dx * 0.1;
        setOffsets((prev) => {
          const next = [...prev];
          next[ds.index] = {
            ...next[ds.index],
            rotate: ds.startRotation + rotationDelta,
          };
          return next;
        });
      }
    },
    [editor]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!editor) return;
      const container = containerRef.current;
      if (container) {
        container.releasePointerCapture(e.pointerId);
      }
      dragStateRef.current = null;
      setActiveIndex(null);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(offsetsRef.current));
    },
    [editor]
  );

  const handleCopyPositions = useCallback(() => {
    const rounded = offsetsRef.current.map((o) => ({
      x: Math.round(o.x),
      y: Math.round(o.y),
      rotate: Math.round(o.rotate * 10) / 10,
    }));

    const lines = rounded
      .map((o) => `  { "x": ${o.x}, "y": ${o.y}, "rotate": ${o.rotate} }`)
      .join(',\n');

    const formatted = `[\n${lines}\n]`;
    navigator.clipboard.writeText(formatted).catch(() => {});
    setCopyFeedback(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopyFeedback(false), 2000);
  }, []);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setOffsets(defaultPositions);
    setResetFeedback(true);
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = setTimeout(() => setResetFeedback(false), 2000);
  }, []);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative mx-auto w-full select-none"
        style={{
          height: 640,
          touchAction: editor ? 'none' : 'auto',
        }}
        onPointerDown={editor ? handlePointerDown : undefined}
        onPointerMove={editor ? handlePointerMove : undefined}
        onPointerUp={editor ? handlePointerUp : undefined}
      >
        {moodboardItems.map((item, index) => {
          const offset = offsets[index] ?? defaultPositions[index];
          return (
            <div
              key={index}
              data-item-index={index}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) rotate(${offset.rotate}deg)`,
                zIndex: activeIndex === index ? 20 : 10,
              }}
            >
              <MoodboardItemRenderer item={item} />
            </div>
          );
        })}
      </div>

      {editor && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleCopyPositions}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            {copyFeedback ? 'Copied!' : 'Copy Positions'}
          </button>
          <button
            onClick={handleReset}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            {resetFeedback ? 'Reset!' : 'Reset'}
          </button>
        </div>
      )}
    </div>
  );
}
