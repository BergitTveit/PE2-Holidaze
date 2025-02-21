import { useAppSelector } from '../../hooks/useStore';
import { useGetProfileByNameQuery } from '../../services/profileApi';
import { Loader } from 'lucide-react';
import { useApiError } from '../../hooks/useApiError';
import { ErrorDisplay } from '../common/feedback/ErrorDisplay';

interface Props {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: Props) => {
  const { userName, accessToken, _persist } = useAppSelector((state) => state.auth);
  const { error, handleError } = useApiError();

  const { isLoading, error: profileError } = useGetProfileByNameQuery(userName ?? '', {
    skip: !accessToken || !userName || !_persist?.rehydrated,
  });

  if (profileError) {
    handleError(profileError);
  }

  if (!_persist?.rehydrated || (accessToken && isLoading)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <ErrorDisplay error={error} />
      {children}
    </>
  );
};
