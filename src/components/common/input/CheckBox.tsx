import { FieldValues } from 'react-hook-form';
import { BaseInputProps } from '../../../types/baseInput';

interface CheckboxInputProps<T extends FieldValues> extends Omit<BaseInputProps<T>, 'error'> {}

export const CheckboxInput = <T extends FieldValues>({
  label,
  name,
  register,
  className = 'flex items-center',
}: CheckboxInputProps<T>) => {
  return (
    <div className={className}>
      <input
        {...register(name)}
        type="checkbox"
        id={name}
        className="h-4 w-4 border-neutral text-primary-dark focus:ring-primary-dark/20 accent-primary-dark"
      />
      <label htmlFor={name} className="ml-2  block text-sm">
        {label}
      </label>
    </div>
  );
};
