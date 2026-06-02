interface StickyNoteProps {
  text: string;
  color: string;
}

export function StickyNote({ text, color }: StickyNoteProps) {
  return (
    <div
      className="relative w-40 p-4 sm:w-44"
      style={{
        backgroundColor: color,
        boxShadow: '2px 4px 10px rgba(0,0,0,0.12)',
      }}
    >
      {/* Tape strip = rotation handle for this type */}
      <div
        data-rotate-handle
        className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 cursor-ew-resize"
      >
        <div
          className="h-5 w-14 rounded-sm opacity-70"
          style={{
            backgroundColor: 'rgba(255,255,255,0.6)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            transform: 'rotate(-3deg)',
          }}
        />
      </div>

      <p className="mt-3 text-center text-sm font-medium text-neutral-800">
        {text}
      </p>
    </div>
  );
}
