import React, { useState } from 'react';

import RatingForm from './detail/rating';

interface DetailComponentProps {
  itemTitle?: string;
}

const DetailComponent: React.FC<DetailComponentProps> = ({
  itemTitle = 'Titre de l&apos;item par défaut',
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');

  const handleRatingSubmit = (rating: number, comment: string) => {
    // Ici, vous intégreriez la logique pour envoyer ces données
    // à votre backend (par exemple, via une requête API)
    setModalTitle('Merci !');
    setModalMessage(`Merci pour votre avis !\nNote : ${rating}/5\nAvis : ${comment}`);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center my-4">Détails de : {itemTitle}</h2>
      <p className="text-center mb-6">Autres informations sur l&apos;item...</p>

      <div className="flex justify-center">
        <RatingForm
          onSubmit={handleRatingSubmit}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalMessage={modalMessage}
          setModalMessage={setModalMessage}
          modalTitle={modalTitle}
          setModalTitle={setModalTitle}
        />
      </div>
    </div>
  );
};

export default DetailComponent;
