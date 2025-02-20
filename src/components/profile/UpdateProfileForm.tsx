import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useGetProfileByNameQuery, useUpdateProfileMutation } from '../../services/profileApi';
import { UpdateProfileFormData, updateProfileSchema } from '../../schemas/updateProfile';
import { Button } from '../common/Buttons';
import { CheckboxInput } from '../common/input/CheckBox';
import { MediaInput } from '../common/input/MediaInput';
import { TextareaInput } from '../common/input/TextareaInput';
import { useApiError } from '../../hooks/useApiError';
import { ErrorDisplay } from '../common/feedback/ErrorDisplay';
import { Loader } from 'lucide-react';
import { MessageDisplay } from '../common/feedback/MessageDisplay';

interface UpdateProfileFormProps {
  onSuccess?: () => void;
}

export const UpdateProfileForm = ({ onSuccess }: UpdateProfileFormProps) => {
  const { username } = useParams();
  const { error, handleError } = useApiError();
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError,
  } = useGetProfileByNameQuery(username!, {
    skip: !username,
  });
  const [updateProfile, { isLoading: isSubmitting }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      bio: '',
      venueManager: false,
      avatar: { url: '', alt: '' },
      banner: { url: '', alt: '' },
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        bio: profile.bio,
        venueManager: profile.venueManager,
        avatar: profile.avatar,
        banner: profile.banner,
      });
    }
  }, [profile, reset]);

  if (isProfileLoading)
    return (
      <div className="p-4 flex justify-center">
        <Loader />
      </div>
    );
  if (isError) {
    return (
      <MessageDisplay title="Error" message="Could not load profile information" variant="error" />
    );
  }
  if (!profile) {
    return (
      <MessageDisplay title="No Data" message="Profile information not available" variant="empty" />
    );
  }

  const onSubmit = async (data: UpdateProfileFormData) => {
    if (!username) return;

    try {
      await updateProfile({ name: username, data }).unwrap();
      onSuccess?.();
    } catch (err) {
      handleError(err as FetchBaseQueryError | SerializedError);
    }
  };

  return (
    <div className="max-h-screen overflow-y-auto p-4">
      <div className="space-y-3" role="form" aria-label="Update profile form">
        <h2 className="text-xl font-medium" id="profile-form-title">
          Update Your Profile
        </h2>

        <ErrorDisplay error={error} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <TextareaInput<UpdateProfileFormData>
            label="Bio"
            name="bio"
            register={register}
            error={errors.bio?.message}
            rows={4}
            aria-label="Your biography"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <MediaInput
              label="Avatar"
              value={watch('avatar') || { url: '', alt: '' }}
              onChange={(value) => setValue('avatar', value || { url: '', alt: '' })}
              error={{
                url: errors.avatar?.url?.message,
                alt: errors.avatar?.alt?.message,
              }}
              aria-label="Upload avatar image"
            />

            <MediaInput
              label="Banner"
              value={watch('banner') || { url: '', alt: '' }}
              onChange={(value) => setValue('banner', value || { url: '', alt: '' })}
              error={{
                url: errors.banner?.url?.message,
                alt: errors.banner?.alt?.message,
              }}
              aria-label="Upload banner image"
            />
          </div>
          <CheckboxInput<UpdateProfileFormData>
            label="I want to be a venue manager"
            name="venueManager"
            register={register}
            aria-label="Become a venue manager"
          />

          <div className="flex gap-2" role="group" aria-label="Form actions">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 px-4  hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader aria-hidden="true" />
                  <span>Updating Profile</span>
                </div>
              ) : (
                'Update Profile'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
