export type MoodboardItem =
  | { type: 'polaroid'; props: { color: string; caption: string; src?: string } }
  | { type: 'stickyNote'; props: { text: string; color: string } };

export const moodboardItems: MoodboardItem[] = [
  { type: 'polaroid', props: { color: '#e8c4c4', caption: 'Indigo Blues', src: '/src/assets/images/life/indigo.jpeg' } },
  { type: 'polaroid', props: { color: '#c4d4e8', caption: 'Vistara Days', src: '/src/assets/images/life/vistara.jpeg' } },
  { type: 'polaroid', props: { color: '#d4e8c4', caption: 'The Goodbye', src: '/src/assets/images/life/airindia.jpeg' } },
  { type: 'polaroid', props: { color: '#e8d4c4', caption: 'Oatmeal', src: '/src/assets/images/life/dog.jpeg' } },
  { type: 'polaroid', props: { color: '#c4c8e8', caption: 'Trekking', src: '/src/assets/images/life/trekking.jpeg' } },
  { type: 'polaroid', props: { color: '#e8c4d4', caption: 'Coffee', src: '/src/assets/images/life/coffee.jpeg' } },
  { type: 'polaroid', props: { color: '#c4e8d8', caption: 'Travel', src: '/src/assets/images/life/srilanka.jpeg' } },
  { type: 'stickyNote', props: { text: 'Ideas here', color: '#fef3c7' } },
  { type: 'stickyNote', props: { text: "Don't forget", color: '#dbeafe' } },
];
