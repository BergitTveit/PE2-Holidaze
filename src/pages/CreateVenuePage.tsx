import { useNavigate, useParams } from 'react-router-dom';
import { AddVenueForm } from '../components/venues/addVenueForm';
import { useGetVenueByIdQuery } from '../services/venuesApi';
import { Loader } from 'lucide-react';

const CreateVenuePage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { data: venue, isLoading } = useGetVenueByIdQuery(id!, {
    skip: !isEditMode,
  });
  const navigate = useNavigate();

  if (isEditMode && isLoading) return <Loader />;
  if (isEditMode && !venue) return <div>Venue not found</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Venue' : 'Create New Venue'}</h1>
      <AddVenueForm
        mode={isEditMode ? 'edit' : 'create'}
        initialData={venue}
        onSuccess={(venue) => navigate(`/venue/${venue.id}`)}
      />
    </div>
  );
};

export default CreateVenuePage;
