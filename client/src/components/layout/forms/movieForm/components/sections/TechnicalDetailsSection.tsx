import { Clock } from 'lucide-react';
import FormLabel from '../../../FormLabel';
import { MovieFormData } from '../../movie.types';
import { handleStringOrArrayInput } from '../../../form.utils';
import { motion } from 'framer-motion';

type TechnicalDetailsSectionProps = {
  formData: MovieFormData;
  setFormData: React.Dispatch<React.SetStateAction<MovieFormData>>;
};

export default function TechnicalDetailsSection({
  formData,
  setFormData,
}: TechnicalDetailsSectionProps) {
  return (
    <motion.fieldset
      className="space-y-4 p-4 border border-gray-200 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <legend className="text-lg font-semibold text-gray-700 px-2 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        Détails techniques
      </legend>

      <div>
        <FormLabel htmlFor="duration" label="Durée (minutes)" required spacing="right">
          <Clock className="w-4 h-4 text-gray-500" />
        </FormLabel>
        <input
          id="duration"
          type="number"
          value={formData.duration}
          onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          min="0"
        />
      </div>

      <div>
        <FormLabel htmlFor="format" label="Format" />
        <input
          id="format"
          type="text"
          value={typeof formData.format === 'string' ? formData.format : formData.format.join(', ')}
          onChange={e => {
            const newFormData = handleStringOrArrayInput(formData, 'format', e.target.value);
            setFormData(newFormData);
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="ex: Blu-ray, DVD, Streaming"
        />
      </div>

      <div>
        <FormLabel htmlFor="ISBN_EAN_UPC" label="ISBN/EAN/UPC" />
        <input
          id="ISBN_EAN_UPC"
          type="text"
          value={formData.ISBN_EAN_UPC}
          onChange={e => setFormData({ ...formData, ISBN_EAN_UPC: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <FormLabel htmlFor="original_language" label="Langue originale" />
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
  );
}
