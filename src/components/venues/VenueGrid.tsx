import { Venue } from '../../types/venue';
import VenueCard from './VenueCard';

interface VenueGridProps {
  venues: Venue[];
}

const VenueGrid = ({ venues }: VenueGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
};
export default VenueGrid;
