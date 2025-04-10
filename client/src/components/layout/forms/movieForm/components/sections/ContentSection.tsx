import { BookOpen, Minus, Plus } from 'lucide-react';
import { addArrayItem, handleArrayInput, handleStringOrArrayInput, removeArrayItem } from '../../form.utils';

import { MovieFormData } from '../../movie.types';

type ContentSectionProps = {
  formData: MovieFormData;
  setFormData: React.Dispatch<React.SetStateAction<MovieFormData>>;
};

export default function ContentSection({ formData, setFormData }: ContentSectionProps) {
  return (
    <fieldset className="space-y-4 p-4 border border-gray-200 rounded-lg">
      <legend className="text-lg font-semibold text-gray-700 px-2 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-blue-600" />
        Contenu
      </legend>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
          Résumé{' '}
          <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(obligatoire)</span>
        </label>
        <textarea
          id="summary"
          value={formData.summary}
          onChange={e => setFormData({ ...formData, summary: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Catégorie{' '}
          <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(obligatoire)</span>
        </label>
        <input
          id="category"
          type="text"
          value={typeof formData.category === 'string' ? formData.category : formData.category.join(', ')}
          onChange={e => handleStringOrArrayInput(formData, setFormData, 'category', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="ex: Science-Fiction, Action, Thriller"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="keywords" className="text-sm font-medium text-gray-700 mb-1">
          Mots-clés
        </label>
        {formData.keywords.map((keyword, index) => (
          <div key={`keyword-${index}`} className="flex gap-2 mb-2">
            <input
              type="text"
              value={keyword}
              onChange={e => handleArrayInput(formData, setFormData, 'keywords', index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label={`Mot-clé ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeArrayItem(formData, setFormData, 'keywords', index)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label={`Supprimer le mot-clé ${index + 1}`}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(formData, setFormData, 'keywords')}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un mot-clé
        </button>
      </div>

      <div>
        <label htmlFor="targeted_audience" className="text-sm font-medium text-gray-700 mb-1">
          Public cible{' '}
          <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(obligatoire)</span>
        </label>
        <select
          value={formData.targeted_audience}
          onChange={e => setFormData({ ...formData, targeted_audience: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Sélectionner un public cible</option>
          <option value="Tout public">Tout public</option>
          <option value="Jeunesse">Jeunesse</option>
          <option value="Adolescents">Adolescents</option>
          <option value="Adultes">Adultes</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div>
        <label htmlFor="actors" className="text-sm font-medium text-gray-700 mb-1">
          Acteurs
        </label>
        {formData.actors.map((actor, index) => (
          <div key={`actor-${index}`} className="flex gap-2 mb-2">
            <input
              type="text"
              value={actor}
              onChange={e => handleArrayInput(formData, setFormData, 'actors', index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label={`Acteur ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeArrayItem(formData, setFormData, 'actors', index)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label={`Supprimer l'acteur ${index + 1}`}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(formData, setFormData, 'actors')}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un acteur
        </button>
      </div>

      <div>
        <label htmlFor="awards" className="text-sm font-medium text-gray-700 mb-1">
          Récompenses
        </label>
        {formData.awards.map((award, index) => (
          <div key={`award-${index}`} className="flex gap-2 mb-2">
            <input
              type="text"
              value={award}
              onChange={e => handleArrayInput(formData, setFormData, 'awards', index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label={`Récompense ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeArrayItem(formData, setFormData, 'awards', index)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label={`Supprimer la récompense ${index + 1}`}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(formData, setFormData, 'awards')}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter une récompense
        </button>
      </div>
    </fieldset>
  );
} 