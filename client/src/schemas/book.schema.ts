import { gql } from '@apollo/client';

export const CREATE_BOOK = gql`
  mutation CreateBook($bookInput: BookInput!) {
    createBook(bookInput: $bookInput) {
      id
      titre
      auteurs
      editeur
      date_publication
      isbn
      format
      nombre_pages
      genre
      resume
      mots_cles
      public_cible
      langue_originale
      serie
      extrait
      prix_distinctions
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBookById($id: Float!) {
    getBookById(id: $id) {
      id
      titre
      auteurs
      editeur
      date_publication
      isbn
      format
      nombre_pages
      genre
      resume
      mots_cles
      public_cible
      langue_originale
      serie
      extrait
      prix_distinctions
    }
  }
`;
