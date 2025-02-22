import { useAppSelector } from '../../hooks/useStore';
import { IProfile } from '../../types/profile';
import { ProfileInfo } from './ProfileInfo';
import { Button } from '../common/Buttons';
import { LogoutButton } from '../auth/LogoutButton';
import { Pencil } from 'lucide-react';

interface ProfileProps {
  profile: IProfile;
  onEditClick: () => void;
}

export const Profile = ({ profile, onEditClick }: ProfileProps) => {
  const { userName } = useAppSelector((state) => state.auth);
  const isOwnProfile = userName === profile.name;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <div className="bg-white shadow overflow-hidden">
        {isOwnProfile && (
          <Button
            onClick={onEditClick}
            className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-100 shadow-sm flex items-center justify-center"
            aria-label="Edit profile"
          >
            <Pencil className="h-4 w-4 text-gray-600" />
          </Button>
        )}
        <ProfileInfo profile={profile} />
        {profile.venueManager && (
          <div className="mt-4 p-2 bg-blue-50 text-blue-700 ">Venue Manager Account</div>
        )}
        {isOwnProfile && (
          <div className="px-4 py-4 border-t border-gray-200">
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
};
