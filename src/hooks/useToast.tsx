import { useState, useCallback, useEffect } from 'react';
import { ToastType } from '../components/common/feedback/Toast';
interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  console.log('Toast state:', toast);

  const showToast = useCallback((message: string, type: ToastType) => {
    console.log('Setting toast state:', { message, type });
    setToast({ id: Date.now().toString(), message, type });
  }, []);
    const hideToast = useCallback(() => {
      console.log('Hiding toast');
    setToast(null);
  }, []);

  useEffect(() => {
    console.log('Toast state changed:', toast);
  }, [toast]);


  return {
    toast,
    hideToast,
    showSuccess: (message: string) => showToast(message, 'success'),
    showError: (message: string) => showToast(message, 'error'),
    showInfo: (message: string) => showToast(message, 'info'),
  };
};
