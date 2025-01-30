import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { loginUser, registerUser } from '../../store/slices/authSlice';

import { registerSchema, RegisterFormData } from '../../schemas/auth';

import { RegisterCredentials, LoginCredentials } from '../../types/auth';

import Loader from '../common/Loader';

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    const registerResult = await dispatch(registerUser(registerData as RegisterCredentials));

    if (registerUser.fulfilled.match(registerResult)) {
      const loginCredentials: LoginCredentials = {
        email: data.email,
        password: data.password,
      };

      const loginResult = await dispatch(loginUser(loginCredentials));
      if (loginUser.fulfilled.match(loginResult)) {
        navigate(`/profile/${loginResult.payload.name}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Username
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="mt-1 block w-full  border-gray-300 shadow-sm"
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>

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

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          id="confirmPassword"
          className="mt-1 block w-full  border-gray-300 shadow-sm"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
        )}
      </div>

      <div className="flex items-center">
        <input
          {...register('venueManager')}
          type="checkbox"
          id="venueManager"
          className=" border-gray-300"
        />
        <label htmlFor="venueManager" className="ml-2 block text-sm">
          Register as Venue Manager
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4  hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? <Loader /> : 'Register'}
      </button>
    </form>
  );
};
