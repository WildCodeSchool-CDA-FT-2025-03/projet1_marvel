import { AnimatePresence, PanInfo, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

import Card from './Card';

type CardData = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string | undefined;
};

const sampleCards: CardData[][] = [
  // Films
  [
    {
      id: 1,
      title: 'Inception',
      subtitle: 'Science-Fiction',
      imageUrl: 'https://picsum.photos/seed/inception/300/400',
    },
    {
      id: 2,
      title: 'The Godfather',
      subtitle: 'Crime Drama',
      imageUrl: 'https://picsum.photos/seed/godfather/300/400',
    },
    {
      id: 3,
      title: 'Pulp Fiction',
      subtitle: 'Crime/Thriller',
      imageUrl: 'https://picsum.photos/seed/pulpfiction/300/400',
    },
  ],
  // Livres
  [
    {
      id: 4,
      title: '1984',
      subtitle: 'George Orwell',
      imageUrl: 'https://picsum.photos/seed/1984book/300/400',
    },
    {
      id: 5,
      title: 'Le Petit Prince',
      subtitle: 'Antoine de Saint-Exupéry',
      imageUrl: 'https://picsum.photos/seed/petitprince/300/400',
    },
    {
      id: 6,
      title: 'Harry Potter',
      subtitle: 'J.K. Rowling',
      imageUrl: 'https://picsum.photos/seed/harrypotter/300/400',
    },
  ],
  // Musique
  [
    {
      id: 7,
      title: 'Thriller',
      subtitle: 'Michael Jackson',
      imageUrl: 'https://picsum.photos/seed/thriller/300/400',
    },
    {
      id: 8,
      title: 'Dark Side of the Moon',
      subtitle: 'Pink Floyd',
      imageUrl: 'https://picsum.photos/seed/pinkfloyd/300/400',
    },
    {
      id: 9,
      title: 'Abbey Road',
      subtitle: 'The Beatles',
      imageUrl: 'https://picsum.photos/seed/beatles/300/400',
    },
  ],
  // Jeux
  [
    {
      id: 10,
      title: 'The Legend of Zelda',
      subtitle: 'Action-Adventure',
      imageUrl: 'https://picsum.photos/seed/zelda/300/400',
    },
    {
      id: 11,
      title: 'Red Dead Redemption 2',
      subtitle: 'Action/Western',
      imageUrl: 'https://picsum.photos/seed/rdr2/300/400',
    },
    {
      id: 12,
      title: 'The Witcher 3',
      subtitle: 'RPG',
      imageUrl: 'https://picsum.photos/seed/witcher3/300/400',
    },
  ],
];

const CARDS_PER_PAGE = 3;
const CARD_GAP = 12;
const CARD_WIDTH = 320;
const GROUP_WIDTH = CARD_WIDTH * CARDS_PER_PAGE + CARD_GAP * (CARDS_PER_PAGE - 1);

// Animation de transition
const swipeTransition = {
  x: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    duration: 0.7,
  },
  opacity: { duration: 0.2 },
};

const THEMES = ['Films', 'Livres', 'Musique', 'Jeux'];

export const Carousel: React.FC = () => {
  const [page, setPage] = useState(0);
  const swipeConfidenceThreshold = 10000;

  const getIndex = (direction: number) => {
    const size = sampleCards.length;
    const newIndex = page + direction;
    return ((newIndex % size) + size) % size;
  };

  // Fonction pour changer de page
  const paginate = (newDirection: number) => {
    setPage(getIndex(newDirection));
  };

  // Fonction pour aller à une page spécifique
  const goToPage = (newPage: number) => {
    if (newPage >= 0 && newPage < sampleCards.length) {
      setPage(newPage);
    }
  };

  // Gestion du drag
  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) => {
    const swipePower = Math.abs(offset.x) * velocity.x;
    if (swipePower < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipePower > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  // Définition des variantes pour l'animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? GROUP_WIDTH + CARD_GAP : -(GROUP_WIDTH + CARD_GAP),
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? GROUP_WIDTH + CARD_GAP : -(GROUP_WIDTH + CARD_GAP),
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col items-center py-4 sm:py-8 bg-gray-50">
      <div className="relative" style={{ width: `${GROUP_WIDTH + 120}px` }}>
        {/* Boutons de navigation en dehors du conteneur avec overflow */}
        <button
          onClick={() => paginate(-1)}
          className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 text-gray-800 rounded-full p-3 hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-opacity-75 z-20 shadow-lg"
          aria-label="Précédent"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 text-gray-800 rounded-full p-3 hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-opacity-75 z-20 shadow-lg"
          aria-label="Suivant"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Conteneur avec overflow hidden */}
        <div className="relative overflow-hidden mx-auto" style={{ height: '350px' }}>
          <div
            className="absolute inset-0"
            style={{ width: GROUP_WIDTH, left: '50%', transform: 'translateX(-50%)' }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={page}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={swipeTransition}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 flex items-center"
              >
                <div
                  className="absolute flex gap-3"
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {[-1, 0, 1].map(index => {
                    return sampleCards[getIndex(index)].map(card => (
                      <Card
                        key={card.id}
                        title={card.title}
                        subtitle={card.subtitle}
                        imageUrl={card.imageUrl}
                      />
                    ));
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation par thèmes */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-6 px-4">
        {THEMES.map((theme, i) => (
          <button
            key={theme}
            onClick={() => goToPage(i)}
            className={`px-3 py-1.5 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-opacity-75 text-sm sm:text-base ${
              page === i
                ? 'bg-gray-800 text-white font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-label={`Aller à la section ${theme}`}
            aria-current={page === i ? 'page' : undefined}
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
