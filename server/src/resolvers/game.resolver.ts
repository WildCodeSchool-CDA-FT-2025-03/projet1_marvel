import { Resolver, Query, Arg } from 'type-graphql';
import { Game } from '../entities/game.entity';

@Resolver(Game)
export class GameResolver {
  @Query(() => [Game])
  async getGames(): Promise<Game[]> {
    return await Game.find();
  }

  @Query(() => Game, { nullable: true })
  async getGameById(@Arg('id') id: number): Promise<Game | null> {
    return await Game.findOne({ where: { id } });
  }
}
