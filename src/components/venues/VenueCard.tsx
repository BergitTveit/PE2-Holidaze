import { Link } from 'react-router-dom';
import { Hotel } from 'lucide-react';
import { Venue } from '../../types/venue';

import ImageComponent from '../common/Image';
import VenueTitle from './VenueTitle';
import VenuePrice from './VenuePrice';
import VenueMaxGuests from './VenueMaxGuests';
import VenueMeta from './VenueMeta';
import VenueRating from './VenueRating';

interface VenueCardProps {
  venue: Venue;
}

const VenueCard = ({ venue }: VenueCardProps) => (
  <Link to={`/venue/${venue.id}`} className="block">
    <div>
      {venue.media[0]?.url ? (
        <ImageComponent
          src={venue.media[0].url}
          alt={venue.media[0].alt || venue.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <Hotel className="w-12 h-12 text-orange-500" />
        </div>
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
