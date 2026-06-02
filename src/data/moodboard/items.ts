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
