import { ErrorState } from '../../hooks/useApiError';

interface ErrorDisplayProps {
  error: ErrorState;
  className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, className }) => {
  if (!error.messages || error.messages.length === 0) {
    return null;
  }

  return (
    <div
      className={`bg-red-100 border border-red-900 text-red-700 px-4 py-3 rounded relative ${className || ''}`}
      role="alert"
    >
      {error.messages.map((message, index) => (
        <div key={index} className="text-sm">
          {message}
        </div>
      ))}
    </div>
  );
};

