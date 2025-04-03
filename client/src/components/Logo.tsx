import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center space-x-2"
    >
      <Link to="/" aria-label="Home Center" className="flex items-center space-x-2">
        <div
          className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center"
          role="img"
          aria-hidden="true"
        >
          <span className="text-white font-bold text-lg">HC</span>
        </div>
        <h1 className="text-xl font-bold text-indigo-600">Home Center</h1>
      </Link>
    </motion.div>
  );
}
