import { useEffect, useState } from 'react';
import { toast } from 'sonner';

/**
 * Hook to handle double back press to exit on PWA/Mobile
 * History Trap: Intercept the popstate event.
 */
export const useDoubleBackExit = () => {
  const [lastBackPress, setLastBackPress] = useState(0);

  useEffect(() => {
    const handlePopState = (event) => {
      const now = Date.now();
      
      // Prevent default back navigation
      window.history.pushState(null, null, window.location.pathname);

      if (now - lastBackPress < 2000) {
        // Second press within 2 seconds - allow exit (or go back for real)
        window.history.back();
      } else {
        // First press - show toast
        setLastBackPress(now);
        toast('Pressione voltar novamente para sair', {
          style: {
            background: '#0B1A30',
            color: '#D4AF37',
            border: '1px solid #D4AF37',
          },
          duration: 2000,
        });
      }
    };

    // Initial state to enable popstate interception
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [lastBackPress]);
};