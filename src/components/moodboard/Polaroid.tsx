interface PolaroidProps {
  color: string;
  caption: string;
  src?: string;
}

export function Polaroid({ color, caption, src }: PolaroidProps) {
  return (
    <div
      className="relative w-44 bg-white sm:w-48"
      style={{
        padding: '14px 14px 20px 14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      {/* Pushpin — also serves as rotation handle in dev mode */}
      <div
        data-rotate-handle
        className="absolute left-1/2 top-2 z-10 -translate-x-1/2 cursor-ew-resize"
      >
        <div
          className="h-8 w-8 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #e85959, #a61e1e)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
          }}
        />
      </div>

      <div className="aspect-[3/4] w-full overflow-hidden">
        {src ? (
          <img
            src={src}
            alt={caption}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full" style={{ backgroundColor: color }} />
        )}
      </div>

      <p
        className="mt-2 text-center text-3xl lowercase text-neutral-900"
        style={{
          fontFamily: "'Caveat', cursive",
          fontWeight: 700,
        }}
      >
        {caption.toLowerCase()}
      </p>
    </div>
  );
}
