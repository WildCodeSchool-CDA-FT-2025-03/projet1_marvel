import { ReactNode } from 'react';

interface SuggestionItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function SuggestionItem({ icon, title, description }: SuggestionItemProps) {
  return (
    <li className="flex items-start">
      <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 mr-4" aria-hidden="true">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </li>
  );
}
