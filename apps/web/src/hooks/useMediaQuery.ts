import { useState, useEffect } from 'react';

export function useMediaQuery(query?: string) {
  const defaultQuery = '(max-width: 640px)';
  const finalQuery = query || defaultQuery;

  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(finalQuery).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(finalQuery);
    const listener = () => setMatches(media.matches);

    listener();
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [finalQuery]);

  return matches;
}
