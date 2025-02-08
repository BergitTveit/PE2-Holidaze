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
import AuthInput from '../common/authInput';
import Button from '../common/Buttons';
import Loader from '../common/Loader';

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
      dispatch(setCredentials(loginResult));
      navigate(`/profile/${loginResult.name}`, { replace: true });
    } catch (error: unknown) {
      handleError(error as FetchBaseQueryError | SerializedError, 'Login');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error.message && (
        <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded-md">
          {error.message}
        </div>
      )}
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
