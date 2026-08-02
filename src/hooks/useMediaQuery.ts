import { useSyncExternalStore } from 'react';

function subscribe(query: string, callback: (event: MediaQueryListEvent) => void) {
  const media = globalThis.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => globalThis.matchMedia(query).matches,
    () => false,
  );
}
