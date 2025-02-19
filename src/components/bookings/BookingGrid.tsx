import { IBooking } from '../../types/booking';
import { BookingDisplayCard } from './BookingDisplayCard';


interface BookingGridProps {
  bookings: IBooking[];
}

export const BookingGrid = ({ bookings }: BookingGridProps) => {
  if (!bookings?.length) {
    return <div>No bookings available</div>;
  }

  return (
    <div
      className="grid grid-cols-3
     md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {bookings.map((booking) => (
        <BookingDisplayCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};
