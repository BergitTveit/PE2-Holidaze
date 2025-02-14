import { FieldValues } from 'react-hook-form';
import { BaseInputProps } from '../../types/baseInput';

const NumberInput = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  className = '',
}: BaseInputProps<T>) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium ">
        {label}
      </label>
      <input
        {...register(name, {
          setValueAs: (value: string) => {
            return value === '' ? 0 : Number(value);
          },
        })}
        type="number"
        id={name}
        className={`mt-1 block w-full max-w-12 border-gray-300 ${error ? 'border-red-500' : ''}`}
      />

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default NumberInput;
