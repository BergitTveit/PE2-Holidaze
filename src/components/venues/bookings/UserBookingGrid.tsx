import { Link } from 'react-router-dom';
import { IBooking } from '../../../types/booking';
import { Button } from '../../common/Buttons';
import { MessageDisplay } from '../../common/feedback/MessageDisplay';
import { ProfileVenuesLayout } from '../shared/ProfileVenuesLayout';
import { BookingDisplayCard } from './UserBookingCard';

interface BookingGridProps {
  bookings: IBooking[];
}

export const BookingGrid = ({ bookings }: BookingGridProps) => {
  if (!bookings?.length) {
    return (
      <ProfileVenuesLayout>
        <MessageDisplay
          title="No Bookings"
          message="You haven't made any bookings yet. Start exploring venues to make your first booking!"
          variant="noData"
        />
        <div className="flex justify-center -mt-4">
          <Link to="/venues">
            <Button variant="primary">Explore Venues</Button>
          </Link>
        </div>
      </ProfileVenuesLayout>
    );
  }
  return (
    <ProfileVenuesLayout>
      {bookings.map((booking) => (
        <BookingDisplayCard key={booking.id} booking={booking} />
      ))}
      <div className="flex justify-center -mt-4">
        <Link to="/venues">
          <Button variant="primary">Explore More Venues</Button>
        </Link>
      </div>
    </ProfileVenuesLayout>
  );
};
