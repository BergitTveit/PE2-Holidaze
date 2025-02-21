import { SearchX, XCircle, CheckCircle, LucideIcon, Loader } from 'lucide-react';

export type FeedbackVariant = 'error' | 'success' | 'empty' | 'loading';

export interface BaseFeedbackProps {
  className?: string;
  title?: string;
  message: string;
}
export interface MessageDisplayProps extends BaseFeedbackProps {
  icon?: LucideIcon;
  variant?: FeedbackVariant;
}

const iconMap: Record<FeedbackVariant, LucideIcon> = {
  error: XCircle,
  success: CheckCircle,
  empty: SearchX,
  loading: Loader,
};

const variantStyles: Record<FeedbackVariant, string> = {
  error: 'text-red-600',
  success: 'text-green-600',
  empty: 'text-gray-400',
  loading: 'text-blue-600',
};

export const MessageDisplay = ({
  title,
  message,
  icon: CustomIcon,
  className = '',
  variant = 'success',
}: MessageDisplayProps) => {
  const Icon = CustomIcon || iconMap[variant];

  return (
    <div className={`text-center p-8 ${className}`} role="status">
      <div className="flex justify-center mb-4">
        <Icon className={`w-12 h-12 ${variantStyles[variant]}`} />
      </div>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>}
      <p className="text-gray-600">{message}</p>
    </div>
  );
};
