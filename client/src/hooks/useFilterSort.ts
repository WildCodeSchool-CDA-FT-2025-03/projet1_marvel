import { useState, useMemo } from 'react';
import { CatalogueItem } from '../types/catalogue.type';

interface UseFilterSortProps {
  catalogueItems: CatalogueItem[];
}

export default function useFilterSort({ catalogueItems }: UseFilterSortProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeCategory, setActiveCategory] = useState('all');
  const [ratingFilter, setRatingFilter] = useState(0);

  const filteredItems = useMemo(() => {
    return catalogueItems
      .filter(item => {
        const categoryMatch = activeCategory === 'all' || item.type === activeCategory;

        const searchLower = searchTerm.toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(searchLower);
        const creatorMatch =
          (item.author && item.author.toLowerCase().includes(searchLower)) ||
          (item.artist && item.artist.toLowerCase().includes(searchLower)) ||
          (item.director && item.director.toLowerCase().includes(searchLower)) ||
          (item.platform && item.platform.toLowerCase().includes(searchLower));

        const ratingMatch = item.rating >= ratingFilter;

        return categoryMatch && (titleMatch || creatorMatch) && ratingMatch;
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
  }, [catalogueItems, searchTerm, activeCategory, ratingFilter, sortOrder]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    activeCategory,
    setActiveCategory,
    ratingFilter,
    setRatingFilter,
    sortOrder,
    setSortOrder,
  };
}
