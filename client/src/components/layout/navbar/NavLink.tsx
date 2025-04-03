import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  className?: string;
  onClick?: () => void;
  iconSize?: number;
}

export default function NavLink({
  to,
  icon: Icon,
  label,
  className = 'flex items-center space-x-2 text-gray-600 hover:text-indigo-600',
  onClick,
  iconSize = 18,
}: NavLinkProps) {
  return (
    <Link to={to} className={className} onClick={onClick}>
      <Icon size={iconSize} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
