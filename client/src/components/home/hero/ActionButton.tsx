import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type ActionButtonProps = {
  label: string;
  isPrimary?: boolean;
  to?: string;
};

export default function ActionButton({ label, isPrimary = false, to }: ActionButtonProps) {
  const buttonClasses = isPrimary
    ? 'bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow-lg'
    : 'bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg';

  if (to) {
    return (
      <Link to={to}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={buttonClasses}
        >
          {label}
        </motion.button>
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={buttonClasses}
    >
      {label}
    </motion.button>
  );
}
