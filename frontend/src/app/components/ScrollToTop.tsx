import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Ne pas forcer le haut de page s'il y a une ancre à cibler.
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
