import { Calendar } from 'lucide-react';
import { IBooking } from '../../types/booking';
import BookedNights from './BookedNights';

interface DateDisplayProps {
  booking: IBooking;
}

const BookedDates = ({ booking }: DateDisplayProps) => {
  const { dateFrom, dateTo } = booking;

  return (
    <div className="flex items-center">
      <Calendar className="w-5 h-5 mr-2" />
      <div>
        <div>
          <p className="text-sm text-gray-600">Check-in</p>
          <p className="font-medium">{new Date(dateFrom).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Check-out</p>
          <p className="font-medium">{new Date(dateTo).toLocaleDateString()}</p>
        </div>
        <BookedNights booking={booking} />
      </div>
    </div>
  );
};

export default BookedDates;
