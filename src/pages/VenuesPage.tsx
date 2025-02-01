import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VenueGrid from '../components/venues/VenueGrid';
import { fetchVenues } from '../store/slices/venuesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import Loader from '../components/common/Loader';
import SearchBar from '../components/common/SearchBar';

const VenuesPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: venues, isLoading, error } = useAppSelector((state) => state.venues);
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const handleChange = (query: string) => {
    handleSearch(query);
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
      <SearchBar
        onSubmit={handleSearch}
        onChange={handleChange}
        venues={venues}
        initialValue={searchTerm}
        showDropdown={false}
      />

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
