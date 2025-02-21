import { useSearchParams } from 'react-router-dom';
import { useGetVenuesQuery, useSearchVenuesQuery } from '../services/venuesApi';
import { VenueGrid } from '../components/venues/VenueGrid';
import { SearchBar } from '../components/common/searchBar/SearchBar';
import { Pagination } from '../components/common/pagination';
import { MessageDisplay } from '../components/common/feedback/MessageDisplay';

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

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    params.set('page', String(newPage));
    setSearchParams(params);
  };

  if (isLoading) {
    return (
      <MessageDisplay
        title="Loading venues"
        message="Please wait while we fetch the venues"
        variant="loading"
      />
    );
  }
  if (error) {
    return (
      <MessageDisplay
        title="Error occurred"
        message="There was a problem loading venues"
        variant="error"
      />
    );
  }

  return (
    <div>
      <SearchBar />
      {venues?.data?.length === 0 ? (
        <MessageDisplay
          title="No venues found"
          message="Try adjusting your search or location filters"
          variant="empty"
        />
      ) : (
        <>
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
    </div>
  );
};

export default VenuesPage;
