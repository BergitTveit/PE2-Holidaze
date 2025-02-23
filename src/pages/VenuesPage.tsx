import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { useGetVenuesQuery, useSearchVenuesQuery } from '../services/venuesApi';
import { SearchBar } from '../components/common/searchBar/SearchBar';
import { Pagination } from '../components/common/pagination';
import { MessageDisplay } from '../components/common/feedback/MessageDisplay';
import { VenueGrid } from '../components/venues/venues/VenueGrid';
import { Heading } from '../components/common/Heading';

const VenuesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const {
    data: venues,
    isLoading,
    isFetching: isLoadingMore,
    error,
  } = searchTerm
    ? useSearchVenuesQuery({
        query: searchTerm,
        page: currentPage,
        limit: 12,
        sort: 'created',
        sortOrder: 'desc',
      })
    : useGetVenuesQuery({
        page: currentPage,
        limit: 12,
        sort: 'created',
        sortOrder: 'desc',
      });

  const getTitle = () => {
    if (isLoading) return 'Loading Venues';
    if (error) return 'Error Loading Venues';
    if (!venues?.data?.length) return 'No Venues Found';
    return searchTerm ? `Search Results: ${searchTerm}` : 'Browse All Venues';
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    params.set('page', String(newPage));
    setSearchParams(params);
  };

  return (
    <>
      <Helmet>
        <title>{`${getTitle()} - Holidaze`}</title>
        <meta
          name="description"
          content={
            searchTerm
              ? `Search results for "${searchTerm}" - Find your perfect venue on Holidaze`
              : 'Browse all available venues for your next stay on Holidaze'
          }
        />
      </Helmet>

      <SearchBar />

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
      ) : venues?.data?.length === 0 ? (
        <MessageDisplay
          title="No venues found"
          message="Try adjusting your search or location filters"
          variant="empty"
        />
      ) : (
        <>
          <Heading />
          <VenueGrid venues={venues?.data || []} />
          {venues?.meta && (
            <Pagination
              currentPage={currentPage}
              pageCount={venues.meta.pageCount}
              isLoading={isLoadingMore}
              onPageChange={handlePageChange}
              isFirstPage={venues.meta.isFirstPage}
              isLastPage={venues.meta.isLastPage}
            />
          )}
        </>
      )}
    </>
  );
};

export default VenuesPage;
