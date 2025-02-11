import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/useStore';
import { Loader } from 'lucide-react';
import { useGetProfileByNameQuery } from '../services/profileApi';

interface Props {
  requireManager?: boolean;
}

export const ProtectedRoutes = ({ requireManager = false }: Props) => {
  const location = useLocation();
  const { userName, accessToken, _persist } = useAppSelector((state) => state.auth);

  const { data: profile, isLoading } = useGetProfileByNameQuery(userName ?? '', {
    skip: !requireManager || !accessToken || !userName || !_persist?.rehydrated,
  });

  if (!_persist?.rehydrated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!accessToken || !userName) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireManager) {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin" />
        </div>
      );
    }

    if (!profile?.venueManager) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};
