import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Buttons';

export const VenueHero = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-neutral/90 w-96 h-96 border-4 border-primary-dark flex flex-col items-center justify-center gap-6">
        <Button variant="primary" onClick={() => navigate('/venues')}>
          EXPLORE VENUES
        </Button>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => navigate('/login')}>
            LOGIN
          </Button>
       
        </div>
        <p className="text-white text-sm">
          New here?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};
