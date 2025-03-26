import { motion } from 'framer-motion';
import { User, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

import { categories } from '../../utils/categories';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2"
        >
          <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">HC</span>
          </div>
          <h1 className="text-xl font-bold text-indigo-600">Home Center</h1>
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-4">
            {categories.map(category => (
              <motion.a
                key={category.id}
                href={`#${category.id}`}
                className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                whileHover={{ scale: 1.05 }}
              >
                <category.icon size={18} />
                <span>{category.name}</span>
              </motion.a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <button className="p-2 text-gray-600 hover:text-indigo-600">
              <User size={20} />
            </button>
          </div>
        </div>

        <div className="md:hidden">
          <button className="p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white shadow-lg py-4"
        >
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <div className="pb-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-9 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            {categories.map(category => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <category.icon size={20} />
                <span>{category.name}</span>
              </a>
            ))}
            <a
              href="#profile"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 py-2"
            >
              <User size={20} />
              <span>Mon Profil</span>
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
