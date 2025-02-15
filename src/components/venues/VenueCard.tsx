import { Link } from 'react-router-dom';
import { Hotel, Pencil, Trash2 } from 'lucide-react';
import { IVenue } from '../../types/venue';

import ImageComponent from '../common/Image';
import VenueTitle from './VenueTitle';
import VenuePrice from './VenuePrice';
import VenueMaxGuests from './VenueMaxGuests';
import VenueMeta from './VenueMeta';
import VenueRating from './VenueRating';
import Button from '../common/Buttons';
import Modal from '../common/Modal';
import { useState } from 'react';
import { useDeleteVenueMutation } from '../../services/venuesApi';

interface VenueCardProps {
  venue: IVenue;
  isOwner: boolean;
}

const VenueCard = ({ venue, isOwner }: VenueCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Add this
  const [deleteVenue, { isLoading }] = useDeleteVenueMutation();

  const handleDelete = async () => {
    try {
      await deleteVenue(venue.id).unwrap();
      setShowDeleteModal(false);
    } catch (error) {
      // Handle error
    }
  };
  return (
    <div className="relative group bg-whiter shadow-sm hover:shadow-md transition-shadow">
      {isOwner && (
        <div className="absolute top-2 right-2 z-10">
          <Link
            to={`/venues/${venue.id}/edit`}
            state={{ venue }}
            className="p-2 bg-white rounded-full hover:bg-gray-100 shadow-sm flex items-center justify-center"
          >
            <Pencil className="h-4 w-4  text-gray-600" />
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 bg-white rounded-full hover:bg-gray-100 hover:text-red-600 shadow-sm flex items-center justify-center"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      <Link to={`/venue/${venue.id}`} className="block">
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9  overflow-hidden">
            {venue.media[0]?.url ? (
              <ImageComponent
                src={venue.media[0].url}
                alt={venue.media[0].alt || venue.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <Hotel className="w-12 h-12 text-orange-500" />
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <VenueTitle title={venue.name} className="text-lg mb-2" />
          <VenuePrice price={venue.price} />
          <VenueMaxGuests maxGuests={venue.maxGuests} />
          <VenueMeta meta={venue.meta} />
          <VenueRating rating={venue.rating} />
        </div>
      </Link>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Venue"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete "{venue.name}"? This action cannot be undone.</p>

          <div className="flex justify-end gap-3">
            <Button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700"
            >
              {isLoading ? 'Deleting...' : 'Delete Venue'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VenueCard;
