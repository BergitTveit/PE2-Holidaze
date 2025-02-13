import { IBooking } from '../../types/booking';
import BookingCard from './BookingCard';

interface BookingGridProps {
  bookings: IBooking[];
}

const BookingGrid = ({ bookings }: BookingGridProps) => {
  if (!bookings?.length) {
    return <div>No bookings available</div>;
  }

  return (
    <div
      className="grid grid-cols-3
     md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingGrid;
