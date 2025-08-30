import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that scrolls to top when route changes
 * This ensures that navigation always starts at the first section of each page
 */
export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use instant for immediate scroll, 'smooth' for animated
    });
  }, [pathname]);
}

/**
 * Function to scroll to top manually
 * Useful for buttons that need to ensure top positioning
 */
export const scrollToTop = (behavior: 'smooth' | 'instant' = 'smooth') => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior
  });
};
