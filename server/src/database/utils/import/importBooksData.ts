import { readFileSync } from 'fs';

import resetAutoIncrement from '../resetAutoIncrement';

import { BookData } from '../../../types/book.type';
import { Book } from '../../../entities/book.entity';

export default async function importBooksData(jsonPath: string): Promise<void> {
  const jsonData = readFileSync(jsonPath, 'utf8');
  const books: BookData[] = JSON.parse(jsonData);

  console.info(`📚 ${books.length} books found in JSON file`);

  await Book.clear();
  console.info('🧹 Books table cleared');

  await resetAutoIncrement('book');

  const bookEntities = books.map((book) => {
    const bookEntity = new Book();

    let auteurs = book.auteurs || book.auteur || [''];

    if (typeof auteurs === 'string') auteurs = [auteurs];

    bookEntity.titre = book.titre;
    bookEntity.auteurs = auteurs;
    bookEntity.editeur = book.editeur;
    bookEntity.date_publication = book.date_publication;
    bookEntity.isbn = book.isbn || '';
    bookEntity.format = book.format || '';
    bookEntity.nombre_pages = book.nombre_pages || 0;
    bookEntity.genre = book.genre || '';
    bookEntity.resume = book.resume || '';
    bookEntity.mots_cles = book.mots_cles || [];
    bookEntity.public_cible = book.public_cible || '';
    bookEntity.langue_originale = book.langue_originale || '';
    bookEntity.serie = book.serie;
    bookEntity.extrait = book.extrait || '';
    bookEntity.prix_distinctions = book.prix_distinctions || '';

    return bookEntity;
  });

  await Book.save(bookEntities);
  console.info(`✅ ${bookEntities.length} books successfully imported`);
}
