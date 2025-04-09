import HeroContainer from './hero/HeroContainer';
import ActionButton from './hero/ActionButton';

export default function HeroHome() {
  return (
    <HeroContainer>
      <h2 className="text-3xl md:text-5xl font-bold mb-4">Votre Bibliothèque Numérique</h2>
      <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
        Découvrez et organisez vos livres, albums, jeux et films préférés dans un seul espace
      </p>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <ActionButton label="Explorer le Catalogue" isPrimary={true} to="/catalogue" />
        <ActionButton label="En Savoir Plus" isPrimary={false} to="/about" />
      </div>
    </HeroContainer>
  );
}
