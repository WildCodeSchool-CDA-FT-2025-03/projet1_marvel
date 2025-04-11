import { Arg, Resolver, Query, ObjectType, Field } from 'type-graphql';
import { Game } from '../entities/game.entity';
import { SearchInput } from '../types/searchInput';
import { FilterInput } from '../types/filterInput';
import { ILike } from 'typeorm';

@ObjectType()
class PaginatedGames {
  @Field(() => [Game])
  items: Game[];

  @Field()
  total: number;
}

@Resolver(Game)
export class GameResolver {
  @Query(() => PaginatedGames)
  async getGames(
    @Arg('search', { nullable: true }) search?: SearchInput,
    @Arg('filter', { nullable: true }) filter?: FilterInput,
  ): Promise<PaginatedGames> {
    if (filter?.category && filter.category !== 'games' && filter.category !== 'all') {
      return { items: [], total: 0 };
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

    const total = games.length;

    // Apply pagination
    const page = filter?.page || 1;
    const limit = filter?.limit || 12;
    const startIndex = (page - 1) * limit;
    const paginatedGames = games.slice(startIndex, startIndex + limit);

    return {
      items: paginatedGames,
      total,
    };
  }
}
