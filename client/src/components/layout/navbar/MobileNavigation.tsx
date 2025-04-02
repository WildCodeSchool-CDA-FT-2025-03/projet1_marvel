import { motion } from 'framer-motion';
import { BookOpen, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileNavigationProps {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export default function MobileNavigation({ setIsMenuOpen }: MobileNavigationProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="md:hidden bg-white shadow-lg py-4 overflow-hidden"
    >
      <div className="container mx-auto px-4 flex flex-col space-y-4">
        <ul className="flex flex-col space-y-3">
          <li>
            <Link
              to="/catalogue"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen size={20} aria-hidden="true" />
              <span>Catalogue</span>
            </Link>
          </li>
          <li>
            <Link
              to="/favorite"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart size={20} aria-hidden="true" />
              <span>Favoris</span>
            </Link>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}
