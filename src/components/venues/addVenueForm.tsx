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
    defaultValues: {
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      media: [{ url: '', alt: '' }],
      location: {
        address: '',
        city: '',
        zip: '',
        country: '',
      },
    },
  });

  const onSubmit = async (data: CreateVenueDTO) => {
    const result = await dispatch(addVenue(data));
    if (addVenue.fulfilled.match(result)) {
      navigate(`/venue/${result.payload.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}

      {/* Basic Info: name and descirption */}
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Venue Name
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
          )}
        </div>
      </div>

      {/* Pricing & Capacity */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price per night
          </label>
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            id="price"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
          {errors.maxGuests && (
            <span className="text-red-500 text-sm">{errors.maxGuests.message}</span>
          )}
        </div>
      </div>

      {/* image*/}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Images</h3>
        {/* Here you might want to add a dynamic image field array using useFieldArray from react-hook-form */}
        <div>
          <label htmlFor="media.0.url" className="block text-sm font-medium">
            Image URL
          </label>
          <input
            {...register('media.0.url')}
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
          {errors.media?.[0]?.url && (
            <span className="text-red-500 text-sm">{errors.media[0].url.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="media.0.alt" className="block text-sm font-medium">
            Image Alt Text
          </label>
          <input
            {...register('media.0.alt')}
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
          {errors.media?.[0]?.alt && (
            <span className="text-red-500 text-sm">{errors.media[0].alt.message}</span>
          )}
        </div>
      </div>

      {/* wifi, pets etc section */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Amenities</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              {...register('meta.wifi')}
              type="checkbox"
              id="wifi"
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label htmlFor="wifi" className="ml-2 block text-sm">
              WiFi
            </label>
          </div>
          <div className="flex items-center">
            <input
              {...register('meta.parking')}
              type="checkbox"
              id="parking"
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label htmlFor="parking" className="ml-2 block text-sm">
              Parking
            </label>
          </div>
          <div className="flex items-center">
            <input
              {...register('meta.breakfast')}
              type="checkbox"
              id="breakfast"
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label htmlFor="breakfast" className="ml-2 block text-sm">
              Breakfast
            </label>
          </div>
          <div className="flex items-center">
            <input
              {...register('meta.pets')}
              type="checkbox"
              id="pets"
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label htmlFor="pets" className="ml-2 block text-sm">
              Pets Allowed
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Location</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="location.address" className="block text-sm font-medium">
              Address
            </label>
            <input
              {...register('location.address')}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
            {errors.location?.address && (
              <span className="text-red-500 text-sm">{errors.location.address.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="location.city" className="block text-sm font-medium">
              City
            </label>
            <input
              {...register('location.city')}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
            {errors.location?.city && (
              <span className="text-red-500 text-sm">{errors.location.city.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="location.zip" className="block text-sm font-medium">
              Zip Code
            </label>
            <input
              {...register('location.zip')}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
            {errors.location?.zip && (
              <span className="text-red-500 text-sm">{errors.location.zip.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="location.country" className="block text-sm font-medium">
              Country
            </label>
            <input
              {...register('location.country')}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
            {errors.location?.country && (
              <span className="text-red-500 text-sm">{errors.location.country.message}</span>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? <Loader /> : 'Create Venue'}
      </button>
    </form>
  );
};
