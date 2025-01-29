import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { loginUser } from '../../store/slices/authSlice';

import { loginSchema, LoginFormData } from '../../schemas/auth';

import Loader from '../common/Loader';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      navigate(`/profile/${result.payload.name}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="mt-1 block w-full  border-gray-300 shadow-sm"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          className="mt-1 block w-full  border-gray-300 shadow-sm"
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4  hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? <Loader /> : 'Login'}
      </button>
    </form>
  );
};
