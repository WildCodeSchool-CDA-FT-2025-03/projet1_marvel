import { motion } from 'framer-motion';
import NavLink from './NavLink';
import { navigationLinks } from '../../../utils/navigationLinks';

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
          {navigationLinks.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                icon={link.icon}
                label={link.label}
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 py-2"
                onClick={() => setIsMenuOpen(false)}
                iconSize={20}
              />
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
