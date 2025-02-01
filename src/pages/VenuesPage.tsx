import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VenueGrid from '../components/venues/VenueGrid';
import { fetchVenues } from '../store/slices/venuesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import Loader from '../components/common/Loader';
import SearchBar from '../components/common/SearchBar';
import useDebounce from '../hooks/useDebounce';

const VenuesPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: venues, isLoading, error } = useAppSelector((state) => state.venues);
  const searchTerm = searchParams.get('search') || '';
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  useEffect(() => {
    if (debouncedSearch) {
      setSearchParams({ search: debouncedSearch });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearch, setSearchParams]);

  const handleSearch = (query: string) => {
    setSearchParams(query ? { search: query } : {});
  };

  const handleChange = (query: string) => {
    setSearchParams(query ? { search: query } : {});
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

//

//
