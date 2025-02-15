// components/venues/DeleteVenueButton.tsx
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useDeleteVenueMutation } from '../../services/venuesApi';
import Modal from '../common/Modal';
import Button from '../common/Buttons';
import Loader from '../common/Loader';

interface DeleteVenueButtonProps {
  venueId: string;
  venueName: string;
}

const DeleteVenueButton = ({ venueId, venueName }: DeleteVenueButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteVenue, { isLoading }] = useDeleteVenueMutation();

  const handleDelete = async () => {
    try {
      await deleteVenue(venueId).unwrap();
      setShowModal(false);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className="p-2 bg-white rounded-full hover:bg-gray-100 hover:text-red-600 shadow-sm flex items-center justify-center"
        aria-label="Delete venue"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Delete Venue">
        <div className="space-y-4">
          <p>Are you sure you want to delete "{venueName}"? This action cannot be undone.</p>

          <div className="flex justify-end gap-3">
            <Button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700"
            >
              {isLoading ? <Loader /> : 'Delete Venue'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteVenueButton;
