import { IBooking } from '../../types/booking';
import VenuePrice from '../venues/VenuePrice';

interface PriceTotalProps {
  booking: Pick<IBooking, 'dateFrom' | 'dateTo' | 'venue'>;
}

const BookingTotalPrice = ({ booking }: PriceTotalProps) => {
  const { dateFrom, dateTo, venue } = booking;
  const nights = Math.ceil(
    (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = venue.price * nights;

  return (
    <div>
      <VenuePrice price={venue.price} />
      <p className="text-sm">Total: ${totalPrice}</p>
    </div>
  );
};

export default BookingTotalPrice;
