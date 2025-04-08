import { Resolver, Query } from 'type-graphql';
import { Music } from '../entities/music.entity';

@Resolver(Music)
export class MusicResolver {
  @Query(() => [Music])
  async getMusic(): Promise<Music[]> {
    return await Music.find({ relations: { tracklist: true } });
  }
}
