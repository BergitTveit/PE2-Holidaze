import { FieldValues } from 'react-hook-form';
import { BaseInputProps } from '../../../types/baseInput';

export const TextInput = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  className = '',
}: BaseInputProps<T>) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm">
        {label}
      </label>
      <input
        {...register(name)}
        type="text"
        id={name}
        className={`mt-1 block w-full border-2 border-primary ${error ? 'border-red-500' : ''}`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
