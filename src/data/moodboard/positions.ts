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
  { "x": -264, "y": -185, "rotate": -4.9 },
  { "x": -67, "y": -134, "rotate": 7.6 },
  { "x": -157, "y": 179, "rotate": 0.7 },
  { "x": 348, "y": 221, "rotate": 5.2 },
  { "x": 205, "y": -237, "rotate": 12.2 },
  { "x": 165, "y": 145, "rotate": -7.4 },
  { "x": 383, "y": -130, "rotate": -7 },
  { "x": 194, "y": -36, "rotate": 4.2 },
  { "x": -102, "y": -310, "rotate": -15 }
];
