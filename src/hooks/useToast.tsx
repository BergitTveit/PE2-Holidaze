import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useStore';
import { setToast, clearToast } from '../store/slices/toastSlice';
import { ToastType } from '../components/common/feedback/Toast';

/**
 * Custom hook to manage toast notifications.
 *
 * @returns {Object} An object containing:
 * - `toast` {ToastState} - The current toast message and type.
 * - `hideToast` {() => void} - Function to clear the toast notification.
 * - `showSuccess` {(message: string) => void} - Function to show a success toast.
 */
export const useToast = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast.toast);

  /**
   * Displays a toast message with a specified type.
   *
   * @param {string} message - The message to display.
   * @param {ToastType} type - The type of toast (e.g., 'success', 'error', 'info').
   */
  const showToast = useCallback(
    (message: string, type: ToastType) => {
      dispatch(setToast({ message, type }));
    },
    [dispatch]
  );

  /**
   * Hides the current toast notification.
   */
  const hideToast = useCallback(() => {
    dispatch(clearToast());
  }, [dispatch]);

  return {
    toast,
    hideToast,
    showSuccess: (message: string) => showToast(message, 'success'),
  };
};
