import { useAppSelector } from '../../hooks/useStore';
import { IProfile } from '../../types/profile';
import { ProfileInfo } from './ProfileInfo';
import { LogoutButton } from '../auth/LogoutButton';


interface ProfileProps {
  profile: IProfile;
  onEditClick: () => void;
}


export const Profile = ({ profile, onEditClick }: ProfileProps) => {
  const { userName } = useAppSelector((state) => state.auth);
  const isOwnProfile = userName === profile.name;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <div className="bg-white shadow p-6 relative">
        <ProfileInfo
          profile={profile}
          isVenueManager={profile.venueManager}
          onEditClick={isOwnProfile ? onEditClick : undefined}
        />
        {isOwnProfile && (
          <div className="px-4 py-4 border-t border-gray-200 mt-4">
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
};
