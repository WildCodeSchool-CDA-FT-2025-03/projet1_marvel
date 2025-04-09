import React from 'react';
import RatingForm from './detail/rating'; // Importation du composant de formulaire

// Exemple de fonction pour gérer la soumission du formulaire
const handleRatingSubmit = (rating: number, comment: string) => {
  console.warn('Note soumise :', rating);
  console.warn('Avis soumis :', comment);
  // Ici, vous intégreriez la logique pour envoyer ces données
  // à votre backend (par exemple, via une requête API)
  alert(`Merci pour votre avis !\nNote : ${rating}/5\nAvis : ${comment}`);
};

interface DetailComponentProps {
  itemTitle?: string;
}

const DetailComponent: React.FC<DetailComponentProps> = ({
  itemTitle = 'Titre de l&apos;item par défaut',
}) => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center my-4">Détails de : {itemTitle}</h2>
      <p className="text-center mb-6">Autres informations sur l&apos;item...</p>

      <div className="flex justify-center">
        <RatingForm onSubmit={handleRatingSubmit} />
      </div>
    </div>
  );
};

export default DetailComponent;
