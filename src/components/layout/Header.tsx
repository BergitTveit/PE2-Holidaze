import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useStore';

export const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4">
        <Link to="/">Home</Link>
        <Link to="/venues" className="ml-4">
          Venues
        </Link>
        {user ? (
          <Link to={`/profile/${user.name}`} className="ml-4">
            Profile
          </Link>
        ) : (
          <>
            <Link to="/register" className="ml-4">
              Register
            </Link>
            <Link to="/login" className="ml-4">
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
