import { useEffect, useState } from 'react';

const useDoubleBackExit = () => {
  const [lastBackPress, setLastBackPress] = useState(0);

  useEffect(() => {
    const handlePopState = (event) => {
      const now = Date.now();
      if (now - lastBackPress < 2000) {
        // Exit is allowed, we don't prevent it.
        return;
      }

      // First back-press: intercept and show toast.
      event.preventDefault();
      window.history.pushState(null, '', window.location.href);
      setLastBackPress(now);

      // Create and show custom toast
      const toast = document.createElement('div');
      toast.innerText = 'Pressione voltar novamente para sair';
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.background = '#0B1A30';
      toast.style.border = '1px solid #D4AF37';
      toast.style.color = '#D4AF37';
      toast.style.padding = '10px 20px';
      toast.style.borderRadius = '20px';
      toast.style.fontSize = '14px';
      toast.style.zIndex = '100000';
      toast.style.transition = 'opacity 0.5s ease-out';
      toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
      toast.style.fontFamily = 'serif';
      toast.style.letterSpacing = '1px';
      toast.style.textTransform = 'uppercase';

      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 500);
      }, 2000);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [lastBackPress]);
};

export default useDoubleBackExit;
