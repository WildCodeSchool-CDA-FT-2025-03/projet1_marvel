import { useState, useMemo } from 'react';
import { CatalogueItem } from '../types/catalogue.type';

type UseFilterSortProps = {
  catalogueItems: CatalogueItem[];
};

export default function useFilterSort({ catalogueItems }: UseFilterSortProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    return catalogueItems.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = item.title.toLowerCase().includes(searchLower);
      const creatorMatch =
        (item.author && item.author.toLowerCase().includes(searchLower)) ||
        (item.artist && item.artist.toLowerCase().includes(searchLower)) ||
        (item.director && item.director.toLowerCase().includes(searchLower)) ||
        (item.platform && item.platform.toLowerCase().includes(searchLower));

      return titleMatch || creatorMatch;
    });
  }, [catalogueItems, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}
