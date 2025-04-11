import BasicInfoSection from './components/sections/BasicInfoSection';
import ContentSection from './components/sections/ContentSection';
import { Film } from 'lucide-react';
import FinancialInfoSection from './components/sections/FinancialInfoSection';
import Notification from './components/Notification';
import SubmitButton from '../SubmitButton';
import TeamSection from './components/sections/TeamSection';
import TechnicalDetailsSection from './components/sections/TechnicalDetailsSection';
import { motion } from 'framer-motion';
import useMovieForm from './hooks/useMovieForm';

export default function CreateMovieForm() {
  const {
    formData,
    setFormData,
    showNotification,
    notificationMessage,
    handleSubmit,
    closeNotification,
  } = useMovieForm();

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

        <BasicInfoSection formData={formData} setFormData={setFormData} />
        <TeamSection formData={formData} setFormData={setFormData} />
        <TechnicalDetailsSection formData={formData} setFormData={setFormData} />
        <ContentSection formData={formData} setFormData={setFormData} />
        <FinancialInfoSection formData={formData} setFormData={setFormData} />

        <SubmitButton buttonText="Créer le film" />
      </motion.form>

      <Notification
        show={showNotification}
        message={notificationMessage}
        onClose={closeNotification}
      />
    </>
  );
}
