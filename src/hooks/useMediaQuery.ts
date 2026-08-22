import { useSyncExternalStore } from 'react';

function getMatchMedia(): ((query: string) => MediaQueryList) | null {
  return typeof globalThis.matchMedia === 'function'
    ? globalThis.matchMedia.bind(globalThis)
    : null;
}

function subscribe(query: string, callback: (event: MediaQueryListEvent) => void) {
  const match = getMatchMedia();
  if (!match) return () => {};
  const media = match(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => getMatchMedia()?.(query).matches ?? false,
    () => false,
  );
}
