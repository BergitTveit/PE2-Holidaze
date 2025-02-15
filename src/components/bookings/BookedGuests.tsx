import { Users } from 'lucide-react';
import { IBooking } from '../../types/booking';

interface GuestDisplayProps {
  booking: IBooking;
}

const BookedGuests = ({ booking }: GuestDisplayProps) => (
  <div className="flex items-center">
    <Users className="w-5 h-5 mr-2" />
    <div>
      <p className="font-medium">
        {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
      </p>
      <p className="text-sm">
        Max {booking.venue.maxGuests} guest{booking.venue.maxGuests !== 1 ? 's' : ''} allowed
      </p>
    </div>
  </div>
);

export default BookedGuests;
