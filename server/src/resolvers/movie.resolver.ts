import { Query, Resolver } from 'type-graphql';
import { Movie } from '../entities/movie.entity';

@Resolver(Movie)
export class MovieResolver {
  @Query(() => [Movie])
  async getMovies(): Promise<Movie[]> {
    return await Movie.find();
  }
}
