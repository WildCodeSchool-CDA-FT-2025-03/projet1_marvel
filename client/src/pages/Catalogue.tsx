import { useState } from 'react';
import { Filter } from 'lucide-react';
import CatalogueItem from '../components/catalogue/CatalogueItem';
import useCatalogueData from '../hooks/useCatalogueData';
import SearchBar from '../components/catalogue/SearchBar';
import FilterPanel from '../components/catalogue/FilterPanel';
import Pagination from '../components/catalogue/Pagination';

export default function Catalogue() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const { catalogueItems, isLoading, totalItems } = useCatalogueData({
    searchTerm,
    category: activeCategory,
    sortOrder,
    page: currentPage,
    limit: itemsPerPage,
  });

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Catalogue</h1>

          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="flex space-x-2">
              <button
                className={`p-2 border rounded-lg flex items-center justify-center ${isFilterOpen ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                title="Filtres"
              >
                <Filter size={20} />
              </button>
            </div>
          </div>
        </section>

        {isFilterOpen && (
          <FilterPanel
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        )}

        <p className="text-sm text-gray-500 mb-6">
          {totalItems} {totalItems > 1 ? 'éléments trouvés' : 'élément trouvé'}
        </p>

        {isLoading ? (
          <section className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500">Chargement des données en cours...</p>
          </section>
        ) : catalogueItems.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {catalogueItems.map(item => (
              <CatalogueItem key={`${item.id}-${item.type}`} item={item} />
            ))}
          </section>
        ) : (
          <section className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500">Aucun élément disponible dans le catalogue.</p>
          </section>
        )}
      </div>

      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
}
