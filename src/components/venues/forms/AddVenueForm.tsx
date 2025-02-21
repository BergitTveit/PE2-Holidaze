import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateVenueMutation, useUpdateVenueMutation } from '../../../services/venuesApi';
import { useApiError } from '../../../hooks/useApiError';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Plus, Wifi, Car, Coffee, Dog, Loader } from 'lucide-react';
import { addVenueSchema, CreateVenueDTO } from '../../../schemas/addVenue';
import { Button } from '../../common/Buttons';
import { CheckboxInput } from '../../common/input/CheckBox';
import { MediaInput } from '../../common/input/MediaInput';
import { NumberInput } from '../../common/input/NumberInput';
import { TextareaInput } from '../../common/input/TextareaInput';
import { TextInput } from '../../common/input/TextInput';
import { ErrorDisplay } from '../../common/feedback/ErrorDisplay';
import { IVenue } from '../../../types/venue';

interface VenueFormProps {
  mode: 'create' | 'edit';
  initialData?: IVenue;
  onSuccess?: (venue: IVenue) => void;
}

export const AddVenueForm = ({ mode, initialData, onSuccess }: VenueFormProps) => {
  const navigate = useNavigate();
  const [createVenue, { isLoading: isCreating }] = useCreateVenueMutation();
  const [updateVenue, { isLoading: isUpdating }] = useUpdateVenueMutation();
  const { error, handleError } = useApiError();

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
      handleError(err as FetchBaseQueryError | SerializedError);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      aria-label={`${mode === 'create' ? 'Create new' : 'Edit existing'} venue`}
    >
      <ErrorDisplay error={error} />

      <div className="space-y-4">
        <TextInput
          label="Venue Name"
          name="name"
          register={register}
          error={errors.name?.message}
          aria-label="Venue name"
        />

        <div>
          <TextareaInput
            label="Description"
            name="description"
            register={register}
            error={errors.description?.message}
            aria-label="Venue description"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4" role="group" aria-label="Venue capacity and pricing">
        <NumberInput
          label="Price per night"
          name="price"
          register={register}
          error={errors.price?.message}
          aria-label="Price per night"
        />
        <NumberInput
          label="Maximum Guests"
          name="maxGuests"
          register={register}
          error={errors.maxGuests?.message}
          aria-label="Maximum number of guests"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium" id="media-section">
          Media
        </h3>
        <div role="group" aria-labelledby="media-section" className="space-y-4">
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
                aria-label={`Venue image ${index + 1}`}
                aria-invalid={!!(errors.media?.[index]?.url || errors.media?.[index]?.alt)}
              />
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ url: '', alt: '' })}
            aria-label="Add new image"
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> Add Media
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium" id="amenities-section">
          Amenities
        </h3>
        <div className="grid grid-cols-2 gap-4" role="group" aria-labelledby="amenities-section">
          <CheckboxInput
            label={
              <div className="flex items-center gap-2">
                <Wifi size={16} aria-hidden="true" /> WiFi
              </div>
            }
            name="meta.wifi"
            register={register}
            aria-label="Provide WiFi access for guests"
          />
          <CheckboxInput
            label={
              <div className="flex items-center gap-2">
                <Car size={16} aria-hidden="true" /> Parking
              </div>
            }
            name="meta.parking"
            register={register}
            aria-label="Offer on-site parking for guests"
          />
          <CheckboxInput
            label={
              <div className="flex items-center gap-2">
                <Coffee size={16} aria-hidden="true" /> Breakfast
              </div>
            }
            name="meta.breakfast"
            register={register}
            aria-label="Include breakfast service for guests"
          />
          <CheckboxInput
            label={
              <div className="flex items-center gap-2">
                <Dog size={16} aria-hidden="true" /> Pets Allowed
              </div>
            }
            name="meta.pets"
            register={register}
            aria-label="Allow guests to bring pets"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium" id="location-section">
          Location
        </h3>
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          role="group"
          aria-labelledby="location-section"
        >
          <TextInput
            label="Address"
            name="location.address"
            register={register}
            error={errors.location?.address?.message}
            aria-label="Street address"
          />
          <TextInput
            label="City"
            name="location.city"
            register={register}
            error={errors.location?.city?.message}
            aria-label="City"
          />
          <TextInput
            label="Zip Code"
            name="location.zip"
            register={register}
            error={errors.location?.zip?.message}
            aria-label="Zip code"
          />
          <TextInput
            label="Country"
            name="location.country"
            register={register}
            error={errors.location?.country?.message}
            aria-label="Country"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        aria-busy={isLoading}
        aria-label={`${isLoading ? 'Processing' : mode === 'create' ? 'Create new venue' : 'Save venue changes'}`}
      >
        {isLoading ? <Loader /> : mode === 'create' ? 'Create Venue' : 'Update Changes'}
      </Button>
    </form>
  );
};
