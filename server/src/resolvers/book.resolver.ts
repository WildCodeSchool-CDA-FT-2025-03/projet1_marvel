import { Arg, Resolver, Query, ObjectType, Field } from 'type-graphql';
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
}
