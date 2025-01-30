import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { updateProfile } from '../../store/slices/profileSlice';
import { UpdateProfileFormData, updateProfileSchema } from '../../schemas/updateProfile';
import Loader from '../common/Loader';

interface UpdateProfileFormProps {
  onSuccess?: () => void;
}

export const UpdateProfileForm = ({ onSuccess }: UpdateProfileFormProps) => {
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors },

    watch,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      bio: profile?.bio || '',
      venueManager: profile?.venueManager || false,
      avatar: profile?.avatar,
      banner: profile?.banner,
    },
  });

  const avatarUrl = watch('avatar.url');
  const bannerUrl = watch('banner.url');

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      await dispatch(
        updateProfile({
          name: profile?.name || '',
          data,
        })
      ).unwrap();
      onSuccess?.();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea {...register('bio')} className="w-full p-2 border rounded-md" rows={4} />
        {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Avatar</label>
        <div className="flex items-center space-x-4">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Avatar preview"
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <input
            type="url"
            placeholder="Avatar URL"
            {...register('avatar.url')}
            className="flex-1 p-2 border rounded-md"
          />

          {errors.avatar?.url && (
            <p className="text-red-500 text-sm mt-1">{errors.avatar.url.message}</p>
          )}
        </div>
        <input
          type="text"
          placeholder="Avatar alt text"
          {...register('avatar.alt')}
          className="mt-2 w-full p-2 border rounded-md"
        />
        {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Banner</label>
        <div className="space-y-2">
          {bannerUrl && (
            <img
              src={bannerUrl}
              alt="Banner preview"
              className="w-full h-32 object-cover rounded-md"
            />
          )}
          <input
            type="url"
            placeholder="Banner URL"
            {...register('banner.url')}
            className="w-full p-2 border rounded-md"
          />
          {errors.banner?.url && (
            <p className="text-red-500 text-sm mt-1">{errors.banner.url.message}</p>
          )}

          <input
            type="text"
            placeholder="Banner alt text"
            {...register('banner.alt')}
            className="w-full p-2 border rounded-md"
          />
        </div>
        {errors.banner && <p className="text-red-500 text-sm mt-1">{errors.banner.message}</p>}
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('venueManager')}
            className="rounded border-gray-300"
          />
          <span className="text-sm font-medium">I want to be a venue manager</span>
        </label>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isLoading ? <Loader /> : 'Update Profile'}
      </button>
    </form>
  );
};
