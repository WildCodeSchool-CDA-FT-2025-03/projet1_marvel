import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Book,
  Music,
  Gamepad2,
  Film,
  Heart,
  Star,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  List,
  Calendar,
} from 'lucide-react';
import { useQuery, gql } from '@apollo/client';
import { emojis } from '../types/catalogue.type';

const GET_BOOK_BY_ID = gql`
  query GetBookById($id: Float!) {
    getBookById(id: $id) {
      id
      titre
      auteurs
      editeur
      date_publication
      format
      genre
      resume
      mots_cles
      public_cible
      serie
    }
  }
`;

const GET_GAME_BY_ID = gql`
  query GetGameById($id: Float!) {
    getGameById(id: $id) {
      id
      title
      subtitle
      developers
      publishers
      release_date
      format
      platforms
      duration
      category
      summary
      keywords
      targeted_audience
      original_language
      series
      awards
      game_modes
      game_engine
      pegi_esrb_rating
      gameplay_mechanics
    }
  }
`;

const GET_MOVIE_BY_ID = gql`
  query GetMovieById($id: Float!) {
    getMovieById(id: $id) {
      id
      title
      subtitle
      directors
      writers
      producers
      studios
      release_date
      format
      duration
      category
      summary
      keywords
      targeted_audience
      original_language
      series
      awards
      actors
    }
  }
`;

const GET_MUSIC_BY_ID = gql`
  query GetMusicById($id: Float!) {
    getMusicById(id: $id) {
      id
      title
      artists
      producers
      label
      release_date
      format
      duration
      category
      summary
      keywords
      targeted_audience
      original_language
      series
      awards
      composers
      lyricists
      recording_studio
      certifications
      tracklist {
        id
        title
        duration
      }
    }
  }
`;

