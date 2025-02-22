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
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage || isLoading}
        className={isFirstPage || isLoading ? 'opacity-50' : ''}
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
              variant="pagination"
              isActive={pageNum === currentPage}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage || isLoading}
        className={isLastPage || isLoading ? 'opacity-50' : ''}
      >
        Next
      </Button>
    </div>
  );
};
