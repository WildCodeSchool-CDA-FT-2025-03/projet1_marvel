import PaginationButton from './PaginationButton';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(PaginationButton(i, currentPage, onPageChange));
      }
    } else {
      buttons.push(PaginationButton(1, currentPage, onPageChange));

      if (currentPage > 3) {
        buttons.push(
          <span
            key="ellipsis-start"
            className="h-full px-2 font-medium text-gray-700 bg-white border border-gray-300"
          >
            ...
          </span>,
        );
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(PaginationButton(i, currentPage, onPageChange));
      }

      if (currentPage < totalPages - 2) {
        buttons.push(
          <span
            key="ellipsis-end"
            className="h-full px-2 font-medium text-gray-700 bg-white border border-gray-300"
          >
            ...
          </span>,
        );
      }

      if (totalPages > 1) {
        buttons.push(PaginationButton(totalPages, currentPage, onPageChange));
      }
    }

    return buttons;
  };

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

        {renderPageButtons()}

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
