import { useEffect, useState } from 'react';
import VenueGrid from '../components/venues/VenueGrid';
import { fetchVenues } from '../store/slices/venuesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';

import Loader from '../components/common/Loader';
import SearchBar from '../components/common/SearchBar';

const VenuesPage = () => {
  const dispatch = useAppDispatch();
  const { data: venues, isLoading, error } = useAppSelector((state) => state.venues);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} venues={venues} />
      {filteredVenues.length === 0 ? (
        <div className="text-center p-8">
          <h3>No venues found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <VenueGrid venues={filteredVenues} />
      )}
    </div>
  );
};

export default VenuesPage;
