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
        className={`px-6 py-2 border-2 border-primary-dark text-primary shadow-sm
          ${
            isFirstPage || isLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-primary hover:text-white hover:shadow-md transition-all'
          }`}
      >
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: Math.min(3, pageCount) }, (_, i) => {
          const pageNum = currentPage - 1 + i;
          if (pageNum < 1 || pageNum > pageCount) return null;
          return (
            <Button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 flex items-center justify-center transition-all shadow-sm
                ${
                  pageNum === currentPage
                    ? 'bg-primary text-white border-2 border-primary shadow-md'
                    : 'border-2 border-primary-dark text-primary hover:bg-primary hover:text-white hover:shadow-md'
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
        className={`px-6 py-2 border-2 border-primary-dark text-primary shadow-sm
          ${
            isLastPage || isLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-primary hover:text-white hover:shadow-md transition-all'
          }`}
      >
        Next
      </Button>
    </div>
  );
};
