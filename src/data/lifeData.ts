export interface PolaroidItem {
  color: string;
  caption: string;
}

export interface PolaroidOffset {
  x: number;
  y: number;
  rotate: number;
}

export const polaroids: PolaroidItem[] = [
  { color: '#e8c4c4', caption: 'Wanderlust' },
  { color: '#c4d4e8', caption: 'Morning Brew' },
  { color: '#d4e8c4', caption: 'Green Thumbs' },
  { color: '#e8d4c4', caption: 'Studio Vibes' },
  { color: '#c4c8e8', caption: 'Late Nights' },
  { color: '#e8c4d4', caption: 'City Walks' },
  { color: '#c4e8d8', caption: 'Ocean Air' },
];

export const defaultPositions: PolaroidOffset[] = [
  { x: -180, y: -160, rotate: -8 },
  { x: 200, y: -140, rotate: 5 },
  { x: -220, y: 80, rotate: 12 },
  { x: 160, y: 100, rotate: -6 },
  { x: 40, y: -200, rotate: 3 },
  { x: -60, y: 180, rotate: -10 },
  { x: 240, y: 40, rotate: 7 },
];
