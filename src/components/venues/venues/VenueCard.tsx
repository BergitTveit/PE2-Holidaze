import { Link } from 'react-router-dom';
import { IVenue } from '../../../types/venue';
import { VenueTitle } from '../details/VenueTitle';
import { VenuePrice } from '../details/VenuePrice';
import { VenueMaxGuests } from '../details/VenueMaxGuests';
import { VenueMeta } from '../details/VenueMeta';
import { OwnerActions } from '../details/OwnerActions';
import { VenueCardImage } from '../details/VenueCardImage';

interface VenueCardProps {
  venue: IVenue;
  isOwner: boolean;
}
export const VenueCard = ({ venue, isOwner }: VenueCardProps) => {
  return (
    <article
      className="flex flex-col bg-white w-full max-w-[300px] shadow-md hover:shadow-lg transition-shadow"
      aria-label={`Venue: ${venue.name}`}
    >
      {isOwner && <OwnerActions venueId={venue.id} venueName={venue.name} />}
      <Link
        to={`/venue/${venue.id}`}
        className="flex flex-col"
        aria-label={`View details of ${venue.name}`}
      >
        <div className="relative">
          <div className="relative border-3 border-primary-dark">
            <VenueCardImage media={venue.media} venueName={venue.name} />
            <div className="absolute top-0 w-full">
              <VenueTitle title={venue.name} className="py-1" />
            </div>
            <div className="absolute bottom-0 right-0">
              <VenueMaxGuests maxGuests={venue.maxGuests} />
            </div>
          </div>

          <div className="flex border-b-3 border-primary-dark">
            <VenueMeta meta={venue.meta} variant="card" />
            <VenuePrice price={venue.price} />
          </div>
        </div>
      </Link>
    </article>
  );
};
