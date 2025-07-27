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
    <div className="flex justify-center items-center mt-8 space-x-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`flex items-center px-4 py-2 rounded-md ${
          currentPage === 1
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 text-white hover:text-red-600'
        }`}
        aria-label="Previous page"
      >
        <FaChevronLeft className="mr-2" />
        Previous
      </button>

      <div className="text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`flex items-center px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 text-white hover:text-red-600'
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
