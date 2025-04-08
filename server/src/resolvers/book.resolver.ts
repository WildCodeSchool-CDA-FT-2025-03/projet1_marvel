import { Resolver, Query } from 'type-graphql';
import { Book } from '../entities/book.entity';

@Resolver(Book)
export class BookResolver {
  @Query(() => [Book])
  async getBooks(): Promise<Book[]> {
    return await Book.find();
  }
}
