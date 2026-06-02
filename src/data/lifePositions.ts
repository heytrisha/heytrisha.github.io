// Source of truth for moodboard layout positions.
//
// Workflow:
// 1. Arrange items in dev mode (drag body to move, drag pin/tape to rotate).
// 2. Click "Save to File" — positions are written to this file automatically.
// 3. Commit. Staging/production will build with these exact positions.
//
// Do NOT edit these numbers by hand unless you know what you're doing.

export interface ItemOffset {
  x: number;
  y: number;
  rotate: number;
}

export const defaultPositions: ItemOffset[] = [
  { "x": -272, "y": -184, "rotate": -8 },
  { "x": 285, "y": -264, "rotate": -6.2 },
  { "x": -212, "y": 95, "rotate": 12 },
  { "x": 218, "y": 190, "rotate": -9.3 },
  { "x": 102, "y": -175, "rotate": 3 },
  { "x": -44, "y": 145, "rotate": -7.4 },
  { "x": 386, "y": 84, "rotate": 7 },
  { "x": 287, "y": 21, "rotate": 14.6 },
  { "x": 18, "y": -194, "rotate": -15 }
];
