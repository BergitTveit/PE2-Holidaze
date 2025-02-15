import { IBooking } from '../../types/booking';

import VenueGallery from '../venues/VenueGallery';
import VenueTitle from '../venues/VenueTitle';
import VenueLocation from '../venues/VenueLocation';
import VenueRating from '../venues/VenueRating';
import VenueMeta from '../venues/VenueMeta';
import BookedGuests from './BookedGuests';
import BookedDates from './BookedDates';
import BookingTotalPrice from './BookingTotalPrice';

interface BookingCardProps {
  booking: IBooking;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const { venue } = booking;

  return (
    <div className="border overflow-hidden">
      <VenueGallery images={venue.media} />

      <div className="p-4">
        <div className="mb-4 border-b pb-4">
          <div className="flex items-center justify-between mb-2">
            <VenueTitle title={venue.name} as="h3" className="text-xl" />
            <VenueRating rating={venue.rating} />
          </div>
          <VenueLocation venueLocation={venue.location} />
        </div>

        <div className="flex justify-between items-center  space-y-3 mb-4">
          <BookedDates booking={booking} />
          <BookedGuests booking={booking} />
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <BookingTotalPrice booking={booking} />
          <VenueMeta meta={venue.meta} />
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
