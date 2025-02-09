import { useSearchParams } from 'react-router-dom';
import { useGetVenuesQuery, useSearchVenuesQuery } from '../services/venuesApi';
import VenueGrid from '../components/venues/VenueGrid';
import Loader from '../components/common/Loader';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Buttons';

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
      })
    : useGetVenuesQuery({
        page: currentPage,
        limit: 12,
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

  return (
    <div>
      <SearchBar />
      {venues?.data?.length === 0 ? (
        <div className="text-center p-8">
          <h3>No venues found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <>
          <VenueGrid venues={venues?.data || []} />

          {venues?.meta && (
            <div className="flex justify-center items-center gap-4 mt-6 mb-8">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={venues.meta.isFirstPage || isLoadingMore}
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, venues.meta.pageCount) }, (_, i) => {
                  const pageNum = currentPage - 2 + i;
                  if (pageNum < 1 || pageNum > venues.meta.pageCount) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-full ${
                        pageNum === currentPage
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={venues.meta.isLastPage || isLoadingMore}
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VenuesPage;
