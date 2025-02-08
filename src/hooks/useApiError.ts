import { useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';

interface ApiError {
  message: string;
  [key: string]: unknown;
}

interface ErrorState {
  message: string | null;
}

const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
  if ('data' in error) {
    return (error.data as ApiError).message ?? 'An error occurred';
  }
  if ('message' in error && typeof error.message === 'string') {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const useApiError = () => {
  const [error, setError] = useState<ErrorState>({ message: null });

  const handleError = (error: FetchBaseQueryError | SerializedError, context: string) => {
    const errorMessage = getErrorMessage(error);
    setError({ message: `${context} failed: ${errorMessage}` });
  };

  const clearError = () => setError({ message: null });

  return {
    error,
    handleError,
    clearError,
  };
};
