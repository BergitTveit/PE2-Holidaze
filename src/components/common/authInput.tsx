import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface AuthInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type: 'email' | 'password' | 'confirmPassword';
  error?: string;
  className?: string;
}

const AuthInput = <T extends FieldValues>({
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

export default AuthInput;
