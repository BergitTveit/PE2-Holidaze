import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from './useStore';
import logoutThunk from '../store/slices/logoutThunk';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return handleLogout;
};
