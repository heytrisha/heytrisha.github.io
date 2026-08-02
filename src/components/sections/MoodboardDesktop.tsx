'use client';

import { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { MoodboardItemRenderer } from '@/components/moodboard/ItemRenderer';
import type { MoodboardItem } from '@/data/moodboard/items';
import { defaultPositions, type ItemOffset } from '@/data/moodboard/positions';

interface DragState {
  mode: 'move' | 'rotate';
  index: number;
  startMouseX: number;
  startMouseY: number;
  startOffsetX: number;
  startOffsetY: number;
  startRotation: number;
}

const STORAGE_KEY = 'moodboard-positions';

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
          typeof o === 'object' && o !== null && 'x' in o && 'y' in o && 'rotate' in o,
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
  let element: HTMLElement | null = target;
  while (element) {
    const index = element.dataset.itemIndex;
    if (index !== undefined) {
      const n = parseInt(index, 10);
      if (!Number.isNaN(n)) return n;
    }
    element = element.parentElement;
  }
  return null;
}

interface MoodboardDesktopProperties {
  items: MoodboardItem[];
  editor?: boolean;
}

export function MoodboardDesktop({ items, editor = false }: MoodboardDesktopProperties) {
  const containerReference = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<ItemOffset[]>(loadOffsets);
  const offsetsReference = useRef(offsets);
  useLayoutEffect(() => {
    offsetsReference.current = offsets;
  });
  const dragStateReference = useRef<DragState | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [copyFeedback, setCopyFeedback] = useState(false);
  const [resetFeedback, setResetFeedback] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const copyTimeoutReference = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimeoutReference = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveTimeoutReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutReference.current) clearTimeout(copyTimeoutReference.current);
      if (resetTimeoutReference.current) clearTimeout(resetTimeoutReference.current);
      if (saveTimeoutReference.current) clearTimeout(saveTimeoutReference.current);
    };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!editor) return;
      const container = containerReference.current;
      if (!container) return;

      const index = findItemIndex(e.target as HTMLElement);
      if (index === null) return;

      e.preventDefault();
      container.setPointerCapture(e.pointerId);
      setActiveIndex(index);

      const current = offsetsReference.current[index];
      const target = e.target as HTMLElement;
      const isRotate = target.closest('[data-rotate-handle]') !== null;

      dragStateReference.current = isRotate
        ? {
            mode: 'rotate',
            index,
            startMouseX: e.clientX,
            startMouseY: e.clientY,
            startOffsetX: current.x,
            startOffsetY: current.y,
            startRotation: current.rotate,
          }
        : {
            mode: 'move',
            index,
            startMouseX: e.clientX,
            startMouseY: e.clientY,
            startOffsetX: current.x,
            startOffsetY: current.y,
            startRotation: current.rotate,
          };
    },
    [editor],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!editor) return;
      const ds = dragStateReference.current;
      if (!ds) return;

      if (ds.mode === 'move') {
        const dx = e.clientX - ds.startMouseX;
        const dy = e.clientY - ds.startMouseY;
        setOffsets((previous) => {
          const next = [...previous];
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
        setOffsets((previous) => {
          const next = [...previous];
          next[ds.index] = {
            ...next[ds.index],
            rotate: ds.startRotation + rotationDelta,
          };
          return next;
        });
      }
    },
    [editor],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!editor) return;
      const container = containerReference.current;
      if (container) {
        container.releasePointerCapture(e.pointerId);
      }
      dragStateReference.current = null;
      setActiveIndex(null);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(offsetsReference.current));
    },
    [editor],
  );

  const handleCopyPositions = useCallback(() => {
    const rounded = offsetsReference.current.map((o) => ({
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
    if (copyTimeoutReference.current) clearTimeout(copyTimeoutReference.current);
    copyTimeoutReference.current = setTimeout(() => setCopyFeedback(false), 2000);
  }, []);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setOffsets(defaultPositions);
    setResetFeedback(true);
    if (resetTimeoutReference.current) clearTimeout(resetTimeoutReference.current);
    resetTimeoutReference.current = setTimeout(() => setResetFeedback(false), 2000);
  }, []);

  const handleSaveToFile = useCallback(async () => {
    setSaveFeedback('saving');
    try {
      const res = await fetch('/__moodboard/save-positions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offsetsReference.current),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSaveFeedback('saved');
      if (saveTimeoutReference.current) clearTimeout(saveTimeoutReference.current);
      saveTimeoutReference.current = setTimeout(() => setSaveFeedback('idle'), 2000);
    } catch {
      setSaveFeedback('error');
      if (saveTimeoutReference.current) clearTimeout(saveTimeoutReference.current);
      saveTimeoutReference.current = setTimeout(() => setSaveFeedback('idle'), 2000);
    }
  }, []);

  const saveLabel =
    saveFeedback === 'saving'
      ? 'Saving...'
      : saveFeedback === 'saved'
        ? 'Saved!'
        : saveFeedback === 'error'
          ? 'Error'
          : 'Save to File';

  return (
    <div className="relative">
      <div
        ref={containerReference}
        className="relative mx-auto w-full select-none"
        style={{
          height: 640,
          touchAction: editor ? 'none' : 'auto',
        }}
        onPointerDown={editor ? handlePointerDown : undefined}
        onPointerMove={editor ? handlePointerMove : undefined}
        onPointerUp={editor ? handlePointerUp : undefined}
      >
        {items.map((item, index) => {
          const offset = offsets[index] ?? defaultPositions[index];
          return (
            <div
              key={index}
              data-item-index={index}
              className="absolute top-1/2 left-1/2"
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
            onClick={handleSaveToFile}
            className="border-border bg-card hover:bg-muted rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
          >
            {saveLabel}
          </button>
          <button
            onClick={handleCopyPositions}
            className="border-border bg-card hover:bg-muted rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
          >
            {copyFeedback ? 'Copied!' : 'Copy Positions'}
          </button>
          <button
            onClick={handleReset}
            className="border-border bg-card hover:bg-muted rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
          >
            {resetFeedback ? 'Reset!' : 'Reset'}
          </button>
        </div>
      )}
    </div>
  );
}
