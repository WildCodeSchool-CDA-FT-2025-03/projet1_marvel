import { Arg, Resolver, Query } from 'type-graphql';
import { Book } from '../entities/book.entity';
import { SearchInput } from '../types/searchInput';
import { ILike } from 'typeorm';

@Resolver(Book)
export class BookResolver {
  @Query(() => [Book])
  async getBooks(@Arg('search', { nullable: true }) search?: SearchInput): Promise<Book[]> {
    if (!search || !search.searchTerm) {
      return await Book.find();
    }

    const searchTerm = search.searchTerm.toLowerCase();
    return await Book.find({
      where: [{ titre: ILike(`%${searchTerm}%`) }, { auteurs: ILike(`%${searchTerm}%`) }],
    });
  }
}
