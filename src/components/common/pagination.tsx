import { Button } from './Buttons';

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  isFirstPage?: boolean;
  isLastPage?: boolean;
}
export const Pagination = ({
  currentPage,
  pageCount,
  isLoading = false,
  onPageChange,
  isFirstPage = false,
  isLastPage = false,
}: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6 mb-8">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage || isLoading}
        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
      >
        Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
          const pageNum = currentPage - 2 + i;
          if (pageNum < 1 || pageNum > pageCount) return null;
          return (
            <Button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-full ${
                pageNum === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage || isLoading}
        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
};
