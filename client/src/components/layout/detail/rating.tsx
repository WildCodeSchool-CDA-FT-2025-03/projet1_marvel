import React, { useState } from 'react';

import CommentForm from './CommentForm';
import ConfirmationModal from './ConfirmationModal';
import StarRating from './StarRating';

// Types
interface RatingFormProps {
  onSubmit: (rating: number, comment: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalMessage: string;
  setModalMessage: (message: string) => void;
  modalTitle: string;
  setModalTitle: (title: string) => void;
}

/**
 * Composant RatingForm pour afficher et gérer un formulaire de notation
 *
 * @param onSubmit - Fonction appelée lorsque le formulaire est soumis
 * @param isModalOpen - État d'ouverture de la modal
 * @param setIsModalOpen - Fonction pour changer l'état d'ouverture de la modal
 * @param modalMessage - Message de la modal
 * @param setModalMessage - Fonction pour changer le message de la modal
 * @param modalTitle - Titre de la modal
 * @param setModalTitle - Fonction pour changer le titre de la modal
 */
const RatingForm: React.FC<RatingFormProps> = ({
  onSubmit,
  isModalOpen,
  setIsModalOpen,
  modalMessage,
  setModalMessage,
  modalTitle,
  setModalTitle,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (rating === 0) {
      setModalMessage('Veuillez sélectionner une note.');
      setModalTitle('Attention');
      setIsModalOpen(true);
      return;
    }
    onSubmit(rating, comment);
    setModalMessage(`Merci pour votre avis !\nNote : ${rating}/5\nAvis : ${comment}`);
    setModalTitle('Merci !');
    setIsModalOpen(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-8 p-6 mb-8 bg-white border border-gray-200 rounded-lg shadow-md space-y-6 max-w-lg"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Donnez votre avis</h3>

        <div className="space-y-2">
          <label htmlFor="rating-stars" className="block text-sm font-medium text-gray-700">
            Note :
          </label>
          <StarRating
            rating={rating}
            hoverRating={hoverRating}
            onRatingChange={handleRating}
            onHoverChange={setHoverRating}
          />
        </div>

        <CommentForm comment={comment} onCommentChange={handleCommentChange} />

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-2 inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
            disabled={rating === 0}
          >
            Valider
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={modalTitle}
        message={modalMessage}
      />
    </>
  );
};

export default RatingForm;
