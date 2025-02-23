import { Pencil } from 'lucide-react';
import { Button } from '../common/Buttons';
import { ImageComponent } from '../common/Image';

export const ProfileInfo = ({
  profile,
  isVenueManager,
  onEditClick,
}: {
  profile: any;
  isVenueManager: boolean;
  onEditClick?: () => void;
}) => {
  return (
    <div className="relative">
      <div className="relative">
        <div className="w-24 h-24 relative z-10">
          {profile.avatar ? (
            <ImageComponent
              src={profile.avatar.url}
              alt={profile.avatar.alt}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-neutral-light" />
          )}
        </div>

        <div
          className={`absolute top-12 left-24 right-0 h-px ${isVenueManager ? 'bg-primary' : 'bg-neutral'}`}
        />

        <div
          className={`absolute top-24 left-12 w-px h-32 ${isVenueManager ? 'bg-primary' : 'bg-neutral'}`}
        />

        <div className="absolute top-26 left-4 font-medium origin-left rotate-90 ">
          {isVenueManager ? (
            <div className="text-primary ">
              <div>MANAGER</div>
              <div>&amp; traveller</div>
            </div>
          ) : (
            <div className="text-neutral">Traveller</div>
          )}
        </div>
      </div>

      <div className="absolute top-0 left-28 right-0">
        <h1 className="text-2xl font-bold text-neutral">{profile.name}</h1>
      </div>

      <div className="absolute top-16 left-28 right-0 flex justify-between items-center">
        <p className="text-gray-600">{profile.email}</p>
        {onEditClick && (
          <Button
            onClick={onEditClick}
            variant="round"
            className="text-neutral"
            aria-label="Edit profile"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>

      {profile.bio && (
        <div className="h-40 ml-28">
          <p className="text-neutral">{profile.bio}</p>
        </div>
      )}
    </div>
  );
};
