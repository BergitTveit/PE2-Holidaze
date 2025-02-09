import { Link } from 'react-router-dom';
import ImageComponent from '../common/Image';
import VenueTitle from './VenueTitle';
import VenuePrice from './VenuePrice';
import VenueMaxGuests from './VenueMaxGuests';
import VenueMeta from './VenueMeta';
import VenueRating from './VenueRating';
import { Venue } from '../../types/venue';

interface VenueCardProps {
  venue: Venue;
}

const VenueCard = ({ venue }: VenueCardProps) => (
  <Link to={`/venue/${venue.id}`} className="block">
    <div>
      {venue.media.length > 0 && (
        <ImageComponent
          src={venue.media[0].url}
          alt={venue.media[0].alt || venue.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div>
        <VenueTitle title={venue.name} className="text-xl" as="h2" />
        <VenuePrice price={venue.price} />
        <VenueMaxGuests maxGuests={venue.maxGuests} />
        <VenueMeta meta={venue.meta} />
        <VenueRating rating={venue.rating} />
      </div>
    </div>
  </Link>
);

export default VenueCard;
