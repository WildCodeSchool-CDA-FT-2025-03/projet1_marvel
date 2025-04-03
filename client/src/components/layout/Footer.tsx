import FooterAbout from './footer/FooterAbout';
import FooterNav from './footer/FooterNav';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FooterAbout />

          <FooterNav />
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-sm text-gray-400 text-center" aria-label="Informations de copyright">
            © {currentYear} Home Center - Projet Wild Code School - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
