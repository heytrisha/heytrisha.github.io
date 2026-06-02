import { Polaroid } from './Polaroid';
import { StickyNote } from './StickyNote';
import type { MoodboardItem } from '@/data/moodboard/items';

const componentMap = {
  polaroid: Polaroid,
  stickyNote: StickyNote,
};

export function MoodboardItemRenderer({ item }: { item: MoodboardItem }) {
  const Component = componentMap[item.type];
  return <Component {...item.props} />;
}
