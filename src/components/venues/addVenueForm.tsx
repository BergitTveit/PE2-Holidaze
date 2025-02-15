import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateVenueMutation, useUpdateVenueMutation } from '../../services/venuesApi';
import { useApiError } from '../../hooks/useApiError';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Plus, Wifi, Car, Coffee, Dog } from 'lucide-react';
import { addVenueSchema, CreateVenueDTO } from '../../schemas/addVenue';
import Button from '../common/Buttons';
import CheckboxInput from '../common/CheckBox';
import Loader from '../common/Loader';
import MediaInput from '../common/MediaInput';
import NumberInput from '../common/NumberInput';
import TextareaInput from '../common/TextareaInput';
import TextInput from '../common/TextInput';
import { IVenue } from '../../types/venue';

interface VenueFormProps {
  mode: 'create' | 'edit';
  initialData?: IVenue;
  onSuccess?: (venue: IVenue) => void;
}

export const AddVenueForm = ({ mode, initialData, onSuccess }: VenueFormProps) => {
  const navigate = useNavigate();
  const [createVenue, { isLoading: isCreating }] = useCreateVenueMutation();
  const [updateVenue, { isLoading: isUpdating }] = useUpdateVenueMutation();
  const { error, handleError, clearError } = useApiError();

  const isLoading = isCreating || isUpdating;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateVenueDTO>({
    resolver: zodResolver(addVenueSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      maxGuests: initialData?.maxGuests || 1,
      meta: {
        wifi: initialData?.meta.wifi || false,
        parking: initialData?.meta.parking || false,
        breakfast: initialData?.meta.breakfast || false,
        pets: initialData?.meta.pets || false,
      },
      media: initialData?.media || [{ url: '', alt: '' }],
      location: {
        address: initialData?.location.address || '',
        city: initialData?.location.city || '',
        zip: initialData?.location.zip || '',
        country: initialData?.location.country || '',
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'media',
  });

  const onSubmit = async (data: CreateVenueDTO) => {
    clearError();
    try {
      let result;
      if (mode === 'create') {
        result = await createVenue(data).unwrap();
      } else {
        result = await updateVenue({ id: initialData!.id, venue: data }).unwrap();
      }
      if (onSuccess) {
        onSuccess(result);
      } else {
        navigate(`/venue/${result.id}`);
      }
    } catch (err) {
      handleError(
        err as FetchBaseQueryError | SerializedError,
        `${mode === 'create' ? 'Create' : 'Update'} Venue`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error.message && (
        <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-3">
          {error.message}
        </div>
      )}
      <div className="space-y-4">
        <TextInput
          label="Venue Name"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <div>
          <TextareaInput
            label="Description"
            name="description"
            register={register}
            error={errors.description?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Price per night"
          name="price"
          register={register}
          error={errors.price?.message}
        />
        <NumberInput
          label="Maximum Guests"
          name="maxGuests"
          register={register}
          error={errors.maxGuests?.message}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Media</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4">
            <MediaInput
              label={`Image ${index + 1}`}
              value={watch(`media.${index}`)}
              onChange={(media) => {
                media ? setValue(`media.${index}`, media) : remove(index);
              }}
              error={{
                url: errors.media?.[index]?.url?.message,
                alt: errors.media?.[index]?.alt?.message,
              }}
            />
          </div>
        ))}
        <Button type="button" onClick={() => append({ url: '', alt: '' })}>
          <Plus className="h-4 w-4" /> Add Media
        </Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Amenities</h3>
        <div className="grid grid-cols-2 gap-4">
          <CheckboxInput
            label={
              <div className="flex items-center gap-2">
                <Wifi size={16} /> WiFi
              </div>
            }
            name="meta.wifi"
            register={register}
          />
          <CheckboxInput
            label={
              <div className="flex items-center gap-2">
                <Car size={16} /> Parking
              </div>
            }
            name="meta.parking"
            register={register}
          />
          <CheckboxInput
            label={
              <div className="flex items-center gap-2">
                <Coffee size={16} /> Breakfast
              </div>
            }
            name="meta.breakfast"
            register={register}
          />
          <CheckboxInput
            label={
              <div className="flex items-center gap-2">
                <Dog size={16} /> Pets Allowed
              </div>
            }
            name="meta.pets"
            register={register}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Location</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextInput
            label="Address"
            name="location.address"
            register={register}
            error={errors.location?.address?.message}
          />
          <TextInput
            label="City"
            name="location.city"
            register={register}
            error={errors.location?.city?.message}
          />
          <TextInput
            label="Zip Code"
            name="location.zip"
            register={register}
            error={errors.location?.zip?.message}
          />
          <TextInput
            label="Country"
            name="location.country"
            register={register}
            error={errors.location?.country?.message}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? <Loader /> : mode === 'create' ? 'Create Venue' : 'Update Changes'}
      </Button>
    </form>
  );
};
