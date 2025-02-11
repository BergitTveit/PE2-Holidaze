import { ReactNode } from 'react';
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';

export interface BaseInputProps<T extends FieldValues> {
  label: string | ReactNode;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  className?: string;
}
