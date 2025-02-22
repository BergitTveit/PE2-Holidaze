import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'pagination' | 'search' | 'round';
  isActive?: boolean;
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  isActive = false,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'transition-all shadow-sm hover:shadow-md';

  const variants = {
    primary: `border-2 border-primary-dark bg-primary text-white 
      hover:bg-white hover:text-neutral px-6 py-2`,

    secondary: `border-2 border-primary-dark text-primary 
      hover:bg-primary hover:text-white px-6 py-2`,

    pagination: `w-10 h-10 flex items-center justify-center border-2 
      ${
        isActive
          ? 'bg-primary text-white border-primary shadow-md'
          : 'border-primary-dark text-primary hover:bg-primary hover:text-white'
      }`,

    search: `flex items-center px-6 py-2 border-2 border-primary-dark 
      bg-primary text-white h-12 w-auto sm:w-auto
      hover:bg-white hover:text-primary`,

    round: `w-8 h-8 rounded-full bg-primary flex items-center justify-center 
      text-white hover:bg-primary-dark`,
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={props.disabled}
      {...props}
    >
      {children}
    </button>
  );
};
