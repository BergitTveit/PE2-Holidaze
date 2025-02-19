import { Hotel, User } from 'lucide-react';
import { IBooking } from '../../types/booking';
import { IVenue } from '../../types/venue';
import {ImageComponent} from '../common/Image';
import {BookingTotalPrice} from './BookingTotalPrice';
import {BookedNights} from './BookedNights';
import {BookedGuests} from './BookedGuests';
import {BookedDates} from './BookedDates';

interface BookedVenueCardProps {
  booking: IBooking;
  venue: IVenue;
}

export const BookedVenueCard = ({ booking, venue }: BookedVenueCardProps) => {
  const { customer } = booking;

  return (
    <div className="border overflow-hidden shadow-sm">
      <div className="p-4">
        <div className="mb-4">
          <div>
            {venue.media[0]?.url ? (
              <ImageComponent
                src={venue.media[0].url}
                alt={venue.media[0].alt || venue.name}
                className="w-full h-48 object-cover mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center mb-4">
                <Hotel className="w-12 h-12 text-orange-500" />
              </div>
            )}
            <h3 className="font-medium text-lg mb-3">Guest Information</h3>
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex-shrink-0">
                {customer.avatar?.url ? (
                  <ImageComponent
                    src={customer.avatar.url}
                    alt={customer.avatar.alt || `${customer.name}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-600">{customer.name}</p>
                <p className="text-gray-600 text-sm">{customer.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <BookedDates booking={{ ...booking, venue }} />
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="space-y-1">
            <BookedGuests booking={{ ...booking, venue }} />
            <BookedNights booking={booking} />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Booking Total</p>
            <BookingTotalPrice booking={{ ...booking, venue }} />
          </div>
        </div>
      </div>
    </div>
  );
};

