import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DeleteVenueButton } from '../DeleteVenueButton';

interface OwnerActionsProps {
  venueId: string;
  venueName: string;
}

export const OwnerActions = ({ venueId, venueName }: OwnerActionsProps) => (
  <div className="absolute top-2 right-2 z-10" role="group" aria-label="Venue management actions">
    <Link
      to={`/venues/${venueId}/edit`}
      state={{ venueId }}
      className="p-2 bg-white rounded-full hover:bg-gray-100 shadow-sm flex items-center justify-center"
      aria-label={`Edit ${venueName}`}
    >
      <Pencil className="h-4 w-4 text-gray-600" aria-hidden="true" />
    </Link>
    <DeleteVenueButton venueId={venueId} venueName={venueName} />
  </div>
);
