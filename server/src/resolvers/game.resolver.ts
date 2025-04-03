import { Resolver, Query } from 'type-graphql';
import { Game } from '../entities/game.entity';

@Resolver(Game)
export class GameResolver {
  @Query(() => [Game])
  async getGames(): Promise<Game[]> {
    return await Game.find();
  }
}
