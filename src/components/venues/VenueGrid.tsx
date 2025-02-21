import { IVenue } from '../../types/venue';
import { VenueCard } from './VenueCard';

interface VenueGridProps {
  venues: IVenue[];
  userName?: string;
  showOwnerActions?: boolean;
}

export const VenueGrid = ({ venues, showOwnerActions = false }: VenueGridProps) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} isOwner={showOwnerActions} />
        ))}
      </div>
    </div>
  );
};
