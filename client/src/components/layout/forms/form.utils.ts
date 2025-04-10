import { MovieFormData } from './MovieForm';

/**
 * Gère la modification d'un élément dans un tableau de chaînes de caractères
 */
export const handleArrayInput = (
  formData: MovieFormData,
  setFormData: React.Dispatch<React.SetStateAction<MovieFormData>>,
  field: keyof MovieFormData,
  index: number,
  value: string,
): void => {
  const newArray = [...(formData[field] as string[])];
  newArray[index] = value;
  setFormData({ ...formData, [field]: newArray });
};

/**
 * Ajoute un élément vide à un tableau de chaînes de caractères
 */
export const addArrayItem = (
  formData: MovieFormData,
  setFormData: React.Dispatch<React.SetStateAction<MovieFormData>>,
  field: keyof MovieFormData,
): void => {
  setFormData({
    ...formData,
    [field]: [...(formData[field] as string[]), ''],
  });
};

/**
 * Supprime un élément d'un tableau de chaînes de caractères
 */
export const removeArrayItem = (
  formData: MovieFormData,
  setFormData: React.Dispatch<React.SetStateAction<MovieFormData>>,
  field: keyof MovieFormData,
  index: number,
): void => {
  const newArray = [...(formData[field] as string[])];
  newArray.splice(index, 1);
  setFormData({ ...formData, [field]: newArray });
};

/**
 * Gère la modification d'un champ qui peut être soit une chaîne soit un tableau
 */
export const handleStringOrArrayInput = (
  formData: MovieFormData,
  setFormData: React.Dispatch<React.SetStateAction<MovieFormData>>,
  field: keyof MovieFormData,
  value: string,
): void => {
  // Si le champ est un tableau, on le convertit en chaîne de caractères avec des virgules
  if (Array.isArray(formData[field])) {
    setFormData({ ...formData, [field]: value.split(',').map(item => item.trim()) });
  } else {
    setFormData({ ...formData, [field]: value });
  }
};
