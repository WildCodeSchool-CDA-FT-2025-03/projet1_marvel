import { motion } from 'framer-motion';
import NavLink from './NavLink';
import { navigationLinks } from '../../../utils/navigationLinks';

export default function DesktopNavigation() {
  return (
    <nav className="hidden md:block">
      <div className="flex items-center space-x-8">
        <ul className="flex space-x-6">
          {navigationLinks.map(link => (
            <motion.li key={link.to} whileHover={{ scale: 1.05 }}>
              <NavLink to={link.to} icon={link.icon} label={link.label} />
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
