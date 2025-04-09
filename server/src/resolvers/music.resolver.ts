import { Resolver, Query, Arg } from 'type-graphql';
import { Music } from '../entities/music.entity';

@Resolver(Music)
export class MusicResolver {
  // return all musics and tracks
  @Query(() => [Music])
  async getMusic(): Promise<Music[]> {
    return await Music.find({ relations: { tracklist: true } });
  }

  // return one music and tracks by id
  // I use findOne instead of findOneById because I need to use "relations" with the "where" clause
  @Query(() => Music)
  async getOneMusicById(@Arg('id') id: string): Promise<Music> {
    return (await Music.findOne({
      where: { id: +id },
      relations: { tracklist: true },
    })) as Music;
  }
}
