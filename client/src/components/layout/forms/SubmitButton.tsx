import { Save } from 'lucide-react';
import { motion } from 'framer-motion';

type SubmitButtonProps = {
  disabled?: boolean;
  buttonText?: string;
  icon?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
};

export default function SubmitButton({
  disabled = false,
  buttonText = 'Sauvegarder',
  icon = <Save className="w-4 h-4" />,
  className = 'flex justify-end pt-4',
  buttonClassName = '',
}: SubmitButtonProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        type="submit"
        disabled={disabled}
        className={`px-6 py-2 ${
          disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
        } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center gap-2 ${buttonClassName}`}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
      >
        {icon}
        {buttonText}
      </motion.button>
    </motion.div>
  );
}
