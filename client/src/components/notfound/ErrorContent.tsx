import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import SuggestionItem from './SuggestionItem';

export default function ErrorContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="bg-indigo-600 px-6 py-8 text-white text-center">
        <h2 id="error-title" className="text-2xl md:text-3xl font-bold mb-2">
          Page non trouvée
        </h2>
        <p className="text-indigo-100">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <p className="text-gray-600 text-center mb-6">
            Voici quelques suggestions pour vous aider à retrouver votre chemin:
          </p>

          <nav aria-label="Suggestions de navigation">
            <ul className="space-y-4 list-none p-0">
              <SuggestionItem
                icon={<Home size={20} aria-hidden="true" />}
                title="Retourner à l'accueil"
                description="Visitez notre page d'accueil pour découvrir les fonctionnalités de Home Center."
              />

              <SuggestionItem
                icon={<Search size={20} aria-hidden="true" />}
                title="Explorer le catalogue"
                description="Parcourez notre bibliothèque de livres, musiques, jeux et films."
              />

              <SuggestionItem
                icon={<ArrowLeft size={20} aria-hidden="true" />}
                title="Revenir en arrière"
                description="Retournez à la page précédente si vous pensez avoir fait une erreur."
              />
            </ul>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Link
            to="/"
            className="flex-1 bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg text-center hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Aller à la page d'accueil"
          >
            Page d&apos;accueil
          </Link>
          <Link
            to="/catalogue"
            className="flex-1 bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-lg text-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label="Explorer le catalogue"
          >
            Voir le catalogue
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
