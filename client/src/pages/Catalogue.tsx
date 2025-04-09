import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, SortAsc, SortDesc } from 'lucide-react';

import SearchBar from '../components/catalogue/SearchBar';
import FilterPanel from '../components/catalogue/FilterPanel';
import CatalogueItem from '../components/catalogue/CatalogueItem';
import Pagination from '../components/catalogue/Pagination';
import useCatalogueData from '../hooks/useCatalogueData';
import useFilterSort from '../hooks/useFilterSort';

const itemsPerPage = 8;

export default function Catalogue() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { catalogueItems, isLoading } = useCatalogueData();
  const {
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    ratingFilter,
    setRatingFilter,
    filteredItems,
  } = useFilterSort({ catalogueItems });

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  }, [filteredItems, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory, ratingFilter, sortOrder]);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Catalogue</h1>

          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="flex space-x-2">
              <button
                className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                title={sortOrder === 'asc' ? 'Tri descendant' : 'Tri ascendant'}
              >
                {sortOrder === 'asc' ? <SortAsc size={20} /> : <SortDesc size={20} />}
              </button>
              <button
                className={`p-2 border rounded-lg flex items-center justify-center ${isFilterOpen ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                title="Filtres"
              >
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>

        {isFilterOpen && (
          <FilterPanel
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
          />
        )}

        <div className="text-sm text-gray-500 mb-6">
          {filteredItems.length} {filteredItems.length > 1 ? 'éléments trouvés' : 'élément trouvé'}
        </div>

        {isLoading ? (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500">Chargement des données en cours...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {paginatedItems.map(item => (
              <CatalogueItem
                key={`${item.id}-${item.type}`}
                item={item}
                isFavorite={favorites.includes(item.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </motion.div>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500 mb-4">Aucun résultat ne correspond à votre recherche.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
                setRatingFilter(0);
              }}
              className="text-indigo-600 font-medium hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {filteredItems.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </main>
  );
}
