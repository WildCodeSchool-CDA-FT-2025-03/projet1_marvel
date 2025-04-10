import { MovieFormData } from './movieForm/movie.types';

/**
 * Gère la modification d'un élément dans un tableau de chaînes de caractères
 * @returns Le nouvel objet MovieFormData avec l'élément modifié
 */
export const handleArrayInput = (
  formData: MovieFormData,
  field: keyof MovieFormData,
  index: number,
  value: string,
): MovieFormData => {
  // Vérifier si le champ est un tableau
  if (!Array.isArray(formData[field])) {
    console.error(`Le champ ${String(field)} n'est pas un tableau`);
    return formData;
  }

  const newArray = [...(formData[field] as string[])];
  newArray[index] = value;
  return { ...formData, [field]: newArray };
};

/**
 * Ajoute un élément vide à un tableau de chaînes de caractères
 * @returns Le nouvel objet MovieFormData avec l'élément ajouté
 */
export const addArrayItem = (
  formData: MovieFormData,
  field: keyof MovieFormData,
): MovieFormData => {
  // Vérifier si le champ est un tableau
  if (!Array.isArray(formData[field])) {
    console.error(`Le champ ${String(field)} n'est pas un tableau`);
    return formData;
  }

  return {
    ...formData,
    [field]: [...(formData[field] as string[]), ''],
  };
};

/**
 * Supprime un élément d'un tableau de chaînes de caractères
 * @returns Le nouvel objet MovieFormData avec l'élément supprimé
 */
export const removeArrayItem = (
  formData: MovieFormData,
  field: keyof MovieFormData,
  index: number,
): MovieFormData => {
  // Vérifier si le champ est un tableau
  if (!Array.isArray(formData[field])) {
    console.error(`Le champ ${String(field)} n'est pas un tableau`);
    return formData;
  }

  const newArray = [...(formData[field] as string[])];
  newArray.splice(index, 1);
  return { ...formData, [field]: newArray };
};

/**
 * Gère la modification d'un champ qui peut être soit une chaîne soit un tableau
 * @returns Le nouvel objet MovieFormData avec le champ modifié
 */
export const handleStringOrArrayInput = (
  formData: MovieFormData,
  field: keyof MovieFormData,
  value: string,
): MovieFormData => {
  // Si le champ est un tableau, on le convertit en chaîne de caractères avec des virgules
  if (Array.isArray(formData[field])) {
    return { ...formData, [field]: value.split(',').map(item => item.trim()) };
  } else {
    return { ...formData, [field]: value };
  }
};
