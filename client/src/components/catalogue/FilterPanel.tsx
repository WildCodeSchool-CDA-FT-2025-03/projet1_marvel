import { motion } from 'framer-motion';
import { ArrowUpAZ, ArrowDownAZ } from 'lucide-react';
import { categories } from '../../utils/categories';

type FilterPanelProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
};

export default function FilterPanel({
  activeCategory,
  setActiveCategory,
  sortOrder,
  setSortOrder,
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
          <h4 className="font-medium text-gray-700 mb-2">Tri</h4>
          <div className="flex items-center space-x-2">
            <button
              className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${sortOrder === 'asc' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setSortOrder('asc')}
            >
              <ArrowUpAZ size={14} />
              <span>A-Z</span>
            </button>
            <button
              className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${sortOrder === 'desc' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setSortOrder('desc')}
            >
              <ArrowDownAZ size={14} />
              <span>Z-A</span>
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
