import { Button } from './Buttons';
import { X } from 'lucide-react';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <Button variant="round" onClick={onClose}>
           <X className="w-4 h-4"/>
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
