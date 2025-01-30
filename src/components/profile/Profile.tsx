import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { fetchProfile } from '../../store/slices/profileSlice';

import LogoutButton from '../auth/LogoutButton';
import Button from '../common/Buttons';
import Modal from '../common/Modal';
import Loader from '../common/Loader';
import { UpdateProfileForm } from './UpdateProfileForm';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { profile, isLoading, error } = useAppSelector((state) => state.profile);
  const isOwnProfile = user?.name === username;

  if (!username && user?.name) {
    return <Navigate to={`/profile/${user.name}`} replace />;
  }

  useEffect(() => {
    if (username) {
      dispatch(fetchProfile(username));
    }
  }, [dispatch, username]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow overflow-hidden">
        <ProfileHeader profile={profile} />

        <ProfileInfo profile={profile} />

        {profile.venueManager && (
          <div className="mt-4 p-2 bg-blue-50 text-blue-700 rounded">Venue Manager Account</div>
        )}
        {isOwnProfile && (
          <div className="mt-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            >
              Edit Profile
            </Button>
            <LogoutButton />
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Profile">
          <UpdateProfileForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-gray-600">Venues</p>
          <p className="text-2xl font-bold">{profile._count?.venues || 0}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-gray-600">Bookings</p>
          <p className="text-2xl font-bold">{profile._count?.bookings || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
