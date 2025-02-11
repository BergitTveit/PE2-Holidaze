import { useAppSelector } from '../../hooks/useStore';
import { useGetProfileByNameQuery } from '../../services/profileApi';
import { Loader } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: Props) => {
  const { userName, accessToken, _persist } = useAppSelector((state) => state.auth);

  const { isLoading } = useGetProfileByNameQuery(userName ?? '', {
    skip: !accessToken || !userName || !_persist?.rehydrated,
  });

  if (!_persist?.rehydrated || (accessToken && isLoading)) {
    return <Loader className="animate-spin" />;
  }

  return <>{children}</>;
};
