import { Hotel } from 'lucide-react';
import { ImageComponent } from '../../common/Image';
import { IVenue } from '../../../types/venue';

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
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <Hotel className="w-12 h-12 text-orange-500" aria-hidden="true" />
        </div>
      )}
    </div>
  </div>
);
