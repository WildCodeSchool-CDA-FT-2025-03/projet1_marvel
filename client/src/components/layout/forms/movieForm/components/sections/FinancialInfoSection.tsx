import { DollarSign } from 'lucide-react';
import FormLabel from '../../../FormLabel';
import { MovieFormData } from '../../movie.types';
import { motion } from 'framer-motion';

type FinancialInfoSectionProps = {
  formData: MovieFormData;
  setFormData: React.Dispatch<React.SetStateAction<MovieFormData>>;
};

export default function FinancialInfoSection({ formData, setFormData }: FinancialInfoSectionProps) {
  return (
    <motion.fieldset
      className="space-y-4 p-4 border border-gray-200 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <legend className="text-lg font-semibold text-gray-700 px-2 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-blue-600" />
        Informations financières
      </legend>

      <div>
        <FormLabel htmlFor="budget" label="Budget (€)" spacing="right">
          <DollarSign className="w-4 h-4 text-gray-500" />
        </FormLabel>
        <input
          id="budget"
          type="number"
          value={formData.budget || ''}
          onChange={e => {
            const value = e.target.value === '' ? 0 : parseInt(e.target.value);
            setFormData({ ...formData, budget: value });
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min="0"
        />
      </div>

      <div>
        <FormLabel htmlFor="box_office" label="Box-office (€)" spacing="right">
          <DollarSign className="w-4 h-4 text-gray-500" />
        </FormLabel>
        <input
          id="box_office"
          type="number"
          value={formData.box_office || ''}
          onChange={e => {
            const value = e.target.value === '' ? 0 : parseInt(e.target.value);
            setFormData({ ...formData, box_office: value });
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          min="0"
        />
      </div>
    </motion.fieldset>
  );
}
