import { Calendar, Film } from 'lucide-react';

import FormLabel from '../../../FormLabel';
import { MovieFormData } from '../../movie.types';
import { motion } from 'framer-motion';

type BasicInfoSectionProps = {
  formData: MovieFormData;
  setFormData: React.Dispatch<React.SetStateAction<MovieFormData>>;
};

export default function BasicInfoSection({ formData, setFormData }: BasicInfoSectionProps) {
  return (
    <motion.fieldset
      className="space-y-4 p-4 border border-gray-200 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <legend className="text-lg font-semibold text-gray-700 px-2 flex items-center gap-2">
        <Film className="w-5 h-5 text-blue-600" />
        Informations de base
      </legend>

      <div>
        <FormLabel htmlFor="title" label="Titre" required />
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <FormLabel htmlFor="subtitle" label="Sous-titre" />
        <input
          id="subtitle"
          type="text"
          value={formData.subtitle}
          onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <FormLabel htmlFor="release_date" label="Date de sortie" required spacing="right">
          <Calendar className="w-4 h-4 text-gray-500" />
        </FormLabel>
        <input
          id="release_date"
          type="date"
          value={formData.release_date}
          onChange={e => setFormData({ ...formData, release_date: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
    </motion.fieldset>
  );
}
