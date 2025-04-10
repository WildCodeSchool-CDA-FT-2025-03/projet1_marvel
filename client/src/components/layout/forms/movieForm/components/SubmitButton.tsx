import { Save } from 'lucide-react';
import { motion } from 'framer-motion';

type SubmitButtonProps = {
  disabled?: boolean;
};

export default function SubmitButton({ disabled = false }: SubmitButtonProps) {
  return (
    <motion.div
      className="flex justify-end pt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        type="submit"
        disabled={disabled}
        className={`px-6 py-2 ${disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
          } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center gap-2`}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
      >
        <Save className="w-4 h-4" />
        Créer le film
      </motion.button>
    </motion.div>
  );
} 