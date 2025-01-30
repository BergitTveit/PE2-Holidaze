import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

interface Props {
  requireManager?: boolean;
}

export const ProtectedRoutes = ({ requireManager = false }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireManager && !user.venueManager) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
