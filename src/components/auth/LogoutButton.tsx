import { useLogout } from '../../hooks/useLogout';
import Button from '../common/Buttons';

const LogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
      Logout
    </Button>
  );
};

export default LogoutButton;
