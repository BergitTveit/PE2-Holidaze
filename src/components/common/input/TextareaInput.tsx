import { FieldValues } from 'react-hook-form';
import { BaseInputProps } from '../../../types/baseInput';

interface TextareaInputProps<T extends FieldValues> extends BaseInputProps<T> {
  rows?: number;
}

export const TextareaInput = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  rows = 4,
  className = '',
}: TextareaInputProps<T>) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm ">
        {label}
      </label>
      <textarea
        {...register(name)}
        id={name}
        rows={rows}
        className={`mt-1 block w-full border-2 border-primary${error ? 'border-red-500' : ''}`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

