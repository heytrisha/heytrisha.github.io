import { useEffect, useRef } from 'react';
import { defaultPositions } from '@/data/moodboard/positions';
import { MoodboardItemRenderer } from '@/components/moodboard/ItemRenderer';
import type { MoodboardItem } from '@/data/moodboard/items';

interface MoodboardMobileProperties {
  items: MoodboardItem[];
}

const COMPOSITION_WIDTH = 900;
const COMPOSITION_HEIGHT = 640;
const SCALE = 0.5;

export function MoodboardMobile({ items }: MoodboardMobileProperties) {
  const scrollReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollReference.current;
    if (!element) return;
    element.scrollLeft = (element.scrollWidth - element.clientWidth) / 2;
  }, []);

  return (
    <div
      ref={scrollReference}
      className="overflow-x-auto py-8"
      style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' }}
    >
      <div
        className="relative mx-auto"
        style={{
          width: COMPOSITION_WIDTH * SCALE,
          height: COMPOSITION_HEIGHT * SCALE,
        }}
      >
        <div
          className="relative"
          style={{
            width: COMPOSITION_WIDTH,
            height: COMPOSITION_HEIGHT,
            transform: `scale(${SCALE})`,
            transformOrigin: 'top left',
          }}
        >
          {items.map((item, index) => {
            const offset = defaultPositions[index];
            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) rotate(${offset.rotate}deg)`,
                }}
              >
                <MoodboardItemRenderer item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
