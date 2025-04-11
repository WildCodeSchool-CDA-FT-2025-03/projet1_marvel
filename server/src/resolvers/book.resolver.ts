import { Arg, Resolver, Query, Mutation, ObjectType, Field, InputType } from 'type-graphql';
import { Book } from '../entities/book.entity';
import { SearchInput } from '../types/searchInput';
import { FilterInput } from '../types/filterInput';
import { ILike } from 'typeorm';

@ObjectType()
class PaginatedBooks {
  @Field(() => [Book])
  items: Book[];

  @Field()
  total: number;
}

@InputType()
class BookInput {
  @Field()
  titre: string;

  @Field(() => [String])
  auteurs: string[];

  @Field({ nullable: true })
  editeur: string;

  @Field({ nullable: true })
  date_publication: string;

  @Field({ nullable: true })
  isbn: string;

  @Field({ nullable: true })
  format: string;

  @Field({ nullable: true })
  nombre_pages: number;

  @Field({ nullable: true })
  genre: string;

  @Field({ nullable: true })
  resume: string;

  @Field(() => [String], { nullable: true })
  mots_cles: string[];

  @Field({ nullable: true })
  public_cible: string;

  @Field({ nullable: true })
  langue_originale: string;

  @Field()
  serie: boolean;

  @Field({ nullable: true })
  extrait: string;

  @Field({ nullable: true })
  prix_distinctions: string;
}

@Resolver(Book)
export class BookResolver {
  @Query(() => PaginatedBooks)
  async getBooks(
    @Arg('search', { nullable: true }) search?: SearchInput,
    @Arg('filter', { nullable: true }) filter?: FilterInput,
  ): Promise<PaginatedBooks> {
    if (filter?.category && filter.category !== 'books' && filter.category !== 'all') {
      return { items: [], total: 0 };
    }

    let books: Book[] = [];

    if (!search?.searchTerm) {
      books = await Book.find();
    } else {
      const searchTerm = search.searchTerm.toLowerCase();
      books = await Book.find({
        where: [{ titre: ILike(`%${searchTerm}%`) }, { auteurs: ILike(`%${searchTerm}%`) }],
      });
    }

    if (filter?.sortOrder) {
      books.sort((a, b) => {
        if (filter.sortOrder === 'asc') {
          return a.titre.localeCompare(b.titre);
        } else {
          return b.titre.localeCompare(a.titre);
        }
      });
    }

    const total = books.length;

    const page = filter?.page || 1;
    const limit = filter?.limit || 12;
    const startIndex = (page - 1) * limit;
    const paginatedBooks = books.slice(startIndex, startIndex + limit);

    return {
      items: paginatedBooks,
      total,
    };
  }

  @Query(() => Book)
  async getBookById(@Arg('id') id: number): Promise<Book> {
    const book = await Book.findOne({ where: { id } });
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  @Mutation(() => Book)
  async createBook(@Arg('bookInput') bookInput: BookInput): Promise<Book> {
    try {
      const newBook = new Book();
      Object.assign(newBook, bookInput);
      await newBook.save();
      return newBook;
    } catch (error) {
      throw new Error(`Erreur lors de la création du livre: ${error.message}`);
    }
  }
}
