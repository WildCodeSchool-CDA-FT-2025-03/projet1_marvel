import { Link } from 'react-router-dom';

interface FooterLinkProps {
  to: string;
  ariaLabel: string;
  children: React.ReactNode;
}

export default function FooterLink({ to, ariaLabel, children }: FooterLinkProps) {
  return (
    <Link to={to} className="hover:text-white" aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
