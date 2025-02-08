import { useAppSelector } from '../../hooks/useStore';
import { IProfile } from '../../types/profile';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import Button from '../common/Buttons';
import LogoutButton from '../auth/LogoutButton';

interface ProfileProps {
  profile: IProfile;
  onEditClick: () => void;
}
const Profile = ({ profile, onEditClick }: ProfileProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const isOwnProfile = user?.name === profile.name;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow overflow-hidden">
        <ProfileHeader profile={profile} />
        <ProfileInfo profile={profile} />
        {profile.venueManager && (
          <div className="mt-4 p-2 bg-blue-50 text-blue-700 ">Venue Manager Account</div>
        )}{' '}
        {isOwnProfile && (
          <div className="mt-4">
            <Button onClick={onEditClick} className="w-full bg-blue-500 text-white py-2 ">
              {' '}
              Edit Profile
            </Button>
            <LogoutButton />
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 ">
          <p className="text-gray-600">Venues</p>
          <p className="text-2xl font-bold">{profile._count?.venues || 0}</p>
        </div>
        <div className="bg-gray-50 p-4 ">
          <p className="text-gray-600">Bookings</p>
          <p className="text-2xl font-bold">{profile._count?.bookings || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
