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

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Amenities</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" {...register('meta.wifi')} className="border-gray-300" />
            <span className="ml-2">WiFi</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" {...register('meta.parking')} className="border-gray-300" />
            <span className="ml-2">Parking</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" {...register('meta.breakfast')} className="border-gray-300" />
            <span className="ml-2">Breakfast</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" {...register('meta.pets')} className="border-gray-300" />
            <span className="ml-2">Pets Allowed</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Location</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <input
              {...register('location.address')}
              type="text"
              id="address"
              className="mt-1 block w-full border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              City
            </label>
            <input
              {...register('location.city')}
              type="text"
              id="city"
              className="mt-1 block w-full border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium">
              Country
            </label>
            <input
              {...register('location.country')}
              type="text"
              id="country"
              className="mt-1 block w-full border-gray-300 shadow-sm"
            />
          </div>
        </div>
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
