import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../hooks/useStore';
import { setCredentials } from '../../store/slices/authSlice';
import { useLoginMutation, useRegisterMutation } from '../../services/authApi';
import { RegisterCredentials, RegisterFormData, registerSchema } from '../../schemas/auth';
import { useApiError } from '../../hooks/useApiError';
import { AuthInput } from '../common/input/authInput';
import { TextInput } from '../common/input/TextInput';
import { CheckboxInput } from '../common/input/CheckBox';
import { Button } from '../common/Buttons';
import { ErrorDisplay } from '../common/ErrorDisplay';
import { Loader } from 'lucide-react';

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const { error, handleError, clearError } = useApiError();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterCredentials) => {
    clearError();

    try {
      const registerResult = await registerUser(data).unwrap();

      const loginResult = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(
        setCredentials({
          accessToken: loginResult.accessToken,
          userName: loginResult.name,
        })
      );

      navigate(`/profile/${registerResult.name}`, { replace: true });
    } catch (err) {
      handleError(err as FetchBaseQueryError | SerializedError);
    }
  };

  const isLoading = isRegistering || isLoggingIn;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ErrorDisplay error={error} />

      <TextInput label="Username" name="name" register={register} error={errors.name?.message} />
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

      <AuthInput
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword?.message}
      />

      <CheckboxInput
        label="I want to become a venue manager"
        name="venueManager"
        register={register}
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? <Loader /> : 'Register'}
      </Button>
    </form>
  );
};
