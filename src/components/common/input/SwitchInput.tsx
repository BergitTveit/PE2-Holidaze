import React, { useState } from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';

interface SwitchInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  className?: string;
}

export const SwitchInput = ({ label, name, register, className = '' }: SwitchInputProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { onChange, ...rest } = register(name);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onChange(e);
  };

  const switchId = `switch-${name}`;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <label
        htmlFor={switchId}
        className="relative inline-flex items-center cursor-pointer"
        role="switch"
        aria-checked={isChecked}
      >
        <input
          id={switchId}
          type="checkbox"
          className="sr-only"
          {...rest}
          onChange={handleToggle}
          aria-labelledby={`${switchId}-label`}
        />
        {isChecked ? (
          <ToggleRight className="w-12 h-12 text-primary transition-colors" aria-hidden="true" />
        ) : (
          <ToggleLeft
            className="w-12 h-12 text-neutral-silver transition-colors"
            aria-hidden="true"
          />
        )}
      </label>
      <span id={`${switchId}-label`} className="font-medium">
        {label}
      </span>
    </div>
  );
};
