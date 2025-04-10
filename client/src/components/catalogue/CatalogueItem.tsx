import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Book, Music, Gamepad2, Film } from 'lucide-react';
import { CatalogueItem as CatalogueItemType } from '../../types/catalogue.type';

interface CatalogueItemProps {
  item: CatalogueItemType;
}

const getItem = {
  books: {
    icon: <Book size={14} />,
    type: 'Livre',
    color: 'bg-blue-50',
  },
  music: {
    icon: <Music size={14} />,
    type: 'Musique',
    color: 'bg-purple-50',
  },
  games: {
    icon: <Gamepad2 size={14} />,
    type: 'Jeu Vidéo',
    color: 'bg-green-50',
  },
  movies: {
    icon: <Film size={14} />,
    type: 'Film',
    color: 'bg-red-50',
  },
};

export default function CatalogueItem({ item }: CatalogueItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg"
    >
      <Link to={`/item/${item.id}`}>
        <div
          className={`relative h-52 flex items-center justify-center ${getItem[item.type].color}`}
        >
          <span className="text-8xl">{item.emoji}</span>
          <div className="absolute top-2 left-2 bg-white rounded-full px-3 py-1 shadow-sm flex items-center space-x-1 text-yellow-500">
            <Star size={14} />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-1 text-xs text-indigo-600 mb-1">
            {getItem[item.type].icon}
            <span className="font-medium">{getItem[item.type].type}</span>
          </div>
        </div>

        <Link to={`/item/${item.id}`} className="block">
          <h3 className="font-semibold text-lg mb-1 hover:text-indigo-600 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-1">
            {item.author && `Par ${item.author}`}
            {item.artist && `Par ${item.artist}`}
            {item.director && `Réalisé par ${item.director}`}
            {item.platform && `Sur ${item.platform}`}
          </p>
        </Link>

        <div className="flex justify-between items-center">
          <Link
            to={`/item/${item.id}`}
            className="text-indigo-600 text-sm font-medium hover:underline"
          >
            Voir détails
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
