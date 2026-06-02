import { moodboardItems } from '@/data/moodboard/items';
import { defaultPositions } from '@/data/moodboard/positions';
import { MoodboardItemRenderer } from '@/components/moodboard/ItemRenderer';

export function MoodboardMobile() {
  return (
    <div className="flex flex-col items-center gap-10 py-8">
      {moodboardItems.map((item, index) => (
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
