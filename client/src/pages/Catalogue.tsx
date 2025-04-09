import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import {
  Heart,
  Search,
  Star,
  Filter,
  SortAsc,
  SortDesc,
  X,
  Book,
  Music,
  Gamepad2,
  Film,
} from 'lucide-react';

import { categories } from '../utils/categories';
import {
  GET_ALL_BOOKS,
  GET_ALL_GAMES,
  GET_ALL_MOVIES,
  GET_ALL_MUSIC,
} from '../schemas/catalogue.schema';
import {
  Book as BookType,
  Game as GameType,
  Movie as MovieType,
  Music as MusicType,
  CatalogueItem,
  emojis,
} from '../types/catalogue.types';

export default function Catalogue() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [catalogueItems, setCatalogueItems] = useState<CatalogueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: booksData } = useQuery(GET_ALL_BOOKS);
  const { data: gamesData } = useQuery(GET_ALL_GAMES);
  const { data: moviesData } = useQuery(GET_ALL_MOVIES);
  const { data: musicData } = useQuery(GET_ALL_MUSIC);

  useEffect(() => {
    setIsLoading(true);
    const items: CatalogueItem[] = [];

    if (booksData?.getBooks) {
      booksData.getBooks.forEach((book: BookType) => {
        items.push({
          id: book.id,
          type: 'books',
          title: book.titre,
          emoji: emojis.books,
          author: book.auteurs.join(', '),
          rating: Math.floor(Math.random() * 3) + 3,
        });
      });
    }

    if (gamesData?.getGames) {
      gamesData.getGames.forEach((game: GameType) => {
        items.push({
          id: game.id,
          type: 'games',
          title: game.title,
          emoji: emojis.games,
          platform: game.platforms.join(', '),
          rating: Math.floor(Math.random() * 3) + 3,
        });
      });
    }

    if (moviesData?.getMovies) {
      moviesData.getMovies.forEach((movie: MovieType) => {
        items.push({
          id: movie.id,
          type: 'movies',
          title: movie.title,
          emoji: emojis.movies,
          director: movie.directors.join(', '),
          rating: Math.floor(Math.random() * 3) + 3,
        });
      });
    }

    if (musicData?.getMusic) {
      musicData.getMusic.forEach((music: MusicType) => {
        items.push({
          id: music.id,
          type: 'music',
          title: music.title,
          emoji: emojis.music,
          artist: music.artists.join(', '),
          rating: Math.floor(Math.random() * 3) + 3,
        });
      });
    }

    setCatalogueItems(items);
    setIsLoading(false);
  }, [booksData, gamesData, moviesData, musicData]);

  const filteredItems = catalogueItems
    .filter(item => {
      const categoryMatch = activeCategory === 'all' || item.type === activeCategory;

      const searchLower = searchTerm.toLowerCase();
      const titleMatch = item.title.toLowerCase().includes(searchLower);
      const creatorMatch =
        (item.author && item.author.toLowerCase().includes(searchLower)) ||
        (item.artist && item.artist.toLowerCase().includes(searchLower)) ||
        (item.director && item.director.toLowerCase().includes(searchLower)) ||
        (item.platform && item.platform.toLowerCase().includes(searchLower));

      const ratingMatch = item.rating >= ratingFilter;

      return categoryMatch && (titleMatch || creatorMatch) && ratingMatch;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Catalogue</h1>

          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Barre de recherche */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Boutons de tri et filtre */}
            <div className="flex space-x-2">
              <button
                className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                title={sortOrder === 'asc' ? 'Tri descendant' : 'Tri ascendant'}
              >
                {sortOrder === 'asc' ? <SortAsc size={20} /> : <SortDesc size={20} />}
              </button>
              <button
                className={`p-2 border rounded-lg flex items-center justify-center ${isFilterOpen ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                title="Filtres"
              >
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Panneau de filtres */}
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-4 rounded-lg shadow-md mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex-1">
                <h4 className="font-medium text-gray-700 mb-2">Catégories</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${activeCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    onClick={() => setActiveCategory('all')}
                  >
                    Tous
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`px-3 py-1.5 text-sm font-medium rounded-full flex items-center space-x-1 transition-colors ${activeCategory === category.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <category.icon size={14} />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Note minimale</h4>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={ratingFilter}
                    onChange={e => setRatingFilter(parseFloat(e.target.value))}
                    className="w-32 accent-indigo-600"
                  />
                  <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md">
                    <Star size={16} className="text-yellow-500" />
                    <span className="font-medium">{ratingFilter}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Compteur de résultats */}
        <div className="text-sm text-gray-500 mb-6">
          {filteredItems.length} {filteredItems.length > 1 ? 'éléments trouvés' : 'élément trouvé'}
        </div>

        {/* État de chargement */}
        {isLoading ? (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500">Chargement des données en cours...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map(item => (
              <motion.div
                key={`${item.id}-${item.type}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg"
              >
                <Link to={`/item/${item.id}`}>
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
                    <div className="absolute top-2 left-2 bg-white rounded-full px-3 py-1 shadow-sm flex items-center space-x-1 text-yellow-500">
                      <Star size={14} />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
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
                    <button
                      onClick={e => {
                        e.preventDefault();
                        toggleFavorite(item.id);
                      }}
                      className="bg-white rounded-full p-1.5 shadow-sm"
                    >
                      <Heart
                        size={18}
                        className={
                          favorites.includes(item.id)
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-400 hover:text-red-500'
                        }
                      />
                    </button>
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
            ))}
          </motion.div>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500 mb-4">Aucun résultat ne correspond à votre recherche.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
                setRatingFilter(0);
              }}
              className="text-indigo-600 font-medium hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Pagination (simplifiée) */}
        {filteredItems.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center rounded-md shadow-sm">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Précédent
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600">
                1
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50">
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
