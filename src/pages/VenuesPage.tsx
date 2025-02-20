import { useSearchParams } from 'react-router-dom';
import { useGetVenuesQuery, useSearchVenuesQuery } from '../services/venuesApi';
import { VenueGrid } from '../components/venues/VenueGrid';
import { SearchBar } from '../components/common/searchBar/SearchBar';
import { Loader } from 'lucide-react';
import { Pagination } from '../components/common/pagination';
import { NoVenuesFound } from '../components/common/NoVenuesFound';

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

  if (isLoading) return <Loader />;
  if (error) return <div>Error occurred while loading venues</div>;
//Make styled component for error and loader.
  return (
    <div>
      <SearchBar />
      {venues?.data?.length === 0 ? (
        <NoVenuesFound />
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
