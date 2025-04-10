import { Arg, Query, Resolver } from 'type-graphql';
import { Movie } from '../entities/movie.entity';
import { SearchInput } from '../types/searchInput';
import { ILike } from 'typeorm';

@Resolver(Movie)
export class MovieResolver {
  @Query(() => [Movie])
  async getMovies(@Arg('search', { nullable: true }) search?: SearchInput): Promise<Movie[]> {
    if (!search?.searchTerm) {
      return await Movie.find();
    }

    const searchTerm = search.searchTerm.toLowerCase();
    return await Movie.find({
      where: [
        { title: ILike(`%${searchTerm}%`) },
        { directors: ILike(`%${searchTerm}%`) },
        { actors: ILike(`%${searchTerm}%`) },
      ],
    });
  }
}
