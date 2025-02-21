import {ImageComponent} from '../common/Image';

export const ProfileHeader = ({ profile }: { profile: any }) => {
  return (
    <>
      {profile.banner && (
        <ImageComponent
          src={profile.banner.url}
          alt={profile.banner.alt}
          className="w-full h-48"
          width="100%"
          height="192px"
        />
      )}
    </>
  );
};
