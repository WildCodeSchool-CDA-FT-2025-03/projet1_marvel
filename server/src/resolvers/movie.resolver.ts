import { Arg, Query, Resolver } from 'type-graphql';
import { Movie } from '../entities/movie.entity';
import { SearchInput } from '../types/searchInput';
import { FilterInput } from '../types/filterInput';
import { ILike } from 'typeorm';

@Resolver(Movie)
export class MovieResolver {
  @Query(() => [Movie])
  async getMovies(
    @Arg('search', { nullable: true }) search?: SearchInput,
    @Arg('filter', { nullable: true }) filter?: FilterInput,
  ): Promise<Movie[]> {
    if (filter?.category && filter.category !== 'movies' && filter.category !== 'all') {
      return [];
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

    return movies;
  }
}
