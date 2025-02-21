import { Link } from 'react-router-dom';
import { IVenue } from '../../types/venue';
import { VenueTitle } from './details/VenueTitle';
import { VenuePrice } from './details/VenuePrice';
import { VenueMaxGuests } from './details/VenueMaxGuests';
import { VenueMeta } from './details/VenueMeta';
import { VenueRating } from './details/VenueRating';
import { OwnerActions } from './details/OwnerActions';
import { VenueCardImage } from './details/VenueCardImage';

interface VenueCardProps {
  venue: IVenue;
  isOwner: boolean;
}

export const VenueCard = ({ venue, isOwner }: VenueCardProps) => {
  return (
    <div
      className="relative group bg-whiter shadow-sm hover:shadow-md transition-shadow"
      role="article"
      aria-label={`Venue: ${venue.name}`}
    >
      {isOwner && <OwnerActions venueId={venue.id} venueName={venue.name} />}
      <Link
        to={`/venue/${venue.id}`}
        className="block"
        aria-label={`View details of ${venue.name}`}
      >
        <VenueCardImage media={venue.media} venueName={venue.name} />
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
