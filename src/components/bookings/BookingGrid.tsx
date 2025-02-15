import { IBooking } from '../../types/booking';
import BookingCard from './BookingCard';

interface BookingGridProps {
  bookings: IBooking[];
  isOwner: boolean;
}

const BookingGrid = ({ bookings, isOwner }: BookingGridProps) => {
  if (!bookings?.length) {
    return <div>No bookings available</div>;
  }

  return (
    <div
      className="grid grid-cols-3
     md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} isOwner={isOwner} />
      ))}
    </div>
  );
};

export default BookingGrid;
