import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/useStore';
import Loader from '../components/common/Loader';

interface Props {
  requireManager?: boolean;
}

export const ProtectedRoutes = ({ requireManager = false }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { profile, isLoading } = useAppSelector((state) => state.profile);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireManager && isLoading) {
    return <Loader />;
  }

  if (requireManager && !profile?.venueManager) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
