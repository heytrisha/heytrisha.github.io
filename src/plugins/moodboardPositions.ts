import fs from 'node:fs';
import path from 'node:path';

export default function moodboardPositionsPlugin() {
  return {
    name: 'moodboard-positions',
    configureServer(server) {
      server.middlewares.use('/__moodboard/save-positions', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        try {
          let body = '';
          for await (const chunk of req) {
            body += chunk;
          }

          const positions = JSON.parse(body);
          if (!Array.isArray(positions) || positions.length === 0) {
            res.statusCode = 400;
            res.end('Invalid positions: expected non-empty array');
            return;
          }

          const valid = positions.every(
            (p) =>
              typeof p === 'object' &&
              p !== null &&
              typeof p.x === 'number' &&
              typeof p.y === 'number' &&
              typeof p.rotate === 'number'
          );

          if (!valid) {
            res.statusCode = 400;
            res.end('Invalid positions: each item must have x, y, rotate as numbers');
            return;
          }

          const rounded = positions.map((o) => ({
            x: Math.round(o.x),
            y: Math.round(o.y),
            rotate: Math.round(o.rotate * 10) / 10,
          }));

          const lines = rounded
            .map((o) => `  { "x": ${o.x}, "y": ${o.y}, "rotate": ${o.rotate} }`)
            .join(',\n');

          const fileContent = `// Source of truth for moodboard layout positions.
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
${lines}
];
`;

          const filePath = path.resolve(process.cwd(), 'src/data/moodboard/positions.ts');
          fs.writeFileSync(filePath, fileContent, 'utf-8');

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('OK');
        } catch (err) {
          console.error('[moodboard-positions] Error saving positions:', err);
          res.statusCode = 500;
          res.end('Internal server error');
        }
      });
    },
  };
}
