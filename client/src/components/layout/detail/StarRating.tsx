import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  hoverRating: number;
  onRatingChange: (rating: number) => void;
  onHoverChange: (rating: number) => void;
  maxStars?: number;
  size?: number;
  showRatingText?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  hoverRating,
  onRatingChange,
  onHoverChange,
  maxStars = 5,
  size = 24,
  showRatingText = true,
}) => {
  return (
    <div
      className="flex items-center gap-x-1 min-w-[250px]"
      role="group"
      aria-labelledby="rating-stars"
    >
      {Array.from({ length: maxStars }, (_, i) => i + 1).map(star => (
        <button
          type="button"
          key={star}
          aria-label={`Noter ${star} sur ${maxStars} étoiles`}
          className={`p-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-500 rounded-md transition-colors duration-150 ease-in-out ${
            star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-300`}
          onMouseEnter={() => onHoverChange(star)}
          onMouseLeave={() => onHoverChange(0)}
          onClick={() => onRatingChange(star)}
        >
          <Star
            size={size}
            strokeWidth={1.5}
            fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'}
          />
        </button>
      ))}
      {showRatingText && rating > 0 && (
        <span className="ml-3 text-sm text-gray-600 font-medium">
          ({rating}/{maxStars})
        </span>
      )}
    </div>
  );
};

export default StarRating;
