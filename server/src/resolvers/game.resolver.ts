import { Arg, Resolver, Query } from 'type-graphql';
import { Game } from '../entities/game.entity';
import { SearchInput } from '../types/searchInput';
import { FilterInput } from '../types/filterInput';
import { ILike } from 'typeorm';

@Resolver(Game)
export class GameResolver {
  @Query(() => [Game])
  async getGames(
    @Arg('search', { nullable: true }) search?: SearchInput,
    @Arg('filter', { nullable: true }) filter?: FilterInput,
  ): Promise<Game[]> {
    if (filter?.category && filter.category !== 'games' && filter.category !== 'all') {
      return [];
    }

    let games: Game[] = [];

    if (!search?.searchTerm) {
      games = await Game.find();
    } else {
      const searchTerm = search.searchTerm.toLowerCase();
      games = await Game.find({
        where: [
          { title: ILike(`%${searchTerm}%`) },
          { developers: ILike(`%${searchTerm}%`) },
          { publishers: ILike(`%${searchTerm}%`) },
          { platforms: ILike(`%${searchTerm}%`) },
        ],
      });
    }

    if (filter?.sortOrder) {
      games.sort((a, b) => {
        if (filter.sortOrder === 'asc') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
    }

    return games;
  }

  @Query(() => Game)
  async getGameById(@Arg('id') id: number): Promise<Game> {
    const game = await Game.findOne({ where: { id } });
    if (!game) {
      throw new Error('Game not found');
    }
    return game;
  }
}
