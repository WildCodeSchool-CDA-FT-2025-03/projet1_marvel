import { Arg, Resolver, Query } from 'type-graphql';
import { Book } from '../entities/book.entity';
import { SearchInput } from '../types/searchInput';
import { FilterInput } from '../types/filterInput';
import { ILike } from 'typeorm';

@Resolver(Book)
export class BookResolver {
  @Query(() => [Book])
  async getBooks(
    @Arg('search', { nullable: true }) search?: SearchInput,
    @Arg('filter', { nullable: true }) filter?: FilterInput,
  ): Promise<Book[]> {
    if (filter?.category && filter.category !== 'books' && filter.category !== 'all') {
      return [];
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

    return books;
  }
}
