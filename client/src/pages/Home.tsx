import { Carousel } from '../components/layout/carousel/Carousel';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Bienvenue sur la Page d&apos;Accueil</h1>

      {/* Section Carrousel */}
      <section aria-labelledby="carousel-heading" className="mb-12">
        {/* Appel simple du composant, qui utilisera ses images par défaut */}
        <Carousel />
      </section>
    </div>
  );
}
