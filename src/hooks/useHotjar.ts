import { useEffect } from 'react';

declare global {
  interface Window {
    hj?: ((...args: any[]) => void) & { q?: any[] };
    _hjSettings?: { hjid: number; hjsv: number };
  }
}

const useHotjar = (hjid: number, hjsv: number = 6): void => {
  useEffect(() => {
    if (window.hj) return; // Prevent multiple script injections

    window._hjSettings = { hjid, hjsv };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://static.hotjar.com/c/hotjar-${hjid}.js?sv=${hjsv}`;

    document.head.appendChild(script);
  }, [hjid, hjsv]);
};

export default useHotjar;
