import { BookOpen, Minus, Plus } from 'lucide-react';
import {
  addArrayItem,
  handleArrayInput,
  handleStringOrArrayInput,
  removeArrayItem,
} from '../../../form.utils';

import FormLabel from '../../../FormLabel';
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
        <FormLabel htmlFor="summary" label="Résumé" required />
        <textarea
          id="summary"
          value={formData.summary}
          onChange={e => setFormData({ ...formData, summary: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
          required
        />
      </div>

      <div>
        <FormLabel htmlFor="category" label="Catégorie" required />
        <input
          id="category"
          type="text"
          value={
            typeof formData.category === 'string' ? formData.category : formData.category.join(', ')
          }
          onChange={e => {
            const newFormData = handleStringOrArrayInput(formData, 'category', e.target.value);
            setFormData(newFormData);
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="ex: Science-Fiction, Action, Thriller"
          required
        />
      </div>

      <div>
        <FormLabel htmlFor="keywords" label="Mots-clés" />
        {formData.keywords.map((keyword, index) => (
          <div key={`keyword-${index}`} className="flex gap-2 mb-2">
            <input
              type="text"
              value={keyword}
              onChange={e => {
                const newFormData = handleArrayInput(formData, 'keywords', index, e.target.value);
                setFormData(newFormData);
              }}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label={`Mot-clé ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => {
                const newFormData = removeArrayItem(formData, 'keywords', index);
                setFormData(newFormData);
              }}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label={`Supprimer le mot-clé ${index + 1}`}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newFormData = addArrayItem(formData, 'keywords');
            setFormData(newFormData);
          }}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un mot-clé
        </button>
      </div>

      <div>
        <FormLabel htmlFor="targeted_audience" label="Public cible" required />
        <select
          value={formData.targeted_audience}
          onChange={e => setFormData({ ...formData, targeted_audience: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
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
        <FormLabel htmlFor="actors" label="Acteurs" />
        {formData.actors.map((actor, index) => (
          <div key={`actor-${index}`} className="flex gap-2 mb-2">
            <input
              type="text"
              value={actor}
              onChange={e => {
                const newFormData = handleArrayInput(formData, 'actors', index, e.target.value);
                setFormData(newFormData);
              }}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label={`Acteur ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => {
                const newFormData = removeArrayItem(formData, 'actors', index);
                setFormData(newFormData);
              }}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label={`Supprimer l'acteur ${index + 1}`}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newFormData = addArrayItem(formData, 'actors');
            setFormData(newFormData);
          }}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un acteur
        </button>
      </div>

      <div>
        <FormLabel htmlFor="awards" label="Récompenses" />
        {formData.awards.map((award, index) => (
          <div key={`award-${index}`} className="flex gap-2 mb-2">
            <input
              type="text"
              value={award}
              onChange={e => {
                const newFormData = handleArrayInput(formData, 'awards', index, e.target.value);
                setFormData(newFormData);
              }}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label={`Récompense ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => {
                const newFormData = removeArrayItem(formData, 'awards', index);
                setFormData(newFormData);
              }}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label={`Supprimer la récompense ${index + 1}`}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newFormData = addArrayItem(formData, 'awards');
            setFormData(newFormData);
          }}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter une récompense
        </button>
      </div>
    </fieldset>
  );
}
