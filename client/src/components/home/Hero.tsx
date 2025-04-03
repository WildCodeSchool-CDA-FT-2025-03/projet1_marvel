import HeroTitle from './hero/HeroTitle';
import HeroContainer from './hero/HeroContainer';
import ActionButtonsGroup from './hero/ActionButtonsGroup';

export default function HeroHome() {
  return (
    <HeroContainer>
      <HeroTitle
        title="Votre Bibliothèque Numérique"
        subtitle="Découvrez et organisez vos livres, albums, jeux et films préférés dans un seul espace"
      />
      <ActionButtonsGroup
        primaryButtonLabel="Explorer le Catalogue"
        secondaryButtonLabel="En Savoir Plus"
        primaryButtonLink="/catalogue"
        secondaryButtonLink="/about"
      />
    </HeroContainer>
  );
}
