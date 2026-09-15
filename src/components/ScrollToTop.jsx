import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { PageContext } from '../context/PageContext';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { setPreferences } = useContext(PageContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  useEffect(() => {
    setPreferences({
      includeHeader: true,
      includeAside: true,
      includeFooter: true,
    })
  }, [pathname]);

  return null;
}