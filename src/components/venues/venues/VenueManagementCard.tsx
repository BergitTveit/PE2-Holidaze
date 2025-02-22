import { useState } from 'react';
import { BaseVenueCard } from '../shared/BaseVenueCard';
import { DeleteVenueButton } from './DeleteVenueButton';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { IVenue } from '../../../types/venue';
import { VenueDescription } from '../details/VenueDescription';
import { VenuePrice } from '../details/VenuePrice';
import { VenueMaxGuests } from '../details/VenueMaxGuests';

interface VenueManagementCardProps {
  venue: IVenue;
  isOwner: boolean;
}

export const VenueManagementCard = ({ venue, isOwner }: VenueManagementCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <BaseVenueCard
      venue={venue}
      isExpanded={isExpanded}
      onToggle={isOwner ? () => setIsExpanded(!isExpanded) : undefined}
      showExpand={isOwner}
    >
      <div className="flex ">
        <VenueDescription description={venue.description} />
        <VenuePrice price={venue.price} />
        <VenueMaxGuests maxGuests={venue.maxGuests} />
      </div>
      <div></div>

      {isOwner && (
        <div className="p-4 flex justify-end gap-4">
          <Link
            to={`/venues/${venue.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white shadow-sm hover:bg-primary-dark hover:shadow-md transition-all"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Link>
          <DeleteVenueButton venueId={venue.id} venueName={venue.name} />
        </div>
      )}
    </BaseVenueCard>
  );
};
