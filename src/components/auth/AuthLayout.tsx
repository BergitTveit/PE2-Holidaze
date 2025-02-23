import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Buttons';
import { X } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="/src/assets/placeholder.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral/90" />
      </div>

      <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-neutral backdrop-blur border-2 border-primary-dark shadow-xl">
        <Button
          variant="round"
          onClick={() => navigate('/')}
          className="absolute -top-4 -right-4 flex items-center justify-center w-10 h-10 rounded-full !bg-neutral border-2 border-primary-dark shadow-md hover:!bg-primary"
        >
          <X className="w-5 h-5" />
        </Button>

        {children}
      </div>
    </div>
  );
};
