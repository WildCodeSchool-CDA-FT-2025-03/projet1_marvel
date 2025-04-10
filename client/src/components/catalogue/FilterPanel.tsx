import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { categories } from '../../utils/categories';

type FilterPanelProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  ratingFilter: number;
  setRatingFilter: (rating: number) => void;
};

export default function FilterPanel({
  activeCategory,
  setActiveCategory,
  ratingFilter,
  setRatingFilter,
}: FilterPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white p-4 rounded-lg shadow-md mb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
        <section className="flex-1">
          <h4 className="font-medium text-gray-700 mb-2">Catégories</h4>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${activeCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setActiveCategory('all')}
            >
              Tous
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-3 py-1.5 text-sm font-medium rounded-full flex items-center space-x-1 transition-colors ${activeCategory === category.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <category.icon size={14} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h4 className="font-medium text-gray-700 mb-2">Note minimale</h4>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={ratingFilter}
              onChange={e => setRatingFilter(parseFloat(e.target.value))}
              className="w-32 accent-indigo-600"
            />
            <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md">
              <Star size={16} className="text-yellow-500" />
              <span className="font-medium">{ratingFilter}</span>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
