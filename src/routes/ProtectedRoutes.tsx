import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/useStore';
import { Loader } from 'lucide-react';

interface Props {
  requireManager?: boolean;
}

export const ProtectedRoutes = ({ requireManager = false }: Props) => {
  const auth = useAppSelector((state) => state.auth);
  const location = useLocation();
  const token = localStorage.getItem('accessToken');

  if (token && !auth._persist?.rehydrated) {
    return <Loader />;
  }

  if (!auth.user && auth._persist?.rehydrated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireManager && auth.user && !auth.user.venueManager) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
