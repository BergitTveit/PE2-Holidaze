import { Link } from 'react-router-dom';
import { IVenue } from '../../types/venue';
import {VenueGrid} from './VenueGrid';

interface VenueManagementSectionProps {
  venues: IVenue[];
  showOwnerActions: boolean;
}

export const VenueManagementSection = ({ venues, showOwnerActions }: VenueManagementSectionProps) => {
  return (
    <section className="mt-8 p-4 border-t border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Venue Management</h2>
        <Link
          to="/venues/create"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          Create New Venue
        </Link>
      </div>
      <VenueGrid venues={venues} showOwnerActions={showOwnerActions} />
    </section>
  );
};
