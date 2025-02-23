import { useState } from 'react';
import { BaseVenueCard } from '../shared/BaseVenueCard';
import { IBooking } from '../../../types/booking';
import { IVenue } from '../../../types/venue';
import { User } from 'lucide-react';
import { ImageComponent } from '../../common/Image';
import { BookingTotal } from '../details/BookingTotal';
import { BookedDates } from '../details/BookedDates';

interface BookedVenueCardProps {
  booking: IBooking;
  venue: IVenue;
}

export const BookingManagementCard = ({ booking, venue }: BookedVenueCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { customer } = booking;

  return (
    <BaseVenueCard
      venue={venue}
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
      showExpand={true}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3">
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
          <div className="font-medium text-lg">{customer.name}</div>
        </div>
        <div className="flex-grow">
          <BookedDates booking={{ ...booking, venue }} />
          <BookingTotal booking={{ ...booking, venue }} />
        </div>
      </div>
    </BaseVenueCard>
  );
};
