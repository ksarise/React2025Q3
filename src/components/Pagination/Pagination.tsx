import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps) => {
  return (
    <div className="flex justify-center items-center mt-8 space-x-4 p-1">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700'
            : 'bg-gray-400 text-black hover:text-red-600 dark:bg-gray-800 dark:text-white'
        }`}
        aria-label="Previous page"
      >
        <FaChevronLeft className="mr-2" />
        Previous
      </button>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700'
            : 'bg-gray-400 text-black hover:text-red-600 dark:bg-gray-800 dark:text-white'
        }`}
        aria-label="Next page"
      >
        Next
        <FaChevronRight className="ml-2" />
      </button>
    </div>
  );
};

export default Pagination;
