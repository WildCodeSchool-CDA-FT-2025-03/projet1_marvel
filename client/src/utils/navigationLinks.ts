import { BookOpen, Heart, LucideIcon } from 'lucide-react';

export interface NavigationLink {
  to: string;
  icon: LucideIcon;
  label: string;
}

export const navigationLinks: NavigationLink[] = [
  {
    to: '/catalogue',
    icon: BookOpen,
    label: 'Catalogue',
  },
  {
    to: '/favorite',
    icon: Heart,
    label: 'Favoris',
  },
];
