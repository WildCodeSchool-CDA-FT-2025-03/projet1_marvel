import React, { useState } from 'react';

import { Star } from 'lucide-react';

interface RatingFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

const RatingForm: React.FC<RatingFormProps> = ({ onSubmit }) => {
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
      alert('Veuillez sélectionner une note.');
      return;
    }
    onSubmit(rating, comment);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 p-6 mb-8 bg-white border border-gray-200 rounded-lg shadow-md space-y-6 max-w-lg"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Donnez votre avis</h3>

      <div className="space-y-2">
        <label htmlFor="rating-stars" className="block text-sm font-medium text-gray-700">
          Note :
        </label>
        <div
          id="rating-stars"
          className="flex items-center gap-x-1 min-w-[250px]"
          role="group"
          aria-labelledby="rating-stars"
        >
          {[1, 2, 3, 4, 5].map(star => (
            <button
              type="button"
              key={star}
              aria-label={`Noter ${star} sur 5 étoiles`}
              className={`p-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-500 rounded-md transition-colors duration-150 ease-in-out ${
                star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'
              } hover:text-yellow-300`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRating(star)}
            >
              <Star
                size={24}
                strokeWidth={1.5}
                fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-3 text-sm text-gray-600 font-medium">({rating}/5)</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Avis :
        </label>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Écrivez votre avis ici..."
          rows={4}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
        />
      </div>

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
  );
};

export default RatingForm;
