export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HC</span>
              </div>
              <h3 className="text-lg font-bold">Home Center</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Votre bibliothèque numérique personnelle pour organiser et découvrir vos médias
              préférés
            </p>
          </div>
          <div className="md:text-center">
            <h4 className="font-semibold mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <a href="/" className="hover:text-white">
                Accueil
              </a>
              <a href="/" className="hover:text-white">
                Livres
              </a>
              <a href="/" className="hover:text-white">
                Musique
              </a>
              <a href="/" className="hover:text-white">
                Jeux Vidéo
              </a>
              <a href="/" className="hover:text-white">
                Films
              </a>
              <a href="/" className="hover:text-white">
                Mon Profil
              </a>
            </div>
          </div>
          <div className="md:text-right">
            <h4 className="font-semibold mb-4">À Propos</h4>
            <div className="flex flex-col space-y-2 text-sm text-gray-300">
              <a href="/" className="hover:text-white">
                Projet Wild Code School
              </a>
              <a href="/" className="hover:text-white">
                L&apos;Équipe
              </a>
              <a href="/" className="hover:text-white">
                Contactez-nous
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400 text-center">
          <p>© 2025 Home Center - Projet Wild Code School - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
