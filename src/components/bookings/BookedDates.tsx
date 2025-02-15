import { Calendar } from 'lucide-react';
import { IBooking } from '../../types/booking';

// DateDisplay Component
interface DateDisplayProps {
  booking: IBooking;
}

const BookedDates = ({ booking }: DateDisplayProps) => {
  const { dateFrom, dateTo } = booking;

  const nights = Math.ceil(
    (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="flex items-center">
      <Calendar className="w-5 h-5 mr-2" />
      <div>
        <p className="font-medium">
          {new Date(dateFrom).toLocaleDateString()} - {new Date(dateTo).toLocaleDateString()}
        </p>
        <p className="text-sm">
          {nights} night{nights !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default BookedDates;
