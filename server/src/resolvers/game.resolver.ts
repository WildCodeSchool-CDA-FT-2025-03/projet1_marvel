import { Arg, Resolver, Query } from 'type-graphql';
import { Game } from '../entities/game.entity';
import { SearchInput } from '../types/searchInput';
import { ILike } from 'typeorm';

@Resolver(Game)
export class GameResolver {
  @Query(() => [Game])
  async getGames(@Arg('search', { nullable: true }) search?: SearchInput): Promise<Game[]> {
    if (!search?.searchTerm) {
      return await Game.find();
    }

    const searchTerm = search.searchTerm.toLowerCase();
    return await Game.find({
      where: [
        { title: ILike(`%${searchTerm}%`) },
        { developers: ILike(`%${searchTerm}%`) },
        { publishers: ILike(`%${searchTerm}%`) },
        { platforms: ILike(`%${searchTerm}%`) },
      ],
    });
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
