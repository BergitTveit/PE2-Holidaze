import { FieldValues } from 'react-hook-form';
import { BaseInputProps } from '../../../types/baseInput';

interface AuthInputProps<T extends FieldValues> extends BaseInputProps<T> {
  type: 'email' | 'password' | 'confirmPassword' | 'text';
}

export const AuthInput = <T extends FieldValues>({
  label,
  name,
  register,
  type,
  error,
  className = '',
}: AuthInputProps<T>) => {
  const placeholderText =
    typeof label === 'string' ? `Enter your ${label.toLowerCase()}` : `Enter your ${name}`;

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label htmlFor={name} className="text-white font-medium">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        id={name}
        placeholder={placeholderText}
        className="w-full px-4 py-2 bg-white border-2 border-primary-dark 
              placeholder-primary focus:outline-none focus:ring-2 
                 focus:ring-primary focus:border-transparent"
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};
