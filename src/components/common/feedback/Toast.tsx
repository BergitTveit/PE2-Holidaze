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
  success: 'bg-primary-dark text-white shadow-lg rounded-lg',
  error: 'bg-red-500 text-white shadow-lg rounded-lg',
  info: 'bg-neutral text-white shadow-lg rounded-lg',
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const Icon = iconMap[type];

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
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
