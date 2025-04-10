import { Minus, Plus, Users } from 'lucide-react';
import { addArrayItem, handleArrayInput, removeArrayItem } from '../../form.utils';

import { MovieFormData } from '../../movie.types';

type TeamSectionProps = {
  formData: MovieFormData;
  setFormData: React.Dispatch<React.SetStateAction<MovieFormData>>;
};

export default function TeamSection({ formData, setFormData }: TeamSectionProps) {
  return (
    <fieldset className="space-y-4 p-4 border border-gray-200 rounded-lg">
      <legend className="text-lg font-semibold text-gray-700 px-2 flex items-center gap-2">
        <Users className="w-5 h-5 text-blue-600" />
        Équipe
      </legend>

      <div>
        <label htmlFor="directors" className="text-sm font-medium text-gray-700 mb-1">
          Réalisateurs
        </label>
        {formData.directors.map((director, index) => (
          <div key={`director-${index}`} className="flex gap-2 mb-2">
            <input
              type="text"
              value={director}
              onChange={e => handleArrayInput(formData, setFormData, 'directors', index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label={`Réalisateur ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeArrayItem(formData, setFormData, 'directors', index)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label={`Supprimer le réalisateur ${index + 1}`}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(formData, setFormData, 'directors')}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un réalisateur
        </button>
      </div>

      <div>
        <label htmlFor="writers" className="text-sm font-medium text-gray-700 mb-1">
          Scénaristes
        </label>
        {formData.writers.map((writer, index) => (
          <div key={`writer-${index}`} className="flex gap-2 mb-2">
            <input
              type="text"
              value={writer}
              onChange={e => handleArrayInput(formData, setFormData, 'writers', index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label={`Scénariste ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeArrayItem(formData, setFormData, 'writers', index)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label={`Supprimer le scénariste ${index + 1}`}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(formData, setFormData, 'writers')}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un scénariste
        </button>
      </div>

      <div>
        <label htmlFor="producers" className="text-sm font-medium text-gray-700 mb-1">
          Producteurs
        </label>
        {formData.producers.map((producer, index) => (
          <div key={`producer-${index}`} className="flex gap-2 mb-2">
            <input
              type="text"
              value={producer}
              onChange={e => handleArrayInput(formData, setFormData, 'producers', index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label={`Producteur ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeArrayItem(formData, setFormData, 'producers', index)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label={`Supprimer le producteur ${index + 1}`}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(formData, setFormData, 'producers')}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un producteur
        </button>
      </div>

      <div>
        <label htmlFor="studios" className="text-sm font-medium text-gray-700 mb-1">
          Studios
        </label>
        {formData.studios.map((studio, index) => (
          <div key={`studio-${index}`} className="flex gap-2 mb-2">
            <input
              type="text"
              value={studio}
              onChange={e => handleArrayInput(formData, setFormData, 'studios', index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label={`Studio ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeArrayItem(formData, setFormData, 'studios', index)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label={`Supprimer le studio ${index + 1}`}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(formData, setFormData, 'studios')}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un studio
        </button>
      </div>
    </fieldset>
  );
} 