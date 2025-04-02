import { BookOpen, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import NavLink from './NavLink';

export default function DesktopNavigation() {
  return (
    <nav className="hidden md:block">
      <div className="flex items-center space-x-8">
        <ul className="flex space-x-6">
          <motion.li whileHover={{ scale: 1.05 }}>
            <NavLink to="/catalogue" icon={BookOpen} label="Catalogue" />
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <NavLink to="/favorite" icon={Heart} label="Favoris" />
          </motion.li>
        </ul>
      </div>
    </nav>
  );
}
