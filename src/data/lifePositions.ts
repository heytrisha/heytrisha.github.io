// Source of truth for moodboard layout positions.
//
// Workflow:
// 1. Arrange items in dev mode (drag body to move, drag pin/tape to rotate).
// 2. Click "Copy Positions" — JSON is copied to clipboard.
// 3. Paste here, replacing the array below.
// 4. Commit. Staging/production will build with these exact positions.
//
// Do NOT edit these numbers by hand unless you know what you're doing.

export interface ItemOffset {
  x: number;
  y: number;
  rotate: number;
}

export const defaultPositions: ItemOffset[] = [
  { "x": -242, "y": -165, "rotate": -8 },
  { "x": 285, "y": -264, "rotate": -6.2 },
  { "x": -144, "y": 110, "rotate": 12 },
  { "x": 203, "y": 133, "rotate": -6 },
  { "x": 102, "y": -175, "rotate": 3 },
  { "x": -9, "y": 210, "rotate": -10 },
  { "x": 381, "y": 76, "rotate": 7 },
  { "x": -283, "y": 73, "rotate": -4 },
  { "x": -37, "y": -256, "rotate": -18.1 }
];
