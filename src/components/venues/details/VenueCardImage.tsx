import { ImageComponent } from '../../common/Image';
import { IVenue } from '../../../types/venue';
import { PlaceholderRoomImage } from '../../common/PlaceholderRoomImage';

export const VenueCardImage = ({
  media,
  venueName,
}: {
  media: IVenue['media'];
  venueName: string;
}) => (
  <div className="relative">
    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
      {media[0]?.url ? (
        <ImageComponent
          src={media[0].url}
          alt={media[0].alt || `Primary image of ${venueName}`}
          className="w-full h-52 object-cover"
        />
      ) : (
        <PlaceholderRoomImage
          imagePath="/src/assets/placeholder.jpg"
          altText={`Placeholder image for ${venueName}`}
        />
      )}
    </div>
  </div>
);
