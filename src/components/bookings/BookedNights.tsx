import { IBooking } from '../../types/booking';
import { calculateNights } from '../../utils/calculateNights';

interface BookingNightsProps {
  booking: Pick<IBooking, 'dateFrom' | 'dateTo'>;
}

export const BookedNights = ({ booking }: BookingNightsProps) => {
  const { dateFrom, dateTo } = booking;

  const nights = calculateNights(dateFrom, dateTo);

  return (
    <p className="text-sm text-gray-600">
      {nights} {nights === 1 ? 'Night' : 'Nights'}
    </p>
  );
};
