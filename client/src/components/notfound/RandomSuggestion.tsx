import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function RandomSuggestion() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-8 text-center"
    >
      <p className="text-gray-500 text-sm">
        En attendant, pourquoi ne pas découvrir un de nos coups de cœur?
      </p>
      <Link
        to="/catalogue"
        className="text-indigo-600 font-medium inline-flex items-center mt-2 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded"
        aria-label="Voir nos suggestions personnalisées"
      >
        Suggestions pour vous
        <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}
