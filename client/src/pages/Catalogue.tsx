import { useState } from 'react';
import CatalogueItem from '../components/catalogue/CatalogueItem';
import useCatalogueData from '../hooks/useCatalogueData';
import useFilterSort from '../hooks/useFilterSort';
import SearchBar from '../components/catalogue/SearchBar';
import { Filter } from 'lucide-react';
import FilterPanel from '../components/catalogue/FilterPanel';

export default function Catalogue() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { catalogueItems, isLoading } = useCatalogueData();
  const {
    searchTerm,
    setSearchTerm,
    filteredItems,
    activeCategory,
    setActiveCategory,
    ratingFilter,
    setRatingFilter,
  } = useFilterSort({ catalogueItems });

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <CatalogueItem
                key={`${item.id}-${item.type}`}
                item={item}
                isFavorite={favorites.includes(item.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500">Aucun élément disponible dans le catalogue.</p>
          </div>
        )}
      </div>
    </main>
  );
}
