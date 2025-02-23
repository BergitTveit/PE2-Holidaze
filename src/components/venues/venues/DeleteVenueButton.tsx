import { useState } from 'react';
import { Loader, Trash2 } from 'lucide-react';
import { useDeleteVenueMutation } from '../../../services/venuesApi';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Buttons';
import { useApiError } from '../../../hooks/useApiError';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ErrorDisplay } from '../../common/feedback/ErrorDisplay';

interface DeleteVenueButtonProps {
  venueId: string;
  venueName: string;
}

export const DeleteVenueButton = ({ venueId, venueName }: DeleteVenueButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteVenue, { isLoading }] = useDeleteVenueMutation();
  const { error, handleError } = useApiError();

  const handleDelete = async () => {
    try {
      await deleteVenue(venueId).unwrap();
      setShowModal(false);
    } catch (err) {
      handleError(err as FetchBaseQueryError | SerializedError);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setShowModal(true)}
        aria-label={`Delete venue ${venueName}`}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={`Delete ${venueName}`}>
        <div className="space-y-4">
          <ErrorDisplay error={error} />
          <p>Are you sure you want to delete "{venueName}"? This action cannot be undone.</p>

          <div className="flex justify-end gap-3" role="group" aria-label="Confirmation actions">
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
              aria-label="Cancel deletion"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleDelete}
              disabled={isLoading}
              aria-label="Confirm deletion"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader aria-hidden="true" />
                  <span>Deleting...</span>
                </div>
              ) : (
                'Delete Venue'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
