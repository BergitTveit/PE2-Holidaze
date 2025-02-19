import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useStore';
import {Button} from '../common/Buttons';
import { logout } from '../../store/slices/authSlice';
import { persistor } from '../../store/store';
import { useState } from 'react';
import {Modal} from '../common/Modal';

export const LogoutButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsOpen(false);
    dispatch(logout());
    await persistor.purge();
    navigate('/');
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-red-500 hover:bg-red-600 text-white">
        Logout
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Logout">
        <div className="space-y-4">
          <p>Are you sure you want to logout?</p>
          <div className="flex justify-end space-x-2">
            <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
              Confirm Logout
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
