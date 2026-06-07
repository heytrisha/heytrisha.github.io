import { defaultPositions } from '@/data/moodboard/positions';
import { MoodboardItemRenderer } from '@/components/moodboard/ItemRenderer';
import type { MoodboardItem } from '@/data/moodboard/items';

interface MoodboardMobileProps {
  items: MoodboardItem[];
}

export function MoodboardMobile({ items }: MoodboardMobileProps) {
  return (
    <div className="flex flex-col items-center gap-10 py-8">
      {items.map((item, index) => (
        <div
          key={index}
          style={{ transform: `rotate(${defaultPositions[index].rotate}deg)` }}
        >
          <MoodboardItemRenderer item={item} />
        </div>
      ))}
    </div>
  );
}
