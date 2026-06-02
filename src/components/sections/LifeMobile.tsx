import { moodboardItems, defaultPositions } from '@/data/lifeData';
import { MoodboardItemRenderer } from '@/components/moodboard/Registry';

export function LifeMobile() {
  return (
    <div className="flex flex-col items-center gap-10 py-8">
      {moodboardItems.map((item, index) => (
        <div
          key={index}
          className="w-64 sm:w-72"
          style={{ transform: `rotate(${defaultPositions[index].rotate}deg)` }}
        >
          <MoodboardItemRenderer item={item} />
        </div>
      ))}
    </div>
  );
}
