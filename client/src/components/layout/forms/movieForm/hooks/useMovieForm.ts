import { MovieFormData } from '../movie.types';
import { useState } from 'react';

export default function useMovieForm() {
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

  const closeNotification = () => {
    setShowNotification(false);
  };

  return {
    formData,
    setFormData,
    showNotification,
    notificationMessage,
    handleSubmit,
    closeNotification,
  };
}
