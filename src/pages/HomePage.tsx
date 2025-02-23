import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useGetVenuesQuery } from '../services/venuesApi';
import { SearchBar } from '../components/common/searchBar/SearchBar';
import { VenueGrid } from '../components/venues/venues/VenueGrid';
import { MessageDisplay } from '../components/common/feedback/MessageDisplay';
import placeholder from '../../public/placeholder.jpg';

const HomePage = () => {
  const navigate = useNavigate();
  const {
    data: venues,
    isLoading,
    error,
  } = useGetVenuesQuery({
    page: 1,
    limit: 3,
    sort: 'created',
    sortOrder: 'desc',
  });

  return (
    <>
      <Helmet>
        <title>Holidaze - Find Your Perfect Stay</title>
        <meta
          name="description"
          content="Search and book unique accommodation venues across beautiful destinations with Holidaze"
        />
      </Helmet>
      <div className="max-w-screen-lg -m-6">
        {' '}
        {/* Negative margin offsets parent padding */}
        <img
          src={placeholder}
          alt="Holiday destination"
          className="w-full h-[500px] object-cover"
        />
      </div>
      <div className="min-h-screen flex flex-col items-center px-4 py-8 md:py-12 space-y-12">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-8">Find Your Perfect Venue</h1>
          <SearchBar navigate={navigate} />
        </div>

        <div className="w-full max-w-7xl">
          <h2 className="text-2xl font-semibold mb-6">Latest Venues</h2>
          {isLoading ? (
            <MessageDisplay
              title="Loading venues"
              message="Please wait while we fetch the venues"
              variant="loading"
            />
          ) : error ? (
            <MessageDisplay
              title="Error occurred"
              message="There was a problem loading venues"
              variant="error"
            />
          ) : venues?.data ? (
            <VenueGrid venues={venues.data} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default HomePage;
