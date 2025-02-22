import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useStore';

export const Header = () => {
  const { userName } = useAppSelector((state) => state.auth);
  return (
    <header
      className="bg-neutral shadow relative"
      style={{
        backgroundImage: `url('/src/assets/placeholder.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '50px',
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-neutral opacity-90"></div>
      <nav className="container mx-auto px-4 py-4 relative z-10">
        <Link to="/" className="ml-4 text-white">
          HOLIDAZE
        </Link>
        <Link to="/venues" className="ml-4 text-white">
          Venues
        </Link>
        {userName ? (
          <Link to={`/profile/${userName}`} className="ml-4 text-white">
            Profile
          </Link>
        ) : (
          <>
            <Link to="/register" className="ml-4 text-white">
              Register
            </Link>
            <Link to="/login" className="ml-4 text-white">
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
