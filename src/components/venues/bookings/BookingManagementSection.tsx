import { X } from 'lucide-react';
import { IVenue } from '../../../types/venue';
import { BookingManagementCard } from './BookingManagementCard';
import { Button } from '../../common/Buttons';
import { useState } from 'react';
import { BaseVenueCard } from '../shared/BaseVenueCard';
import { ProfileVenuesLayout } from '../shared/ProfileVenuesLayout';
import { MessageDisplay } from '../../common/feedback/MessageDisplay';

interface BookingManagementSectionProps {
  venues: IVenue[];
}

export const BookingManagementSection = ({ venues }: BookingManagementSectionProps) => {
  if (!venues.some((venue) => venue.bookings?.length)) {
    return (
      <MessageDisplay
        title="No Bookings"
        message="Your venues don't have any bookings yet"
        variant="noData"
      />
    );
  }

  return (
    <ProfileVenuesLayout>
      {venues.map((venue) => (
        <ExpandableVenueSection key={venue.id} venue={venue} />
      ))}
    </ProfileVenuesLayout>
  );
};
interface ExpandableVenueBookingsProps {
  venue: IVenue;
}

const ExpandableVenueSection = ({ venue }: ExpandableVenueBookingsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className={isExpanded ? 'hidden' : 'block'}>
        <BaseVenueCard
          venue={venue}
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
          showExpand={true}
        />
      </div>

      <div
        className={`transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <ProfileVenuesLayout
          actionButtons={
            <Button variant="round" onClick={() => setIsExpanded(false)} className="w-12 h-12">
              <X className="w-6 h-6" />
            </Button>
          }
        >
          {venue.bookings?.map((booking) => (
            <BookingManagementCard key={booking.id} booking={booking} venue={venue} />
          ))}
        </ProfileVenuesLayout>
      </div>
    </div>
  );
};
