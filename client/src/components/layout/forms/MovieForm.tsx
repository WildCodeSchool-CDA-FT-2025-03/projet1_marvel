import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  Film,
  Minus,
  Plus,
  Save,
  Users,
} from 'lucide-react';
import {
  addArrayItem,
  handleArrayInput,
  handleStringOrArrayInput,
  removeArrayItem,
} from './form.utils';

import { MovieFormData } from '../../../types/movie.types';
import { useState } from 'react';

export default function CreateMovieForm() {
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    subtitle: '',
    directors: [''],
    writers: [''],
    producers: [''],
    studios: [''],
    release_date: '',
    ISBN_EAN_UPC: '',
    format: '',
    duration: 0,
    category: '',
    summary: '',
    keywords: [''],
    targeted_audience: '',
    original_language: '',
    series: false,
    awards: [''],
    actors: [''],
    budget: 0,
    box_office: 0,
  });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validation basique
      if (
        !formData.title ||
        !formData.release_date ||
        !formData.duration ||
        !formData.summary ||
        !formData.category ||
        !formData.targeted_audience
      ) {
        setNotificationMessage('Veuillez remplir tous les champs obligatoires');
        setShowNotification(true);
        return;
      }

      // TODO: Implement form submission
      setNotificationMessage('Film créé avec succès !');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch {
      setNotificationMessage('Erreur lors de la création du film');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  // Animation variants pour les sections du formulaire
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Générer une clé unique pour chaque élément de tableau
  const generateUniqueKey = (prefix: string, value: string) => {
    return `${prefix}-${value.replace(/\s+/g, '-').toLowerCase()}`;
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Film className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Créer une nouvelle fiche de film</h2>
        </motion.div>

        {/* Informations de base */}
        <motion.fieldset
          className="space-y-4 p-4 border border-gray-200 rounded-lg"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <legend className="text-lg font-semibold text-gray-700 px-2 flex items-center gap-2">
            <Film className="w-5 h-5 text-blue-600" />
            Informations de base
          </legend>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(obligatoire)</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Sous-titre
            </label>
            <input
              id="subtitle"
              type="text"
              value={formData.subtitle}
              onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="release_date"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
            >
              <Calendar className="w-4 h-4 text-gray-500" />
              Date de sortie{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(obligatoire)</span>
            </label>
            <input
              id="release_date"
              type="date"
              value={formData.release_date}
              onChange={e => setFormData({ ...formData, release_date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
            />
          </div>
        </motion.fieldset>

        {/* Équipe */}
        <motion.fieldset
          className="space-y-4 p-4 border border-gray-200 rounded-lg"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <legend className="text-lg font-semibold text-gray-700 px-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Équipe
          </legend>

          <div>
            <label htmlFor="directors" className="text-sm font-medium text-gray-700 mb-1">
              Réalisateurs
            </label>
            <AnimatePresence>
              {formData.directors.map((director, index) => (
                <motion.div
                  key={generateUniqueKey('director', director)}
                  className="flex gap-2 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="text"
                    value={director}
                    onChange={e =>
                      handleArrayInput(formData, setFormData, 'directors', index, e.target.value)
                    }
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
                </motion.div>
              ))}
            </AnimatePresence>
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
            <AnimatePresence>
              {formData.writers.map((writer, index) => (
                <motion.div
                  key={generateUniqueKey('writer', writer)}
                  className="flex gap-2 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="text"
                    value={writer}
                    onChange={e =>
                      handleArrayInput(formData, setFormData, 'writers', index, e.target.value)
                    }
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
                </motion.div>
              ))}
            </AnimatePresence>
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
            <AnimatePresence>
              {formData.producers.map((producer, index) => (
                <motion.div
                  key={generateUniqueKey('producer', producer)}
                  className="flex gap-2 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="text"
                    value={producer}
                    onChange={e =>
                      handleArrayInput(formData, setFormData, 'producers', index, e.target.value)
                    }
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
                </motion.div>
              ))}
            </AnimatePresence>
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
            <AnimatePresence>
              {formData.studios.map((studio, index) => (
                <motion.div
                  key={generateUniqueKey('studio', studio)}
                  className="flex gap-2 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="text"
                    value={studio}
                    onChange={e =>
                      handleArrayInput(formData, setFormData, 'studios', index, e.target.value)
                    }
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
                </motion.div>
              ))}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => addArrayItem(formData, setFormData, 'studios')}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter un studio
            </button>
          </div>
        </motion.fieldset>

        {/* Détails techniques */}
        <motion.fieldset
          className="space-y-4 p-4 border border-gray-200 rounded-lg"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <legend className="text-lg font-semibold text-gray-700 px-2 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Détails techniques
          </legend>

          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
            >
              <Clock className="w-4 h-4 text-gray-500" />
              Durée (minutes){' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(obligatoire)</span>
            </label>
            <input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
              min="0"
            />
          </div>

          <div>
            <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
              Format
            </label>
            <input
              id="format"
              type="text"
              value={
                typeof formData.format === 'string' ? formData.format : formData.format.join(', ')
              }
              onChange={e =>
                handleStringOrArrayInput(formData, setFormData, 'format', e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="ex: Blu-ray, DVD, Streaming"
            />
          </div>

          <div>
            <label htmlFor="ISBN_EAN_UPC" className="block text-sm font-medium text-gray-700 mb-1">
              ISBN/EAN/UPC
            </label>
            <input
              id="ISBN_EAN_UPC"
              type="text"
              value={formData.ISBN_EAN_UPC}
              onChange={e => setFormData({ ...formData, ISBN_EAN_UPC: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="original_language"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Langue originale
            </label>
            <input
              id="original_language"
              type="text"
              value={formData.original_language}
              onChange={e => setFormData({ ...formData, original_language: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="series"
                checked={formData.series}
                onChange={e => setFormData({ ...formData, series: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="series" className="ml-2 block text-sm text-gray-700">
                Ce film fait partie d&apos;une série
              </label>
            </div>
          </div>
        </motion.fieldset>

        {/* Contenu */}
        <motion.fieldset
          className="space-y-4 p-4 border border-gray-200 rounded-lg"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <legend className="text-lg font-semibold text-gray-700 px-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Contenu
          </legend>

          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
              Résumé{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
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
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(obligatoire)</span>
            </label>
            <input
              id="category"
              type="text"
              value={
                typeof formData.category === 'string'
                  ? formData.category
                  : formData.category.join(', ')
              }
              onChange={e =>
                handleStringOrArrayInput(formData, setFormData, 'category', e.target.value)
              }
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
            <AnimatePresence>
              {formData.keywords.map((keyword, index) => (
                <motion.div
                  key={generateUniqueKey('keyword', keyword)}
                  className="flex gap-2 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="text"
                    value={keyword}
                    onChange={e =>
                      handleArrayInput(formData, setFormData, 'keywords', index, e.target.value)
                    }
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
                </motion.div>
              ))}
            </AnimatePresence>
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
            <label
              htmlFor="targeted_audience"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Public cible{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
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
            <AnimatePresence>
              {formData.actors.map((actor, index) => (
                <motion.div
                  key={generateUniqueKey('actor', actor)}
                  className="flex gap-2 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="text"
                    value={actor}
                    onChange={e =>
                      handleArrayInput(formData, setFormData, 'actors', index, e.target.value)
                    }
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-label={`Acteur ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(formData, setFormData, 'actors', index)}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label={`Supprimer l&apos;acteur ${index + 1}`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
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
            <AnimatePresence>
              {formData.awards.map((award, index) => (
                <motion.div
                  key={generateUniqueKey('award', award)}
                  className="flex gap-2 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="text"
                    value={award}
                    onChange={e =>
                      handleArrayInput(formData, setFormData, 'awards', index, e.target.value)
                    }
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
                </motion.div>
              ))}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => addArrayItem(formData, setFormData, 'awards')}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter une récompense
            </button>
          </div>
        </motion.fieldset>

        {/* Informations financières */}
        <motion.fieldset
          className="space-y-4 p-4 border border-gray-200 rounded-lg"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <legend className="text-lg font-semibold text-gray-700 px-2 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Informations financières
          </legend>

          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
            >
              <DollarSign className="w-4 h-4 text-gray-500" />
              Budget (€)
            </label>
            <input
              id="budget"
              type="number"
              value={formData.budget}
              onChange={e => setFormData({ ...formData, budget: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="box_office"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
            >
              <DollarSign className="w-4 h-4 text-gray-500" />
              Box-office (€)
            </label>
            <input
              id="box_office"
              type="number"
              value={formData.box_office}
              onChange={e => setFormData({ ...formData, box_office: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>
        </motion.fieldset>

        <motion.div
          className="flex justify-end pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-4 h-4" />
            Créer le film
          </motion.button>
        </motion.div>
      </motion.form>

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-gray-800">{notificationMessage}</p>
            <button
              onClick={() => setShowNotification(false)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
