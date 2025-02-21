import { FieldValues } from 'react-hook-form';
import { BaseInputProps } from '../../../types/baseInput';

interface AuthInputProps<T extends FieldValues> extends BaseInputProps<T> {
  type: 'email' | 'password' | 'confirmPassword';
}

export const AuthInput = <T extends FieldValues>({
  label,
  name,
  register,
  type,
  error,
  className = '',
}: AuthInputProps<T>) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input {...register(name)} type={type} id={name} />
      {error && <span>{error}</span>}
    </div>
  );
};
