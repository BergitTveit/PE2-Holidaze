import { ImageComponent } from '../common/Image';

export const ProfileInfo = ({ profile }: { profile: any }) => {
  return (
    <div className="flex items-center space-x-4">
      {profile.avatar && (
        <ImageComponent
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
  );
};
