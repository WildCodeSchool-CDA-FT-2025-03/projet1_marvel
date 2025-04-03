import { categories } from '../../../utils/categories';
import FooterLink from './FooterLink';

export default function FooterNav() {
  return (
    <nav aria-labelledby="footer-navigation" className="md:text-right">
      <h2 id="footer-navigation" className="font-semibold mb-4">
        Navigation
      </h2>
      <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300" aria-label="Pages principales">
        <li>
          <FooterLink to="/" ariaLabel="Accéder à la page d'accueil">
            Accueil
          </FooterLink>
        </li>
        {categories.map(category => (
          <li key={category.id}>
            <FooterLink
              to={`/catalogue?type=${category.id}`}
              ariaLabel={`Accéder au catalogue de ${category.name}`}
            >
              {category.name}
            </FooterLink>
          </li>
        ))}
        <li>
          <FooterLink to="/favorite" ariaLabel="Accéder à mes médias favoris">
            Mes Favoris
          </FooterLink>
        </li>
        <li>
          <FooterLink to="/create/media" ariaLabel="Ajouter un nouveau média">
            Ajouter un média
          </FooterLink>
        </li>
      </ul>
    </nav>
  );
}
