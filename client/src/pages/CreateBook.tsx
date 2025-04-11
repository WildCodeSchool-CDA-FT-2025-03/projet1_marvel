import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Save, ArrowLeft, Calendar, Tag, Info } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK } from '../schemas/book.schema';

interface FormErrors {
  title?: string;
  author?: string;
  summary?: string;
  [key: string]: string | undefined;
}

export default function CreateBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    release_date: '',
    category: '',
    summary: '',
    keywords: '',
    targeted_audience: '',
    is_series: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [createBook, { loading: isSubmitting }] = useMutation(CREATE_BOOK, {
    onCompleted: () => {
      navigate('/catalogue');
    },
    onError: error => {
      console.error('Erreur lors de la création:', error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.summary.trim()) newErrors.summary = 'La description est requise';
    if (!formData.author.trim()) newErrors.author = "L'auteur est requis";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const bookData = {
        titre: formData.title,
        auteurs: formData.author.split(',').map(a => a.trim()),
        editeur: formData.publisher,
        date_publication: formData.release_date,
        genre: formData.category || null,
        resume: formData.summary,
        mots_cles: formData.keywords ? formData.keywords.split(',').map(k => k.trim()) : [],
        public_cible: formData.targeted_audience || null,
        serie: formData.is_series,
      };

      createBook({ variables: { bookInput: bookData } });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <nav className="mb-6">
          <Link
            to="/catalogue"
            className="inline-flex items-center text-indigo-600 hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" /> Retour au catalogue
          </Link>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-t-xl p-6 flex items-center"
        >
          <Book size={30} className="mr-3 text-blue-700" />
          <h1 className="text-2xl font-bold">Ajouter un nouveau livre</h1>
        </motion.div>

        <div className="bg-white rounded-b-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                Titre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="author">
                  Auteur <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.author ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="publisher">
                  Éditeur
                </label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="release_date">
                  Date de publication
                </label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="date"
                    name="release_date"
                    value={formData.release_date}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
                  Catégorie
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="summary">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={4}
                className={`w-full p-3 border ${errors.summary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none`}
              />
              {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="keywords">
                  Mots-clés
                </label>
                <div className="relative">
                  <Tag size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="keywords"
                    placeholder="Séparez les mots-clés par des virgules"
                    value={formData.keywords}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="targeted_audience">
                  Public cible
                </label>
                <div className="relative">
                  <Info size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="targeted_audience"
                    placeholder="Tout public, Adulte, Enfant..."
                    value={formData.targeted_audience}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_series"
                name="is_series"
                checked={formData.is_series}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="is_series" className="ml-2 text-gray-700">
                Fait partie d&apos;une série
              </label>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Link
                to="/catalogue"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Annuler
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    <span>En cours...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    <span>Enregistrer</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
