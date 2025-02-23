import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useStore';
import { setToast, clearToast } from '../store/slices/toastSlice';
import { ToastType } from '../components/common/feedback/Toast';

export const useToast = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast.toast);

  const showToast = useCallback(
    (message: string, type: ToastType) => {
      dispatch(setToast({ message, type }));
    },
    [dispatch]
  );

  const hideToast = useCallback(() => {
    dispatch(clearToast());
  }, [dispatch]);

  return {
    toast,
    hideToast,
    showSuccess: (message: string) => showToast(message, 'success'),
    showError: (message: string) => showToast(message, 'error'),
    showInfo: (message: string) => showToast(message, 'info'),
  };
};
