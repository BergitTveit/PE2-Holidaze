import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface TextInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  className?: string;
}

const TextInput = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  className = '',
}: TextInputProps<T>) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm">
        {label}
      </label>
      <input
        {...register(name)}
        type="text"
        id={name}
        className={`mt-1 block w-full border-gray-300 ${error ? 'border-red-500' : ''}`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default TextInput;
