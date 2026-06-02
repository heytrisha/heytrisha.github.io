export interface ItemOffset {
  x: number;
  y: number;
  rotate: number;
}

export type MoodboardItem =
  | { type: 'polaroid'; props: { color: string; caption: string } }
  | { type: 'stickyNote'; props: { text: string; color: string } };

export const moodboardItems: MoodboardItem[] = [
  { type: 'polaroid', props: { color: '#e8c4c4', caption: 'Wanderlust' } },
  { type: 'polaroid', props: { color: '#c4d4e8', caption: 'Morning Brew' } },
  { type: 'polaroid', props: { color: '#d4e8c4', caption: 'Green Thumbs' } },
  { type: 'polaroid', props: { color: '#e8d4c4', caption: 'Studio Vibes' } },
  { type: 'polaroid', props: { color: '#c4c8e8', caption: 'Late Nights' } },
  { type: 'polaroid', props: { color: '#e8c4d4', caption: 'City Walks' } },
  { type: 'polaroid', props: { color: '#c4e8d8', caption: 'Ocean Air' } },
  { type: 'stickyNote', props: { text: 'Ideas here', color: '#fef3c7' } },
  { type: 'stickyNote', props: { text: "Don't forget", color: '#dbeafe' } },
];

export const defaultPositions: ItemOffset[] = [
  { x: -180, y: -160, rotate: -8 },
  { x: 200, y: -140, rotate: 5 },
  { x: -220, y: 80, rotate: 12 },
  { x: 160, y: 100, rotate: -6 },
  { x: 40, y: -200, rotate: 3 },
  { x: -60, y: 180, rotate: -10 },
  { x: 240, y: 40, rotate: 7 },
  { x: -140, y: 220, rotate: -4 },
  { x: 280, y: -100, rotate: 9 },
];
