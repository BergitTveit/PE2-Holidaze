import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button className={`${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
