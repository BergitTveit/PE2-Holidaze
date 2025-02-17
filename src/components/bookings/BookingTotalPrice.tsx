import { IBooking } from '../../types/booking';
import { calculateNights } from '../../utils/calculateNights';
import VenuePrice from '../venues/VenuePrice';

interface PriceTotalProps {
  booking: Pick<IBooking, 'dateFrom' | 'dateTo' | 'venue'>;
}

const BookingTotalPrice = ({ booking }: PriceTotalProps) => {
  const { dateFrom, dateTo, venue } = booking;
  const nights = calculateNights(dateFrom, dateTo);
  const totalPrice = venue.price * nights;
  return (
    <div>
      <VenuePrice price={venue.price} />
      <p className="text-sm">Total: ${totalPrice}</p>
    </div>
  );
};

export default BookingTotalPrice;
