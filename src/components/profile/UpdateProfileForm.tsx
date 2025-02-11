import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useGetProfileByNameQuery, useUpdateProfileMutation } from '../../services/profileApi';
import { UpdateProfileFormData, updateProfileSchema } from '../../schemas/updateProfile';
import { useApiError } from '../../hooks/useApiError';
import Button from '../common/Buttons';
import CheckboxInput from '../common/CheckBox';
import Loader from '../common/Loader';
import MediaInput from '../common/MediaInput';
import TextareaInput from '../common/TextareaInput';

interface UpdateProfileFormProps {
  onSuccess?: () => void;
}

export const UpdateProfileForm = ({ onSuccess }: UpdateProfileFormProps) => {
  const { username } = useParams();
  const { error, handleError, clearError } = useApiError();
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

  if (isProfileLoading || isSubmitting) return <Loader />;
  if (isError) return <div>Error loading profile</div>;
  if (!profile) return null;

  const onSubmit = async (data: UpdateProfileFormData) => {
    if (!username) return;
    clearError();
    try {
      await updateProfile({ name: username, data }).unwrap();
      onSuccess?.();
    } catch (err) {
      handleError(err as FetchBaseQueryError | SerializedError, 'Profile Update');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error.message && (
        <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded-md">
          {error.message}
        </div>
      )}

      <TextareaInput<UpdateProfileFormData>
        label="Bio"
        name="bio"
        register={register}
        error={errors.bio?.message}
        rows={4}
      />

      <MediaInput
        label="Avatar"
        value={watch('avatar') || { url: '', alt: '' }}
        onChange={(value) => setValue('avatar', value || { url: '', alt: '' })}
        error={{
          url: errors.avatar?.url?.message,
          alt: errors.avatar?.alt?.message,
        }}
      />

      <MediaInput
        label="Banner"
        value={watch('banner') || { url: '', alt: '' }}
        onChange={(value) => setValue('banner', value || { url: '', alt: '' })}
        error={{
          url: errors.banner?.url?.message,
          alt: errors.banner?.alt?.message,
        }}
      />

      <CheckboxInput<UpdateProfileFormData>
        label="I want to be a venue manager"
        name="venueManager"
        register={register}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isSubmitting ? <Loader /> : 'Update Profile'}
      </Button>
    </form>
  );
};
