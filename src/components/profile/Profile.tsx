import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { fetchProfile } from '../../store/slices/profileSlice';

import LogoutButton from '../auth/LogoutButton';
import Loader from '../common/Loader';

const Profile = () => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { profile, isLoading, error } = useAppSelector((state) => state.profile);

  if (!username && user?.name) {
    return <Navigate to={`/profile/${user.name}`} replace />;
  }

  useEffect(() => {
    if (username) {
      dispatch(fetchProfile(username));
    }
  }, [dispatch, username]);

  const isOwnProfile = user?.name === username;

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
        {profile.banner && (
          <img
            src={profile.banner.url}
            alt={profile.banner.alt}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-6">
          <div className="flex items-center space-x-4">
            {profile.avatar && (
              <img
                src={profile.avatar.url}
                alt={profile.avatar.alt}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}

            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-600">{profile.email}</p>
              {profile.bio && <p className="mt-2">{profile.bio}</p>}
            </div>
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

          {profile.venueManager && (
            <div className="mt-4 p-2 bg-blue-50 text-blue-700 rounded">Venue Manager Account</div>
          )}

          {isOwnProfile && (
            <div className="mt-4">
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
