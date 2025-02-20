import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../hooks/useStore';
import { setCredentials } from '../../store/slices/authSlice';
import { useLoginMutation } from '../../services/authApi';
import { LoginCredentials, loginSchema } from '../../schemas/auth';
import { useApiError } from '../../hooks/useApiError';
import { AuthInput } from '../common/input/authInput';
import { Button } from '../common/Buttons';

import { ErrorDisplay } from '../common/feedback/ErrorDisplay';
import { Loader } from 'lucide-react';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { error, handleError, clearError } = useApiError();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginCredentials) => {
    clearError();
    try {
      const loginResult = await login(data).unwrap();
      dispatch(
        setCredentials({
          accessToken: loginResult.accessToken,
          userName: loginResult.name,
        })
      );
      navigate(`/profile/${loginResult.name}`, { replace: true });
    } catch (err) {
      handleError(err as FetchBaseQueryError | SerializedError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ErrorDisplay error={error} />
      <AuthInput
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
      />
      <AuthInput
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? <Loader /> : 'Login'}
      </Button>
    </form>
  );
};
