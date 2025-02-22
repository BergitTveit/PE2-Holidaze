import { useEffect } from 'react';
import { BaseFeedbackProps } from './MessageDisplay';
import { XCircle, CheckCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps extends BaseFeedbackProps {
  type: ToastType;
  onClose: () => void;
}

const iconMap: Record<ToastType, typeof XCircle> = {
  error: XCircle,
  success: CheckCircle,
  info: Info,
};

const typeStyles: Record<ToastType, string> = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const Icon = iconMap[type];

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50" // Full screen overlay
      style={{ zIndex: 100000 }}
      role="alert"
    >
      <div className={`px-6 py-3 rounded shadow-lg flex items-center gap-2 ${typeStyles[type]}`}>
        <Icon className="w-5 h-5" />
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 hover:opacity-80" aria-label="Close notification">
          ×
        </button>
      </div>
    </div>
  );
};
