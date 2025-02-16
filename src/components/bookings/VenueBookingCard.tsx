import { Hotel } from 'lucide-react';
import { IBooking } from '../../types/booking';
import { IVenue } from '../../types/venue';
import ImageComponent from '../common/Image';

interface VenueBookingCardProps {
  booking: IBooking; // with customer property
  venue: IVenue;
}

const VenueBookingCard = ({ booking, venue }: VenueBookingCardProps) => {
  const { customer, dateFrom, dateTo, guests } = booking;

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-lg">Guest Information</h3>
            <div className="text-gray-600">
              {venue.media[0]?.url ? (
                <ImageComponent
                  src={venue.media[0].url}
                  alt={venue.media[0].alt || venue.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <Hotel className="w-12 h-12 text-orange-500" />
                </div>
              )}
              <p>{customer.name}</p>
              <p>{customer.email}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Check-in</p>
            <p className="font-medium">{new Date(dateFrom).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Check-out</p>
            <p className="font-medium">{new Date(dateTo).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="text-sm text-gray-600">
              {guests}
              {guests === 1 ? ' Guest' : ' Guests'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueBookingCard;
