import { useToast } from '../../../hooks/useToast';
import { Toast } from './Toast';

export const ToastContainer = () => {
  const { toast, hideToast } = useToast();

  if (!toast) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100000] animate-fade-in">
      <Toast message={toast.message} type={toast.type} onClose={hideToast} />
    </div>
  );
};
