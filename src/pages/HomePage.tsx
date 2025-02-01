import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import { useAppSelector } from '../hooks/useStore';

const HomePage = () => {
  const navigate = useNavigate();
  const { data: venues } = useAppSelector((state) => state.venues);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/venues?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-8">Find Your Perfect Venue</h1>
        <SearchBar onSubmit={handleSearch} venues={venues} />
      </div>
    </div>
  );
};

export default HomePage;
