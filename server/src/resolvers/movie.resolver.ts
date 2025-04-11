import { Arg, Query, Resolver, ObjectType, Field } from 'type-graphql';
import { Movie } from '../entities/movie.entity';
import { SearchInput } from '../types/searchInput';
import { FilterInput } from '../types/filterInput';
import { ILike } from 'typeorm';

@ObjectType()
class PaginatedMovies {
  @Field(() => [Movie])
  items: Movie[];

  @Field()
  total: number;
}

@Resolver(Movie)
export class MovieResolver {
  @Query(() => PaginatedMovies)
  async getMovies(
    @Arg('search', { nullable: true }) search?: SearchInput,
    @Arg('filter', { nullable: true }) filter?: FilterInput,
  ): Promise<PaginatedMovies> {
    if (filter?.category && filter.category !== 'movies' && filter.category !== 'all') {
      return { items: [], total: 0 };
    }

    let movies: Movie[] = [];

    if (!search?.searchTerm) {
      movies = await Movie.find();
    } else {
      const searchTerm = search.searchTerm.toLowerCase();
      movies = await Movie.find({
        where: [
          { title: ILike(`%${searchTerm}%`) },
          { directors: ILike(`%${searchTerm}%`) },
          { actors: ILike(`%${searchTerm}%`) },
        ],
      });
    }

    if (filter?.sortOrder) {
      movies.sort((a, b) => {
        if (filter.sortOrder === 'asc') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
    }

    const total = movies.length;

    const page = filter?.page || 1;
    const limit = filter?.limit || 12;
    const startIndex = (page - 1) * limit;
    const paginatedMovies = movies.slice(startIndex, startIndex + limit);

    return {
      items: paginatedMovies,
      total,
    };
  }
}