export default function Item() {
  const { type, id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [activeTab, setActiveTab] = useState('details');

  const getQueryForType = () => {
    switch (type) {
      case 'books':
        return GET_BOOK_BY_ID;
      case 'games':
        return GET_GAME_BY_ID;
      case 'movies':
        return GET_MOVIE_BY_ID;
      case 'music':
        return GET_MUSIC_BY_ID;
      default:
        return GET_BOOK_BY_ID;
    }
  };

  const { loading, error, data } = useQuery(getQueryForType(), {
    variables: { id: Number(id) },
  });

  console.log(data);

  const getItemData = () => {
    if (!data) return null;

    console.log(type);

    switch (type) {
      case 'books':
        return data.getBookById;
      case 'games':
        return data.getGameById;
      case 'movies':
        return data.getMovieById;
      case 'music':
        return data.getMusicById;
      default:
        return null;
    }
  };

  const item = getItemData();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="text-2xl font-bold mb-4">Item non trouvé</div>
        <Link to="/catalogue" className="text-indigo-600 hover:underline">
          Retourner au catalogue
        </Link>
      </div>
    );
  }

  const getTypeIcon = () => {
    switch (type) {
      case 'books':
        return <Book className="mr-1" size={18} />;
      case 'music':
        return <Music className="mr-1" size={18} />;
      case 'games':
        return <Gamepad2 className="mr-1" size={18} />;
      case 'movies':
        return <Film className="mr-1" size={18} />;
      default:
        return null;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'books':
        return 'Livre';
      case 'music':
        return 'Album';
      case 'games':
        return 'Jeu Vidéo';
      case 'movies':
        return 'Film';
      default:
        return '';
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'books':
        return 'bg-blue-50';
      case 'music':
        return 'bg-purple-50';
      case 'games':
        return 'bg-green-50';
      case 'movies':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'books':
        return 'text-blue-600';
      case 'music':
        return 'text-purple-600';
      case 'games':
        return 'text-green-600';
      case 'movies':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'books':
        return 'border-blue-200';
      case 'music':
        return 'border-purple-200';
      case 'games':
        return 'border-green-200';
      case 'movies':
        return 'border-red-200';
      default:
        return 'border-gray-200';
    }
  };

  const getCreatorLabel = () => {
    switch (type) {
      case 'books':
        return item.auteurs ? `Par ${item.auteurs.join(', ')}` : null;
      case 'music':
        return item.artists ? `Par ${item.artists.join(', ')}` : null;
      case 'games':
        return item.developers ? `Développé par ${item.developers.join(', ')}` : null;
      case 'movies':
        return item.directors ? `Réalisé par ${item.directors.join(', ')}` : null;
      default:
        return null;
    }
  };

  const getItemTitle = () => {
    if (type === 'books') {
      return item.titre;
    }
    return item.title;
  };

  const getItemSummary = () => {
    if (type === 'books') {
      return item.resume;
    }
    return item.summary;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">À propos</h3>
              <p className="text-gray-600">{getItemSummary()}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Caractéristiques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.release_date && (
                  <div className="flex items-start">
                    <Calendar size={18} className="mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Date de sortie</p>
                      <p>{new Date(item.release_date).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                )}

                {(item.category || item.genre) && (
                  <div className="flex items-start">
                    <List size={18} className="mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Catégorie</p>
                      <p>{item.category || item.genre}</p>
                    </div>
                  </div>
                )}

                {(item.publisher || item.editeur) && (
                  <div className="flex items-start">
                    <Book size={18} className="mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Éditeur</p>
                      <p>{item.publisher || item.editeur}</p>
                    </div>
                  </div>
                )}

                {item.label && (
                  <div className="flex items-start">
                    <Music size={18} className="mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Label</p>
                      <p>{item.label}</p>
                    </div>
                  </div>
                )}

                {item.studios && (
                  <div className="flex items-start">
                    <Film size={18} className="mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Studios</p>
                      <p>{Array.isArray(item.studios) ? item.studios.join(', ') : item.studios}</p>
                    </div>
                  </div>
                )}

                {item.platforms && (
                  <div className="flex items-start">
                    <Gamepad2 size={18} className="mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Plateforme</p>
                      <p>
                        {Array.isArray(item.platforms) ? item.platforms.join(', ') : item.platforms}
                      </p>
                    </div>
                  </div>
                )}

                {item.pages && (
                  <div className="flex items-start">
                    <Book size={18} className="mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Nombre de pages</p>
                      <p>{item.pages}</p>
                    </div>
                  </div>
                )}

                {item.duration && (
                  <div className="flex items-start">
                    <Clock size={18} className="mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Durée</p>
                      <p>
                        {typeof item.duration === 'number'
                          ? `${item.duration} minutes`
                          : item.duration}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mots-clés */}
            {item.keywords && item.keywords.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Mots-clés</h3>
                <div className="flex flex-wrap gap-2">
                  {item.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-sm rounded-full ${getBgColor()} ${getTextColor()} border ${getBorderColor()}`}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Récompenses */}
            {item.awards && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Récompenses</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {Array.isArray(item.awards) ? (
                    item.awards.map((award, index) => <li key={index}>{award}</li>)
                  ) : (
                    <li>{item.awards}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        );

      case 'related':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Vous pourriez également aimer</h3>
            <div className="text-center text-gray-500 py-8">
              Les éléments similaires seront bientôt disponibles.
            </div>
          </div>
        );

      case 'comments':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Commentaires</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <textarea
                placeholder="Partagez votre avis sur cet item..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                rows={3}
              ></textarea>
              <div className="flex justify-end mt-2">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  Publier
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-500 text-center italic">
                Aucun commentaire pour le moment. Soyez le premier à donner votre avis !
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Contenu spécifique selon le type
  const renderTypeSpecificContent = () => {
    switch (type) {
      case 'music':
        return (
          item.tracklist && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Liste des pistes</h3>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {item.tracklist.map((track, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <div className="flex items-center">
                      <span className="w-8 text-center text-gray-500 font-medium">{index + 1}</span>
                      <span className="font-medium">{track.title}</span>
                    </div>
                    <span className="text-gray-500">{track.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        );

      case 'movies':
        return (
          item.actors && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Distribution principale</h3>
              <div className="flex flex-wrap gap-2">
                {item.actors.map((actor, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white text-gray-700 rounded-full border border-gray-200"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          )
        );

      default:
        return null;
    }
  };

  const RatingStars = () => {
    const stars = [1, 2, 3, 4, 5];

    return (
      <div className="flex space-x-1">
        {stars.map(star => (
          <Star
            key={star}
            size={24}
            onClick={() => setUserRating(star)}
            className={`cursor-pointer ${
              star <= userRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            } hover:text-yellow-500`}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Barre de navigation */}
        <nav className="mb-6">
          <Link
            to="/catalogue"
            className="inline-flex items-center text-indigo-600 hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" /> Retour au catalogue
          </Link>
        </nav>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* En-tête de l'item */}
          <div className={`${getBgColor()} px-6 py-8`}>
            <div className="flex flex-col md:flex-row">
              {/* Visuel */}
              <div className="flex justify-center md:justify-start mb-6 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-64 w-64 flex items-center justify-center bg-white rounded-lg shadow-lg"
                >
                  <span className="text-9xl">{emojis[type]}</span>
                </motion.div>
              </div>

              {/* Informations principales */}
              <div className="md:ml-8 flex-1">
                <div className="flex items-center mb-2">
                  <div className={`flex items-center ${getTextColor()} text-sm font-medium`}>
                    {getTypeIcon()}
                    <span>{getTypeLabel()}</span>
                  </div>
                </div>

                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-3xl font-bold mb-2"
                >
                  {getItemTitle()}
                </motion.h1>

                {item.subtitle && <p className="text-lg text-gray-600 mb-3">{item.subtitle}</p>}

                <p className="text-lg mb-4">{getCreatorLabel()}</p>

                <div className="flex items-center mb-6">
                  <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm mr-4">
                    <Star size={18} className="text-yellow-500 mr-1" />
                    <span className="font-semibold">4.5</span>
                  </div>

                  <div className="text-sm text-gray-600">
                    {item.format && (
                      <span className="mr-3">
                        {Array.isArray(item.format) ? item.format.join(', ') : item.format}
                      </span>
                    )}
                    {item.release_date && <span>{new Date(item.release_date).getFullYear()}</span>}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                      isFavorite
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    <Heart size={18} className={`mr-1.5 ${isFavorite ? 'fill-red-500' : ''}`} />
                    {isFavorite ? 'Favori' : 'Ajouter aux favoris'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium border border-gray-200 hover:bg-gray-200"
                  >
                    <Share2 size={18} className="mr-1.5" />
                    Partager
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium border border-gray-200 hover:bg-gray-200"
                  >
                    <Bookmark size={18} className="mr-1.5" />
                    Ajouter à une liste
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Votre note */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-3 sm:mb-0">
                <h3 className="text-lg font-medium">Votre évaluation</h3>
              </div>
              <div className="flex items-center">
                <RatingStars />
                {userRating > 0 && (
                  <button
                    onClick={() => setUserRating(0)}
                    className="ml-3 text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Effacer
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation par onglets */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-2 rounded-md font-medium whitespace-nowrap ${
                  activeTab === 'details'
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Détails
              </button>
              <button
                onClick={() => setActiveTab('related')}
                className={`px-4 py-2 rounded-md font-medium whitespace-nowrap ${
                  activeTab === 'related'
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Similaires
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`px-4 py-2 rounded-md font-medium whitespace-nowrap ${
                  activeTab === 'comments'
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Commentaires
              </button>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="px-6 py-6">
            {renderTabContent()}
            {renderTypeSpecificContent()}
          </div>
        </div>
      </div>
    </main>
  );
}
