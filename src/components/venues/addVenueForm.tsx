import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { addVenue } from '../../store/slices/venuesSlice';
import { addVenueSchema, CreateVenueDTO } from '../../schemas/addVenue';
import Loader from '../common/Loader';

export const AddVenueForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.venues);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVenueDTO>({
    resolver: zodResolver(addVenueSchema),
  });

  const onSubmit = async (data: CreateVenueDTO) => {
    const result = await dispatch(addVenue(data));
    if (addVenue.fulfilled.match(result)) {
      navigate(`/venue/${result.payload.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="bg-red-100 text-red-700">{error}</div>}

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Venue Name
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="mt-1 block w-full border-gray-300 shadow-sm"
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={4}
          className="mt-1 block w-full border-gray-300 shadow-sm"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">{errors.description.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium">
          Price per night
        </label>
        <input
          {...register('price', { valueAsNumber: true })}
          type="number"
          id="price"
          className="mt-1 block w-full border-gray-300 shadow-sm"
        />
        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
      </div>

      <div>
        <label htmlFor="maxGuests" className="block text-sm font-medium">
          Maximum Guests
        </label>
        <input
          {...register('maxGuests', { valueAsNumber: true })}
          type="number"
          id="maxGuests"
          className="mt-1 block w-full border-gray-300 shadow-sm"
        />
        {errors.maxGuests && (
          <span className="text-red-500 text-sm">{errors.maxGuests.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? <Loader /> : 'Create Venue'}
      </button>
    </form>
  );
};
