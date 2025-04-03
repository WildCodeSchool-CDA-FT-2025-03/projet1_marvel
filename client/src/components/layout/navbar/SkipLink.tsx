import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SkipLink() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Link
      to="#main-content"
      className={`
        fixed top-2 left-2 z-50 transform transition-transform duration-200 
        bg-indigo-600 text-white font-medium px-4 py-2 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        ${isFocused ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-label="Accès direct au contenu principal"
      role="link"
    >
      Aller au contenu principal
    </Link>
  );
}
