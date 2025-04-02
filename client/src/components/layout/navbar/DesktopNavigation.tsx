import { BookOpen, Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function DesktopNavigation() {
  return (
    <nav className="hidden md:block">
      <div className="flex items-center space-x-8">
        <ul className="flex space-x-6">
          <motion.li whileHover={{ scale: 1.05 }}>
            <Link
              to="/catalogue"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
            >
              <BookOpen size={18} aria-hidden="true" />
              <span>Catalogue</span>
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <Link
              to="/favorite"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
            >
              <Heart size={18} aria-hidden="true" />
              <span>Favoris</span>
            </Link>
          </motion.li>
        </ul>
        <div className="flex items-center">
          <form role="search" className="relative">
            <label htmlFor="desktop-search" className="sr-only">
              Rechercher
            </label>
            <input
              id="desktop-search"
              type="search"
              placeholder="Rechercher..."
              className="pl-9 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
              aria-hidden="true"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}
