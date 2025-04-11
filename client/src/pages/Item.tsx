import { useParams, Link } from 'react-router-dom';
import { Book, Music, Gamepad2, Film, ArrowLeft, List, Calendar, Clock } from 'lucide-react';
import { useQuery } from '@apollo/client';
import {
  GET_BOOK_BY_ID,
  GET_GAME_BY_ID,
  GET_MOVIE_BY_ID,
  GET_MUSIC_BY_ID,
} from '../schemas/catalogue.schema';

export default function Item() {
  const { type, id } = useParams();

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

  const query = getQueryForType();

  const { loading, error, data } = useQuery(query, {
    variables: { id: Number(id) },
    skip: !query,
  });

  const getItemData = () => {
    if (!data) return null;
    if (!type) return null;

    const dataMapping = {
      books: {
        data: data.getBookById,
        icon: <Book className="mr-1" size={18} />,
        label: 'Livre',
        bgColor: 'bg-blue-50',
        getTitle: () => data.getBookById.titre,
        getSummary: () => data.getBookById.resume,
        getCreator: () =>
          data.getBookById.auteurs ? `Par ${data.getBookById.auteurs.join(', ')}` : null,
        emoji: '📚',
      },
      games: {
        data: data.getGameById,
        icon: <Gamepad2 className="mr-1" size={18} />,
        label: 'Jeu Vidéo',
        bgColor: 'bg-green-50',
        getTitle: () => data.getGameById.title,
        getSummary: () => data.getGameById.summary,
        getCreator: () =>
          data.getGameById.developers
            ? `Développé par ${data.getGameById.developers.join(', ')}`
            : null,
        emoji: '🎮',
      },
      movies: {
        data: data.getMovieById,
        icon: <Film className="mr-1" size={18} />,
        label: 'Film',
        bgColor: 'bg-red-50',
        getTitle: () => data.getMovieById.title,
        getSummary: () => data.getMovieById.summary,
        getCreator: () =>
          data.getMovieById.directors
            ? `Réalisé par ${data.getMovieById.directors.join(', ')}`
            : null,
        emoji: '🎬',
      },
      music: {
        data: data.getOneMusicById,
        icon: <Music className="mr-1" size={18} />,
        label: 'Album',
        bgColor: 'bg-purple-50',
        getTitle: () => data.getOneMusicById.title,
        getSummary: () => data.getOneMusicById.summary,
        getCreator: () =>
          data.getOneMusicById.artists ? `Par ${data.getOneMusicById.artists.join(', ')}` : null,
        emoji: '🎵',
      },
    };

    const validTypes = ['books', 'games', 'movies', 'music'] as const;
    type ValidType = (typeof validTypes)[number];

    return type && validTypes.includes(type as ValidType) ? dataMapping[type as ValidType] : null;
  };

  const itemInfo = getItemData();
  const item = itemInfo?.data;

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

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <nav className="mb-6">
          <Link
            to="/catalogue"
            className="inline-flex items-center text-indigo-600 hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" /> Retour au catalogue
          </Link>
        </nav>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <header className={`${itemInfo.bgColor} px-6 py-8`}>
            <div className="flex flex-col md:flex-row">
              <section className="flex justify-center md:justify-start mb-6 md:mb-0">
                <div className="relative h-64 w-64 flex items-center justify-center bg-white rounded-lg shadow-lg">
                  <span className="text-9xl">{itemInfo.emoji}</span>
                </div>
              </section>

              <section className="md:ml-8 flex-1">
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-sm font-medium">
                    {itemInfo.icon}
                    <span>{itemInfo.label}</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold mb-2">{itemInfo.getTitle()}</h1>

                {item.subtitle && <p className="text-lg text-gray-600 mb-3">{item.subtitle}</p>}

                <p className="text-lg mb-4">{itemInfo.getCreator()}</p>

                <p className="text-sm text-gray-600 mb-6">
                  {item.format && (
                    <span className="mr-3">
                      {Array.isArray(item.format) ? item.format.join(', ') : item.format}
                    </span>
                  )}
                  {item.release_date && <span>{new Date(item.release_date).getFullYear()}</span>}
                </p>
              </section>
            </div>
          </header>

          <section className="px-6 py-6">
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-2">À propos</h3>
                <p className="text-gray-600">{itemInfo.getSummary()}</p>
              </section>

              <section>
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
              </section>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
