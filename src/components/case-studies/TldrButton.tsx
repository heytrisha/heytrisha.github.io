'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Mirrors src/styles/main.css [data-accent] tokens (dialog renders in a portal,
// outside the article's accent scope, so the hex travels as a prop instead).
const accentHex: Record<string, string> = {
  amber: '#fbbf24',
  violet: '#a78bfa',
  orange: '#e06100',
};

// Renders **bold** markers inside tldr strings; anything else stays plain text.
// A string starting with '## ' renders as a section heading instead of a bullet.
function renderRichText(text: string) {
  return text.split('**').map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-[#fafafa]">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

interface TldrButtonProperties {
  projectTitle: string;
  accent: string;
  points: string[];
}

export function TldrButton({ projectTitle, accent, points }: TldrButtonProperties) {
  const [open, setOpen] = useState(false);

  if (points.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="fixed bottom-6 left-1/2 z-50 h-10 -translate-x-1/2 rounded-full px-8 shadow-xl" />
        }
      >
        TL;DR
      </DialogTrigger>
      <DialogContent className="bg-background border-border fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border p-6 shadow-2xl sm:max-w-6xl md:w-[calc(100vw-4rem)] md:p-8">
        <DialogTitle className="text-lg font-semibold tracking-tight">
          TL;DR — {projectTitle}
        </DialogTitle>
        <ul className="mt-4 space-y-3">
          {points.map((point) =>
            point.startsWith('## ') ? (
              <li key={point} className="pt-2 text-sm font-semibold text-[#fafafa]">
                {renderRichText(point.slice(3))}
              </li>
            ) : (
              <li key={point} className="flex gap-3 text-sm leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: accentHex[accent] ?? accentHex.amber }}
                />
                <span className="text-foreground/80">{renderRichText(point)}</span>
              </li>
            ),
          )}
        </ul>
        <Button onClick={() => setOpen(false)} variant="outline" className="mt-6 w-full">
          Back to the story
        </Button>
      </DialogContent>
    </Dialog>
  );
}
