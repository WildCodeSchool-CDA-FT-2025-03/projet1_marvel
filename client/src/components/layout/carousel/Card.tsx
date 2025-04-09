import React from 'react';

const BASE_IMAGE_URL = 'https://lorempicture.point-sys.com/400/300/tech/';
const MAX_RANDOM_ID = 30;

export type CardProps = {
  title: string;
  subtitle: string;
  imageUrl?: string;
};

const generateRandomImageUrl = () => {
  const randomId = Math.floor(Math.random() * MAX_RANDOM_ID) + 1;
  return `${BASE_IMAGE_URL}${randomId}`;
};

const Card: React.FC<CardProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-md flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px] select-none">
      <img
        src={imageUrl || generateRandomImageUrl()}
        alt={title}
        className="w-full h-40 sm:h-48 object-cover pointer-events-none"
        draggable="false"
      />
      <div className="content p-4 sm:p-6 pointer-events-none">
        <h1 className="text-white text-base sm:text-lg font-bold mb-1 line-clamp-1">{title}</h1>
        <h3 className="text-gray-400 text-xs sm:text-sm font-light line-clamp-1">{subtitle}</h3>
      </div>
    </div>
  );
};

export default Card;
