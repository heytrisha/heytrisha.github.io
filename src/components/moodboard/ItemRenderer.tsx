import { Polaroid } from './Polaroid';
import { StickyNote } from './StickyNote';
import type { MoodboardItem } from '@/data/moodboard/items';
import type { ComponentProps, ReactElement } from 'react';

const componentMap = {
  polaroid: Polaroid,
  stickyNote: StickyNote,
} as const;

type AnyComponent = (
  props: ComponentProps<typeof Polaroid> | ComponentProps<typeof StickyNote>,
) => ReactElement;

export function MoodboardItemRenderer({ item }: { item: MoodboardItem }) {
  const Component = componentMap[item.type] as AnyComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Component {...(item.props as any)} />;
}
