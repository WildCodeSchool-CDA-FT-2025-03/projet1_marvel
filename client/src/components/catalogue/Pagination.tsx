interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center mt-12">
      <div className="inline-flex items-center rounded-md shadow-sm">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Précédent
        </button>

        {Array.from({ length: Math.min(totalPages, 3) }).map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium ${
              currentPage === index + 1
                ? 'text-white bg-indigo-600 border border-indigo-600'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
