import { Link } from 'react-router-dom';
import { Hotel, Pencil } from 'lucide-react';
import { IVenue } from '../../types/venue';

import ImageComponent from '../common/Image';
import VenueTitle from './VenueTitle';
import VenuePrice from './VenuePrice';
import VenueMaxGuests from './VenueMaxGuests';
import VenueMeta from './VenueMeta';
import VenueRating from './VenueRating';

import DeleteVenueButton from './DeleteVenueButton';

interface VenueCardProps {
  venue: IVenue;
  isOwner: boolean;
}

const VenueCard = ({ venue, isOwner }: VenueCardProps) => {
  return (
    <div
      className="relative group bg-whiter shadow-sm hover:shadow-md transition-shadow"
      role="article"
      aria-label={`Venue: ${venue.name}`}
    >
      {isOwner && (
        <div
          className="absolute top-2 right-2 z-10"
          role="group"
          aria-label="Venue management actions"
        >
          <Link
            to={`/venues/${venue.id}/edit`}
            state={{ venue }}
            className="p-2 bg-white rounded-full hover:bg-gray-100 shadow-sm flex items-center justify-center"
            aria-label={`Edit ${venue.name}`}
          >
            <Pencil className="h-4 w-4 text-gray-600" aria-hidden="true" />
          </Link>
          <DeleteVenueButton venueId={venue.id} venueName={venue.name} />
        </div>
      )}

      <Link
        to={`/venue/${venue.id}`}
        className="block"
        aria-label={`View details of ${venue.name}`}
      >
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9  overflow-hidden">
            {venue.media[0]?.url ? (
              <ImageComponent
                src={venue.media[0].url}
                alt={venue.media[0].alt || `Primary image of ${venue.name}`}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <Hotel className="w-12 h-12 text-orange-500" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <VenueTitle title={venue.name} className="text-lg mb-2" />
          <VenuePrice price={venue.price} />
          <VenueMaxGuests maxGuests={venue.maxGuests} />
          <VenueMeta meta={venue.meta} />
          <VenueRating rating={venue.rating} />
        </div>
      </Link>
    </div>
  );
};

export default VenueCard;
