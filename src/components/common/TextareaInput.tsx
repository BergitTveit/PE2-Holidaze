import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface TextareaInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  rows?: number;
  className?: string;
}

const TextareaInput = <T extends FieldValues>({
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
        className={`mt-1 block w-full${error ? 'border-red-500' : ''}`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default TextareaInput;
