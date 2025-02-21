import { useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';

interface ApiErrorItem {
  message: string;
  code?: string;
}

interface ApiErrorResponse {
  errors: ApiErrorItem[];
  message?: string;
}

export interface ErrorState {
  messages: string[];
}

const isApiErrorResponse = (data: unknown): data is ApiErrorResponse => {
  const response = data as ApiErrorResponse;
  return !!response && (Array.isArray(response.errors) || typeof response.message === 'string');
};

const getErrorMessages = (error: FetchBaseQueryError | SerializedError): string[] => {
  if ('data' in error) {
    const errorData = error.data;

    if (isApiErrorResponse(errorData)) {
      if (errorData.errors?.length > 0) {
        return errorData.errors.map((err) => err.message);
      }
      if (errorData.message) {
        return [errorData.message];
      }
    }

    if (typeof errorData === 'string') {
      return [errorData];
    }
  }

  if ('message' in error && error.message) {
    return [error.message];
  }

  return ['An unexpected error occurred'];
};

export const useApiError = () => {
  const [error, setError] = useState<ErrorState>({ messages: [] });

  const handleError = (error: FetchBaseQueryError | SerializedError) => {
    const messages = getErrorMessages(error);
    setError({ messages });
  };

  const clearError = () => setError({ messages: [] });

  return {
    error,
    handleError,
    clearError,
  };
};
