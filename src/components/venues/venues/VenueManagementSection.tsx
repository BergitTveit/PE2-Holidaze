import { Link } from 'react-router-dom';
import { IVenue } from '../../../types/venue';
import { VenueManagementCard } from './VenueManagementCard';
import { Button } from '../../common/Buttons';
import { ProfileVenuesLayout } from '../shared/ProfileVenuesLayout';
import { MessageDisplay } from '../../common/feedback/MessageDisplay';

interface VenueManagementSectionProps {
  venues: IVenue[];
  showOwnerActions: boolean;
}

export const VenueManagementSection = ({
  venues,
  showOwnerActions,
}: VenueManagementSectionProps) => {
  if (!venues?.length) {
    return (
      <ProfileVenuesLayout>
        <MessageDisplay
          title="No Venues"
          message="You haven't created any venues yet, get started by clicking the button below."
          variant="noData"
          className="pb-0"
        />
        {showOwnerActions && (
          <div className="flex justify-center -mt-8">
            <Link to="/venues/create">
              <Button variant="primary">Explore Venues</Button>
            </Link>
          </div>
        )}
      </ProfileVenuesLayout>
    );
  }

  return (
    <ProfileVenuesLayout
      actionButtons={
        showOwnerActions && (
          <Button variant="primary">
            <Link to="/venues/create">Create New Venue</Link>
          </Button>
        )
      }
    >
      {venues.map((venue) => (
        <VenueManagementCard key={venue.id} venue={venue} isOwner={showOwnerActions} />
      ))}
    </ProfileVenuesLayout>
  );
};
