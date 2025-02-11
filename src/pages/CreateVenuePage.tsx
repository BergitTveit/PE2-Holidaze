import { AddVenueForm } from '../components/venues/addVenueForm';
const CreateVenuePage = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Venue</h1>
      <AddVenueForm />
    </div>
  );
};

export default CreateVenuePage;
