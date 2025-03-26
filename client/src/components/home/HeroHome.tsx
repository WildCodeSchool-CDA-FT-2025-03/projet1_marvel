import { motion } from 'framer-motion';

export default function HeroHome() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-indigo-700 text-white"
    >
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Votre Bibliothèque Numérique</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
          Découvrez et organisez vos livres, albums, jeux et films préférés dans un seul espace
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow-lg"
          >
            Explorer le Catalogue
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg"
          >
            En Savoir Plus
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
