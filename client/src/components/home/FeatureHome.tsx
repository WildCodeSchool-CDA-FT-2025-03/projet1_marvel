import { useState } from 'react';

import { motion } from 'framer-motion';
import { Book, Music, Gamepad2, Film, Heart, Clock, Star } from 'lucide-react';
import { useQuery } from '@apollo/client';

import { categories } from '../../utils/categories';
import { GET_HELLO_WORLD } from '../../schemas/hello.schema';

export default function FeatureHome() {
  const { data } = useQuery(GET_HELLO_WORLD, {
    variables: {
      getHelloByIdId: '1',
    },
  });
  const [activeCategory, setActiveCategory] = useState('all');

  const featuredItems = [
    {
      id: 1,
      title: 'Le Seigneur des Anneaux',
      type: 'books',
      author: 'J.R.R. Tolkien',
      emoji: '📚',
      rating: 4.9,
    },
    {
      id: 2,
      title: 'Abbey Road',
      type: 'music',
      artist: 'The Beatles',
      emoji: '🎵',
      rating: 4.8,
    },
    {
      id: 3,
      title: 'The Legend of Zelda: Breath of the Wild',
      type: 'games',
      platform: 'Nintendo Switch',
      emoji: '🎮',
      rating: 4.9,
    },
    {
      id: 4,
      title: 'Inception',
      type: 'movies',
      director: 'Christopher Nolan',
      emoji: '🎬',
      rating: 4.7,
    },
    {
      id: 5,
      title: 'Dune',
      type: 'books',
      author: 'Frank Herbert',
      emoji: '📚',
      rating: 4.6,
    },
    {
      id: 6,
      title: 'Dark Side of the Moon',
      type: 'music',
      artist: 'Pink Floyd',
      emoji: '🎵',
      rating: 4.9,
    },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? featuredItems
      : featuredItems.filter(item => item.type === activeCategory);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold">À Découvrir</h3>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full ${activeCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveCategory('all')}
            >
              Tous
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 text-sm font-medium rounded-full ${activeCategory === category.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div
                className={`relative h-52 flex items-center justify-center ${
                  item.type === 'books'
                    ? 'bg-blue-50'
                    : item.type === 'music'
                      ? 'bg-purple-50'
                      : item.type === 'games'
                        ? 'bg-green-50'
                        : 'bg-red-50'
                }`}
              >
                <span className="text-8xl">{item.emoji}</span>
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm">
                  <Heart size={18} className="text-gray-500 hover:text-red-500 cursor-pointer" />
                </div>
                <div
                  className={`absolute top-2 left-2 bg-white rounded-full px-3 py-1 shadow-sm flex items-center space-x-1 ${
                    item.type === 'books'
                      ? 'text-blue-600'
                      : item.type === 'music'
                        ? 'text-purple-600'
                        : item.type === 'games'
                          ? 'text-green-600'
                          : 'text-red-600'
                  }`}
                >
                  <Star size={14} />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-1 text-xs text-indigo-600 mb-1">
                  {item.type === 'books' && <Book size={14} />}
                  {item.type === 'music' && <Music size={14} />}
                  {item.type === 'games' && <Gamepad2 size={14} />}
                  {item.type === 'movies' && <Film size={14} />}
                  <span className="font-medium">
                    {item.type === 'books' && 'Livre'}
                    {item.type === 'music' && 'Musique'}
                    {item.type === 'games' && 'Jeu Vidéo'}
                    {item.type === 'movies' && 'Film'}
                  </span>
                </div>
                <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500 mb-2">
                  {item.author && `Par ${item.author}`}
                  {item.artist && `Par ${item.artist}`}
                  {item.director && `Par ${item.director}`}
                  {item.platform && `Sur ${item.platform}`}
                </p>
                <div className="flex justify-between items-center">
                  <button className="text-indigo-600 text-sm font-medium">Voir détails</button>
                  <div className="flex items-center space-x-1 text-gray-500 text-xs">
                    <Clock size={14} />
                    <span>Ajouté récemment</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            Voir Plus
          </motion.button>
        </div>

        {data && data.getHelloById ? (
          <p>{data.getHelloById.message} 🔮</p>
        ) : (
          <p>Aucun message de &apos;hello world&apos; trouvé dans la base de données 😢</p>
        )}
      </div>
    </section>
  );
}
