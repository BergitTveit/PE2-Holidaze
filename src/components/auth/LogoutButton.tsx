import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useStore';
import Button from '../common/Buttons';
import { logout } from '../../store/slices/authSlice';
import { persistor } from '../../store/store';

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    await persistor.purge();
    navigate('/');
  };
  return (
    <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
      Logout
    </Button>
  );
};

export default LogoutButton;
