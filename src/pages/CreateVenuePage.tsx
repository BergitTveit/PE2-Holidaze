import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetVenueByIdQuery } from '../services/venuesApi';
import { AddVenueForm } from '../components/venues/venues/AddVenueForm';
import { MessageDisplay } from '../components/common/feedback/MessageDisplay';

const CreateVenuePage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const {
    data: venue,
    isLoading,
    error,
  } = useGetVenueByIdQuery(id!, {
    skip: !isEditMode,
  });
  const navigate = useNavigate();

  const getTitle = () => {
    if (isLoading) return 'Loading Venue';
    if (error) return 'Error Loading Venue';
    if (isEditMode && !venue) return 'Venue Not Found';
    return isEditMode ? `Edit ${venue?.name || 'Venue'}` : 'Create New Venue';
  };

  return (
    <>
      <Helmet>
        <title>{getTitle()} - Holidaze</title>
        <meta
          name="description"
          content={
            isEditMode ? `Edit venue details on Holidaze` : 'Create a new venue listing on Holidaze'
          }
        />
      </Helmet>

      <div className="max-w-3xl mx-auto py-8 px-4">
        {isEditMode && isLoading ? (
          <MessageDisplay
            title="Loading venue"
            message="Please wait while we fetch the venue details"
            variant="loading"
          />
        ) : isEditMode && error ? (
          <MessageDisplay
            title="Error occurred"
            message="There was a problem loading the venue"
            variant="error"
          />
        ) : isEditMode && !venue ? (
          <MessageDisplay
            title="Venue not found"
            message="The venue you're trying to edit doesn't exist"
            variant="empty"
          />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">
              {isEditMode ? 'Edit Venue' : 'Create New Venue'}
            </h1>
            <AddVenueForm
              mode={isEditMode ? 'edit' : 'create'}
              initialData={venue}
              onSuccess={(venue) => navigate(`/venue/${venue.id}`)}
            />
          </>
        )}
      </div>
    </>
  );
};

export default CreateVenuePage;
