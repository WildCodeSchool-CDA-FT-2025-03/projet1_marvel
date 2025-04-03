import { categories } from '../../../utils/categories';
import FooterLink from './FooterLink';

export default function FooterNav() {
  return (
    <nav aria-labelledby="footer-navigation" className="md:text-right">
      <h2 id="footer-navigation" className="font-semibold mb-4">
        Navigation
      </h2>
      <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300" aria-label="Pages principales">
        <FooterLink to="/" ariaLabel="Accéder à la page d'accueil">
          Accueil
        </FooterLink>
        {categories.map(category => (
          <FooterLink
            key={category.id}
            to={`/catalogue?type=${category.id}`}
            ariaLabel={`Accéder au catalogue de ${category.name}`}
          >
            {category.name}
          </FooterLink>
        ))}
        <FooterLink to="/favorite" ariaLabel="Accéder à mes médias favoris">
          Mes Favoris
        </FooterLink>
        <FooterLink to="/create/media" ariaLabel="Ajouter un nouveau média">
          Ajouter un média
        </FooterLink>
      </ul>
    </nav>
  );
}
