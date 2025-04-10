import { Search, X } from 'lucide-react';

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="relative">
      <label aria-label="rechercher" className="sr-only">
        <input
          type="text"
          placeholder="Rechercher..."
          className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </label>
      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
