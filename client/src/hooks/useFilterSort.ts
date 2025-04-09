import { useState, useMemo } from 'react';
import { CatalogueItem } from '../types/catalogue.types';

interface UseFilterSortProps {
  catalogueItems: CatalogueItem[];
}

export default function useFilterSort({ catalogueItems }: UseFilterSortProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [ratingFilter, setRatingFilter] = useState(0);

  const filteredItems = useMemo(() => {
    return catalogueItems
      .filter(item => {
        // Filtre par catégorie
        const categoryMatch = activeCategory === 'all' || item.type === activeCategory;

        // Filtre par recherche (dans le titre, auteur, artiste, réalisateur)
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(searchLower);
        const creatorMatch =
          (item.author && item.author.toLowerCase().includes(searchLower)) ||
          (item.artist && item.artist.toLowerCase().includes(searchLower)) ||
          (item.director && item.director.toLowerCase().includes(searchLower)) ||
          (item.platform && item.platform.toLowerCase().includes(searchLower));

        // Filtre par note minimale
        const ratingMatch = item.rating >= ratingFilter;

        return categoryMatch && (titleMatch || creatorMatch) && ratingMatch;
      })
      .sort((a, b) => {
        // Tri par titre
        if (sortOrder === 'asc') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
  }, [catalogueItems, activeCategory, searchTerm, sortOrder, ratingFilter]);

  return {
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    ratingFilter,
    setRatingFilter,
    filteredItems,
  };
}
