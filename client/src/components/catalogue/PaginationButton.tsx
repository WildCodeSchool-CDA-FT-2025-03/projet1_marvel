export default function PaginationButton(
  pageNumber: number,
  currentPage: number,
  onPageChange: (page: number) => void,
) {
  return (
    <button
      key={pageNumber}
      className={`px-4 py-2 text-sm font-medium ${
        currentPage === pageNumber
          ? 'text-white bg-indigo-600 border border-indigo-600'
          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
      }`}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  );
}
