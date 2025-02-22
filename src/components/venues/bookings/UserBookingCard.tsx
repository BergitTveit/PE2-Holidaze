import { IBooking } from '../../../types/booking';
import { VenueMeta } from '../details/VenueMeta';
import { BookedGuests } from '../details/BookedGuests';
import { BookedDates } from '../details/BookedDates';
import { BookingTotal } from '../details/BookingTotal';
import { useState } from 'react';
import { BaseVenueCard } from '../shared/BaseVenueCard';

interface BookingCardProps {
  booking: IBooking;
}

export const BookingDisplayCard = ({ booking }: BookingCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { venue } = booking;

  return (
    <BaseVenueCard
      venue={venue}
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
      showExpand={true}
    >
      <div className="p-4">
        <div className="flex justify-between items-center space-y-3 mb-4">
          <BookedDates booking={booking} />
          <BookedGuests booking={booking} />
        </div>
        <div className="flex justify-between items-center border-t pt-4">
          <BookingTotal booking={booking} />
          <VenueMeta meta={venue.meta} />
        </div>
      </div>
    </BaseVenueCard>
  );
};
