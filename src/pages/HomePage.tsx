import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { useEffect } from 'react';
import { fetchVenues } from '../store/slices/venuesSlice';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: venues } = useAppSelector((state) => state.venues);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

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
