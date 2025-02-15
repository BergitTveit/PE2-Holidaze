import { IVenue } from '../../types/venue';
import VenueCard from './VenueCard';

interface VenueGridProps {
  venues: IVenue[];
}

const VenueGrid = ({ venues }: VenueGridProps) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
};
export default VenueGrid;
