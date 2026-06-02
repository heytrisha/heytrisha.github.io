import { Polaroid } from '@/components/ui/Polaroid';
import { StickyNote } from './StickyNote';
import type { MoodboardItem } from '@/data/lifeData';

const componentMap = {
  polaroid: Polaroid,
  stickyNote: StickyNote,
};

export function MoodboardItemRenderer({ item }: { item: MoodboardItem }) {
  const Component = componentMap[item.type];
  return <Component {...item.props} />;
}
