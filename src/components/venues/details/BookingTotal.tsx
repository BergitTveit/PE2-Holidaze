import { IBooking } from '../../../types/booking';
import { calculateNights } from '../../../utils/calculateNights';

interface PriceTotalProps {
  booking: Pick<IBooking, 'dateFrom' | 'dateTo' | 'venue'>;
}

export const BookingTotal = ({ booking }: PriceTotalProps) => {
  const { dateFrom, dateTo, venue } = booking;
  const nights = calculateNights(dateFrom, dateTo);
  const totalPrice = venue.price * nights;
  return (
    <div>
      <p className="text-sm">Total: ${totalPrice}</p>
    </div>
  );
};
