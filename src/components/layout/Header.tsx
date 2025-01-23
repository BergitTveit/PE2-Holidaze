import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4">
        <Link to="/">Home</Link>
        <Link to="/venues" className="ml-4">Venues</Link>
        <Link to="/login" className="ml-4">Login</Link>
      </nav>
    </header>
  );
};